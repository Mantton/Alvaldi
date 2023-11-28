import s3 from "@/clients/s3";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { nanoid } from "nanoid";
import {
  AWS_BUCKET_NAME,
  AWS_CLOUDFRONT_DOMAIN,
  isProduction,
} from "@/config/env";
import db from "@/clients/postgres";
import { mediaTable } from "@/db/schema/media";
import cache from "@/clients/cache";
import { BadRequestError } from "@/errors";

const FOLDER = isProduction() ? "media" : "test";

/**
 * Uploads a specified file to S3
 * @param file A File uploaded by a user
 * @returns the URL of the file in S3 (through cloudfront)
 */
const uploadToS3 = async (file: Express.Multer.File) => {
  const name = uuidv4();
  const extension = extname(file.originalname);
  const filename = `${name}${extension}`;

  const request: PutObjectRequest = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${FOLDER}/${filename}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const { Key } = await s3.upload(request).promise();
  const mediaURL = `${AWS_CLOUDFRONT_DOMAIN}/${Key}`;
  return mediaURL;
};

/**
 * stores a file in the db & on S3
 * @param file File to be uploaded
 * @param uploaderId ID of the user uploading
 * @returns a nanoID of the file uploaded
 */
export const storeMedia = async (
  file: Express.Multer.File,
  uploaderId: number
) => {
  const mediaURL = await uploadToS3(file);

  const [record] = await db
    .insert(mediaTable)
    .values({
      url: mediaURL,
      uploaderId,
    })
    .returning({ id: mediaTable.id });

  const serialId = record.id;
  const nanoId = nanoid();

  await cache.setGrouped("media", nanoId, serialId.toString(), 120); // 2 Minutes Expiry
  return { id: nanoId };
};

export const consumeImageNano = async (nanoId: string) => {
  const idStr = await cache.getGrouped("media", nanoId);
  if (!idStr) return null;
  const id = parseInt(idStr);

  await cache.deleteGrouped("media", nanoId); // consume

  return id;
};

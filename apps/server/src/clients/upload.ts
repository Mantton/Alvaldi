import { BadRequestError } from "@/errors";
import multer, { memoryStorage } from "multer";
import { extname } from "path";

const ValidExtensions = new Set<string>([".png", ".jpg", ".jpeg"]);
const ValidMimeTypes = new Set<string>([
  "image/jpg",
  "image/png",
  "image/jpeg",
]);

const storage = memoryStorage();

const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 3 * 1024 * 1024, // 3 MB
  },

  fileFilter: (_, file, cb) => {
    const extension = extname(file.originalname);
    const mimetype = file.mimetype;

    // Check extension & mimetype
    if (!ValidExtensions.has(extension) || !ValidMimeTypes.has(mimetype)) {
      cb(new BadRequestError());
      return;
    }

    // valid media
    cb(null, true);
  },
}).single("media");

export default upload;

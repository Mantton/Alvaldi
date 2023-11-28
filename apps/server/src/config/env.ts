import "dotenv/config";

export const PORT = process.env.PORT ?? "3300";
export const DATABASE_URL = getEnvVar("DATABASE_URL");
export const ENVIRONMENT = process.env.NODE_ENV;
export const CLERK_WEBHOOK_SECRET = getEnvVar("CLERK_WEBHOOK_SECRET");
export const AWS_BUCKET_NAME = getEnvVar("AWS_BUCKET_NAME");
export const AWS_CLOUDFRONT_DOMAIN = getEnvVar("AWS_CLOUDFRONT_DOMAIN");
export const REDIS_URL = getEnvVar("REDIS_URL");
export const isProduction = () => !!ENVIRONMENT && ENVIRONMENT === "production";
function getEnvVar(key: string) {
  const value = process.env[key];

  if (!value) {
    console.error(`Missing variable ${key}`);
    process.exit(1);
  }

  return value;
}

import "dotenv/config";

export const PORT = process.env.PORT ?? "3300";
export const DATABASE_URL = getEnvVar("DATABASE_URL");

function getEnvVar(key: string) {
  const value = process.env[key];

  if (!value) {
    console.error(`Missing variable ${key}`);
    process.exit(1);
  }

  return value;
}

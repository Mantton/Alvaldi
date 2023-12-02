const API_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3300";

export const buildV1Request = (path: string) => `${API_URL}/v1${path}`;

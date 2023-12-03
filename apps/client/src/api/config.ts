import axios from "axios";

export const buildV1Request = (path: string) => `/api/v1${path}`;

export const v1Client = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

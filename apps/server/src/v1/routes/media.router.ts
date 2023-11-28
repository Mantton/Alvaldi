import upload from "@/clients/upload";
import { Router } from "express";
import { handleFileUpload } from "../controllers/media.controller";
import { RequiresAuth } from "../middlewares";

export const MediaRouter = Router();

MediaRouter.use(RequiresAuth); // all requests to media paths should be by authenticated users
MediaRouter.post("/upload", upload, handleFileUpload);

export default MediaRouter;

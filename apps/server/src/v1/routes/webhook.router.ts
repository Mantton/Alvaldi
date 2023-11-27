import { Router } from "express";
import { handleClerkEvent } from "../controllers/webhook.controller";

const WebhookRouter = Router();

// clerk
WebhookRouter.post("/clerk", handleClerkEvent);

export default WebhookRouter;

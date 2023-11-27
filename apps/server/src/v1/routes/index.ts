import { Router } from "express";
import WebhookRouter from "./webhook.router";

const V1Router = Router();

V1Router.use("/webhook", WebhookRouter);

export default V1Router;

import { Router } from "express";
import WebhookRouter from "./webhook.router";
import AccountsRouter from "./accounts.router";
import RecordLabelsRouter from "./recordLabels.router";
import MediaRouter from "./media.router";

const V1Router = Router();

V1Router.use("/webhook", WebhookRouter);
V1Router.use("/accounts", AccountsRouter);
V1Router.use("/labels", RecordLabelsRouter);
V1Router.use("/media", MediaRouter);
export default V1Router;

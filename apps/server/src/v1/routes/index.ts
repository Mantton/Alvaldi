import { Router } from "express";
import WebhookRouter from "./webhook.router";
import AccountsRouter from "./accounts.router";

const V1Router = Router();

V1Router.use("/webhook", WebhookRouter);
V1Router.use("/accounts", AccountsRouter);

export default V1Router;

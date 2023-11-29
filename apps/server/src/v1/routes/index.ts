import { Router } from "express";
import WebhookRouter from "./webhook.router";
import AccountsRouter from "./accounts.router";
import RecordLabelsRouter from "./recordLabels.router";
import MediaRouter from "./media.router";
import ArtistsRouter from "./artists.router";
import GroupsRouter from "./groups.router";
import ErasRouter from "./eras.router";

const V1Router = Router();

V1Router.use("/webhook", WebhookRouter);
V1Router.use("/accounts", AccountsRouter);
V1Router.use("/labels", RecordLabelsRouter);
V1Router.use("/media", MediaRouter);
V1Router.use("/artists", ArtistsRouter);
V1Router.use("/groups", GroupsRouter);
V1Router.use("/eras", ErasRouter);

export default V1Router;

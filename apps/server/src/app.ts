import express from "express";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import cors from "cors";
import V1Router from "@/v1/routes";
import { APIErrorHandler } from "./errors/handler";

const app = express();

// core middleware
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(cors());
// API routes
app.use("/v1", V1Router);

// defaults
app.use("/ping", (_, res) => {
  res.send("pong");
});

app.use("*", (_, res) => {
  res.sendStatus(404);
});

app.use(APIErrorHandler);

export default app;

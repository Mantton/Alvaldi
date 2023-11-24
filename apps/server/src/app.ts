import express from "express";

const app = express();

app.use("/ping", (_, res) => {
  res.send("pong");
});

export default app;

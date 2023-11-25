import express from "express";

const app = express();

app.use(express.json());
app.use("/ping", (_, res) => {
  res.send("pong");
});

// Defaults
app.use("*", (_, res) => {
  res.sendStatus(404);
});

export default app;

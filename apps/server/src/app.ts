import express from "express";

const app = express();

app.use(express.json());
app.use("/ping", (_, res) => {
  res.send("pong");
});

export default app;

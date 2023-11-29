import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { APIError } from "../errors";
export const APIErrorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ZodError) {
    res.sendStatus(400);
    return;
  } else if (err instanceof APIError) {
    res.sendStatus(err.code);
    return;
  } else if (err instanceof Error) {
    // clerk
    if (err.message.toLowerCase() === "unauthenticated") {
      res.sendStatus(401);
      return;
    }
  }

  console.error(err);

  res.sendStatus(500);
  return;
};

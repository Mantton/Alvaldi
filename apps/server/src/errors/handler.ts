import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { APIError } from "../errors";
export const APIErrorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  // console.error(err.message);

  if (err instanceof ZodError) {
    res.sendStatus(400);
    return;
  } else if (err instanceof APIError) {
    res.sendStatus(err.code);
    return;
  } else if (err instanceof Error) {
    if (err.message.toLowerCase() === "unauthenticated") {
      // clerk
      res.sendStatus(401);
      return;
    }
  }

  res.sendStatus(500);
  return;
};

import { RequestHandler } from "express";
import { type AnyZodObject } from "zod";

export const BodyMatchesSchema = (schema: AnyZodObject) => {
  const handler: RequestHandler = async (req, _res, next) => {
    try {
      const data = await schema.parseAsync(req.body);
      req.body = data;
      next();
    } catch (err) {
      next(err);
    }
  };
  return handler;
};

export const ParamsMatchesSchema = (schema: AnyZodObject) => {
  const handler: RequestHandler = async (req, _res, next) => {
    try {
      const data = await schema.parseAsync(req.params);
      req.params = data;
      next();
    } catch (err) {
      next(err);
    }
  };
  return handler;
};

export const QueryMatchesSchema = (schema: AnyZodObject) => {
  const handler: RequestHandler = async (req, _res, next) => {
    try {
      const data = await schema.parseAsync(req.query);
      req.query = data;
      next();
    } catch (err) {
      next(err);
    }
  };
  return handler;
};

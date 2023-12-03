import type { LooseAuthProp } from "@clerk/clerk-sdk-node";
import type { RequestHandler } from "express";

import runServer from "./server";

runServer();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
  interface TRequestHandler<
    ReqBody,
    ReqParams = any,
    ReqQuery = any,
    ResBody = any,
  > extends RequestHandler<
      ReqParams & Record<string, never>,
      ResBody,
      ReqBody,
      ReqQuery & Record<string, never>
    > {}
  interface GetRequestHandlerWithParam<ReqQuery, ReqParams>
    extends RequestHandler<
      ReqParams,
      any,
      any,
      ReqQuery & Record<string, never>
    > {}

  interface GetRequestHandler<ReqQuery>
    extends GetRequestHandlerWithParam<ReqQuery, any> {}
}

import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import runServer from "./server";

runServer();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

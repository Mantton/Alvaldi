import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node";

export const WithAuth = ClerkExpressWithAuth({});
export const RequiresAuth = ClerkExpressRequireAuth({});

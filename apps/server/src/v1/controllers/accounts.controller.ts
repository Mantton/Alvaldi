import type { RequestHandler } from "express";
import type { BasicAccountInfo } from "@/types/accounts";
import { getAccountWithProviderID } from "../services/accounts.service";

/**
 * Handles request to get current authenticated user.
 *
 * ! Must be wrapped with `RequiresAuth` middleware
 */
export const handleGetAuthenticatedUser: RequestHandler<
  any,
  BasicAccountInfo
> = async (req, res, next) => {
  const providerId = req.auth.userId!; // Force unwrap as middleware requires authentication

  try {
    // get account record
    const account = await getAccountWithProviderID(providerId);

    if (!account) {
      if (!account) throw new Error("provider-local user mismatch"); // user exists in clerk but not in db.
      return;
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
};

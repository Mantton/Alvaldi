import { RequestHandler } from "express";
import {
  createAccountFromClerk,
  getAccountWithProviderID,
} from "../services/accounts.service";

/**
 * Handles request to get current authenticated user.
 *
 * ! Must be wrapped with `RequiresAuth` middleware
 */
export const handleGetAuthenticatedUser: RequestHandler = async (
  req,
  res,
  next
) => {
  const providerId = req.auth.userId!; // Force unwrap as middleware requires authentication

  try {
    // get account record
    const account = await getAccountWithProviderID(providerId);

    // if no account, user is authenticated so clerk user exists, create record
    if (!account) {
      await createAccountFromClerk(providerId); // create with clerk
      const account = await getAccountWithProviderID(providerId); // get from db
      if (!account) throw new Error("provider-local user mismatch"); // if acc dne, throw new error
      res.json(account); // respond with account record
      return;
    }

    res.json(account);
  } catch (error) {
    next(error);
  }
};

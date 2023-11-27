import { Router } from "express";
import { RequiresAuth } from "../middlewares/auth";
import { handleGetAuthenticatedUser } from "../controllers/accounts.controller";

const AccountsRouter = Router();

AccountsRouter.get("/me", [RequiresAuth], handleGetAuthenticatedUser);
export default AccountsRouter;

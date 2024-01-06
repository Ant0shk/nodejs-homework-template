import express from "express";
import authController from "../../controllers/auth-controller.js";

import { validateBody } from "../../decorators/index.js";

import { userSignUpSchema, userSignInSchema } from "../../models/User.js";
import { authenticate } from "../../middleware/index.js"; 
const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignUpSchema),
  authController.signup
);

authRouter.post(
  "/login",
  validateBody(userSignInSchema),
  authController.signin
);

authRouter.post("/logout", authenticate, authController.signout);
authRouter.get("/current", authenticate, authController.getCurrent);

export default authRouter;

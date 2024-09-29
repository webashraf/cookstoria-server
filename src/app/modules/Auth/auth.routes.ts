import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login-user",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const authRoutes = router;

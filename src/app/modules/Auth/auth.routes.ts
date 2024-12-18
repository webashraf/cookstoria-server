import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { authControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login-user",
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.loginUser
);

router.put("/change-password/:id", authControllers.userPasswordChange);
router.post("/generate-new-password", authControllers.forgatPassword);
router.post("/refresh-token", authControllers.refreshToken);
router.get("/user", authControllers.getAllUsers);
router.get("/user/:id", authControllers.getSingleUserById);
router.get("/admin", authControllers.getAllAdmin);

export const authRoutes = router;

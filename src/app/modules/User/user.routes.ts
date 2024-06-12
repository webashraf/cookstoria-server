import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/signup", UserController.signupUser);

export const userRoute = router;

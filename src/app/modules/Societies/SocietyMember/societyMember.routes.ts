import { Router } from "express";
import { societyMemberController } from "./societyMember.controller";

const router = Router();

router.post("/create", societyMemberController.createSocietyMember);

export const societyMemberRoutes = router;

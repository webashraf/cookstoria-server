import { Router } from "express";
import { societyMemberController } from "./societyMember.controller";

const router = Router();

router.post("/connect", societyMemberController.createSocietyMember);
router.get("/:id", societyMemberController.getSocietyMemberById);

export const societyMemberRoutes = router;

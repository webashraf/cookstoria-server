import { Router } from "express";
import { societyMemberController } from "./societyMember.controller";

const router = Router();

router.post("/connect", societyMemberController.createSocietyMember);

// * get current login society single user
router.get(
  "/current-society-member",
  societyMemberController.getCurrentSocietyMemberByUserId
);

// * Get all members for a single society
router.get("/single/:id", societyMemberController.getSingleSocietyMembersById);

// * get all users by a original userId
// ! Keep it for quantum
router.get("/:id", societyMemberController.getSocietyMemberById);

export const societyMemberRoutes = router;

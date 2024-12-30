"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.societyMemberRoutes = void 0;
const express_1 = require("express");
const societyMember_controller_1 = require("./societyMember.controller");
const router = (0, express_1.Router)();
router.post("/connect", societyMember_controller_1.societyMemberController.createSocietyMember);
// * get current login society single user
router.get("/current-society-member", societyMember_controller_1.societyMemberController.getCurrentSocietyMemberByUserId);
// * Get all members for a single society
router.get("/single/:id", societyMember_controller_1.societyMemberController.getSingleSocietyMembersById);
// * get all users by a original userId
// ! Keep it for quantum
router.get("/:id", societyMember_controller_1.societyMemberController.getSocietyMemberById);
exports.societyMemberRoutes = router;

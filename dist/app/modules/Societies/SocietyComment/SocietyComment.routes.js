"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.societyPostCommentRoutes = void 0;
const express_1 = require("express");
const SocietyComment_controller_1 = require("./SocietyComment.controller");
const router = (0, express_1.Router)();
router.post("/create", SocietyComment_controller_1.societyPostCommentController.createSocietyPostComment);
router.get("/post-comments", SocietyComment_controller_1.societyPostCommentController.getSocietyComment);
exports.societyPostCommentRoutes = router;

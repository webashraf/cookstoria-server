"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upvoteDownvote = void 0;
const express_1 = require("express");
const upvoteDownvote_controller_1 = require("./upvoteDownvote.controller");
const router = (0, express_1.Router)();
router.post("/update", upvoteDownvote_controller_1.upvoteDownVoteController.createOrUpdateUpvoteDownvote);
router.get("/:id", upvoteDownvote_controller_1.upvoteDownVoteController.getUpvoteDownvoteFromDB);
exports.upvoteDownvote = router;

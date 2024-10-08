"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOpinionRoutes = void 0;
const express_1 = require("express");
const recipeComments_controller_1 = require("./recipeComments.controller");
const router = (0, express_1.Router)();
router.post("/create", recipeComments_controller_1.userOpinionsController.createRecipeUserOpinion);
router.get("/:postId", recipeComments_controller_1.userOpinionsController.getComments);
exports.userOpinionRoutes = router;

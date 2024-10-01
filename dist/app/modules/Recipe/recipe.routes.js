"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouters = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const recipe_controller_1 = require("./recipe.controller");
const recipe_validation_1 = require("./recipe.validation");
const router = (0, express_1.Router)();
router.post("/create-recipe", (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.recipeValidationSchema), recipe_controller_1.recipeController.createRecipe);
router.delete("/:id", recipe_controller_1.recipeController.deleteRecipe);
router.post("/status/:id", recipe_controller_1.recipeController.publishUnpublishRecipe);
router.get("/", recipe_controller_1.recipeController.getRecipe);
exports.recipeRouters = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouters = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../config/multer.config");
const parseBody_1 = require("../../middleware/parseBody");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const recipe_controller_1 = require("./recipe.controller");
const recipe_validation_1 = require("./recipe.validation");
const router = (0, express_1.Router)();
router.post("/create-recipe", multer_config_1.multerUpload.single("image"), 
// validateImageFileRequest(ImageFileZodSchema),
parseBody_1.parseBody, (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.recipeValidationSchema), recipe_controller_1.recipeController.createRecipe);
router.put("/update-recipe/:id", multer_config_1.multerUpload.single("image"), parseBody_1.parseBody, (0, validateRequest_1.default)(recipe_validation_1.recipeValidations.updateRecipeValidationSchema), recipe_controller_1.recipeController.updateRecipe);
router.delete("/:id", recipe_controller_1.recipeController.deleteRecipe);
router.put("/status/:id", recipe_controller_1.recipeController.publishUnpublishRecipe);
router.get("/", recipe_controller_1.recipeController.getRecipe);
router.get("/my-recipe/:id", recipe_controller_1.recipeController.getRecipe);
exports.recipeRouters = router;

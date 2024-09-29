import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { recipeController } from "./recipe.controller";
import { recipeValidations } from "./recipe.validation";

const router = Router();

router.post(
  "/create-recipe",
  validateRequest(recipeValidations.recipeValidationSchema),
  recipeController.createRecipe
);

export const recipeRouters = router;

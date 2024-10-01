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
router.delete("/:id", recipeController.deleteRecipe);
router.post("/status/:id", recipeController.publishUnpublishRecipe);

router.get("/", recipeController.getRecipe)


export const recipeRouters = router;

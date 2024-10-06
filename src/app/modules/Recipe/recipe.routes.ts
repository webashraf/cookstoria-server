import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middleware/parseBody";
import validateRequest from "../../middleware/validateRequest";
import { recipeController } from "./recipe.controller";
import { recipeValidations } from "./recipe.validation";

const router = Router();

router.post(
  "/create-recipe",
  multerUpload.single("image"),
  parseBody,
  validateRequest(recipeValidations.recipeValidationSchema),
  recipeController.createRecipe
);
router.delete("/:id", recipeController.deleteRecipe);
router.put("/status/:id", recipeController.publishUnpublishRecipe);

router.get("/", recipeController.getRecipe);
router.get("/my-recipe/:id", recipeController.getRecipe);

export const recipeRouters = router;

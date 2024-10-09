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
  // validateImageFileRequest(ImageFileZodSchema),
  parseBody,
  validateRequest(recipeValidations.recipeValidationSchema),
  recipeController.createRecipe
);
router.put(
  "/update-recipe/:id",
  multerUpload.single("image"),
  parseBody,
  validateRequest(recipeValidations.updateRecipeValidationSchema),
  recipeController.updateRecipe
);
router.delete("/:id", recipeController.deleteRecipe);
router.put("/status/:id", recipeController.partialUpdateRecipe);

router.get("/", recipeController.getRecipe);
router.get("/my-recipe/:id", recipeController.getRecipe);

export const recipeRouters = router;

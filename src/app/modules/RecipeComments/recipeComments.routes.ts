import { Router } from "express";
import { userOpinionsController } from "./recipeComments.controller";

const router = Router();

router.post("/create", userOpinionsController.createRecipeUserOpinion);
router.post("/remove-opinions", userOpinionsController.removeUserOpinions);

export const userOpinionRoutes = router;

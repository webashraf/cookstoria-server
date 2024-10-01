import { Router } from "express";
import { userOpinionsController } from "./recipeComments.controller";

const router = Router();

router.post("/create", userOpinionsController.createRecipeUserOpinion);

export const userOpinionRoutes = router;

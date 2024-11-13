import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { recipeRouters } from "../modules/Recipe/recipe.routes";
import { userOpinionRoutes } from "../modules/RecipeComments/recipeComments.routes";
import { storyReelsRoute } from "../modules/StoryReels/storyReels.routes";
import { socialConnectivityRoutes } from "../modules/socialConnection/socialConnection.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = Router();

const appRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/social",
    route: socialConnectivityRoutes,
  },
  {
    path: "/recipe",
    route: recipeRouters,
  },
  {
    path: "/story",
    route: storyReelsRoute,
  },
  {
    path: "/user-opinion",
    route: userOpinionRoutes,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;

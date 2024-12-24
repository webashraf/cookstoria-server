import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { recipeRouters } from "../modules/Recipe/recipe.routes";
import { userOpinionRoutes } from "../modules/RecipeComments/recipeComments.routes";
import { socialConnectivityRoutes } from "../modules/SocialConnection/socialConnection.routes";
import { societyRoutes } from "../modules/Societies/Society/society.routes";
import { societyPostCommentRoutes } from "../modules/Societies/SocietyComment/SocietyComment.routes";
import { societyMemberRoutes } from "../modules/Societies/SocietyMember/societyMember.routes";
import { societyPostRoutes } from "../modules/Societies/SocietyPost/societyPost.routes";
import { storyReelsRoute } from "../modules/StoryReels/storyReels.routes";
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
  {
    path: "/society",
    route: societyRoutes,
  },
  {
    path: "/society-member",
    route: societyMemberRoutes,
  },
  {
    path: "/society-post",
    route: societyPostRoutes,
  },
  {
    path: "/society-post-comment",
    route: societyPostCommentRoutes,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;

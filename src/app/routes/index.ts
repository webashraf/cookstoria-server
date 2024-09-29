import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { socialConductivityRoutes } from "../modules/socialConductivities/socialConductivity.routes";
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
    route: socialConductivityRoutes,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;

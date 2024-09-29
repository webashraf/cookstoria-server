import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoute } from "../modules/user/user.routes";

const router = Router();

const appRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;

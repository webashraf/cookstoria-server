import { Router } from "express";
import { userRoute } from "../User/user.routes";

const router = Router();

const appRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
];

appRoutes.forEach((aRoute) => {
  router.use(aRoute.path, aRoute.route);
});

export default router;

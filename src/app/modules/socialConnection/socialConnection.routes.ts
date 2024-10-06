import { Router } from "express";
import { socialConnectivityController } from "./socialConnection.controller";

const router = Router();

router.post("/follow", socialConnectivityController.createAFollower);
router.post("/unfollow/:id", socialConnectivityController.unfollowAUser);
router.get("/follow/:id", socialConnectivityController.getFollowersById);
router.get("/follow", socialConnectivityController.getFollowers);

export const socialConnectivityRoutes = router;

import { Router } from "express";
import { socialConductivityController } from "./socialConductivity.controller";

const router = Router();

router.post("/follow", socialConductivityController.createAFollower);
router.post("/unfollow/:id", socialConductivityController.unfollowAUser);
router.get("/follow/:id", socialConductivityController.getFollowersById);

export const socialConductivityRoutes = router;

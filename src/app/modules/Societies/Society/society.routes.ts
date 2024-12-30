import { Router } from "express";
import { multerUpload } from "../../../config/multer.config";
import { parseBody } from "../../../middleware/parseBody";
import { societyController } from "./society.controller";

const router = Router();

router.post(
  "/create",
  multerUpload.single("image"),
  parseBody,
  societyController.createSociety
);
router.get("/society-for-connect/:id", societyController.getSocietyForConnect);
router.get("/", societyController.getSociety);
router.get("/single/:id", societyController.getSingleSociety);
router.put("/update/:id", societyController.updateSociety);

export const societyRoutes = router;

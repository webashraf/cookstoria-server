import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/success", paymentController.successPayment);
router.post("/failed", paymentController.failedPayment);

export const paymentRoute = router;

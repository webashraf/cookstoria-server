import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/", paymentController.successPayment);
router.post("/failed", paymentController.failedPayment);
router.post("/cancel", paymentController.cancelPayment);

export const paymentRoute = router;

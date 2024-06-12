import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();

router.post("/", BookingController.createABooking);

export const bookingRoute = router;

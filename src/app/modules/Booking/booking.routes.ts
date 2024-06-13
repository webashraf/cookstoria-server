import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();

router.post("/", BookingController.createABooking);

router.get("/", BookingController.retriveBookings);

export const bookingRoute = router;

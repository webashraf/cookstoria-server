import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingController } from "./booking.controller";
import { BookingValidators } from "./booking.validation";

const router = Router();

router.post(
  "/",
  validateRequest(BookingValidators.BookingValidationSchema),
  BookingController.createABooking
);

router.get("/", BookingController.retriveBookings);

router.get("/user", BookingController.retriveBookingsForUser);

router.delete("/:id", BookingController.deleteBookingForUser);

export const bookingRoute = router;

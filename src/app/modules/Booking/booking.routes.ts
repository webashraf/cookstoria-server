import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../User/user.const";
import { BookingController } from "./booking.controller";
import { BookingValidators } from "./booking.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidators.BookingValidationSchema),
  BookingController.createABooking
);

router.get("/", auth(USER_ROLE.admin), BookingController.retriveBookings);

router.get(
  "/user/:id",
  auth(USER_ROLE.user),
  BookingController.retriveBookingsForUser
);

router.delete(
  "/:id",
  auth(USER_ROLE.user),
  BookingController.deleteBookingForUser
);

export const bookingRoute = router;

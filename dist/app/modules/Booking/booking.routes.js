"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_const_1 = require("../User/user.const");
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(user_const_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.BookingValidators.BookingValidationSchema), booking_controller_1.BookingController.createABooking);
router.get("/", (0, auth_1.default)(user_const_1.USER_ROLE.admin), booking_controller_1.BookingController.retriveBookings);
router.get("/user/:id", (0, auth_1.default)(user_const_1.USER_ROLE.user), booking_controller_1.BookingController.retriveBookingsForUser);
router.delete("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.user), booking_controller_1.BookingController.deleteBookingForUser);
exports.bookingRoute = router;

import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./booking.service";

const createABooking = catchAsync(async (req, res) => {
  const result = await BookingService.createABookingIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Booking created successfully",
    data: result,
  });
});

const retriveBookings = catchAsync(async (req, res) => {
  const result = await BookingService.retriveABookingsIntoDB(req.params.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

export const BookingController = {
  createABooking,
  retriveBookings,
};

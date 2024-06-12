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

export const BookingController = {
  createABooking,
};

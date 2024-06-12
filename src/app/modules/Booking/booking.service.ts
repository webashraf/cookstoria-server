import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createABookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

export const BookingService = {
  createABookingIntoDB,
};

import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createABookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

const retriveABookingsIntoDB = async (id: string) => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

export const BookingService = {
  createABookingIntoDB,
  retriveABookingsIntoDB
};

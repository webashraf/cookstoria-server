import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createABookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

const retriveABookingsIntoDB = async (id: string, isUser: boolean) => {
  if (isUser) {
    const result = await Booking.find().populate("facility");
    return result;
  }

  const result = await Booking.find().populate("user").populate("facility");
  if (result.length < 1) {
    throw new Error("Could not find data")
  }

  return result;
};

const deleteABookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    { runValidators: true, new: true }
  );
  return result;
};

export const BookingService = {
  createABookingIntoDB,
  retriveABookingsIntoDB,
  deleteABookingFromDB,
};

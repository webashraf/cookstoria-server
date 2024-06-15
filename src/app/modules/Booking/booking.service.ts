import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { bookingUtils } from "./booking.utils";

const createABookingIntoDB = async (payload: TBooking, email: string) => {
  const currentDate = new Date(payload.date);
  const toDay = new Date();
  const inputYear = payload.date.split("-");

  // const [day, month, year] = date.split("-");
  // let formattedDate = `${year}-${month}-${day}`;

  if (
    inputYear[0].length !== 4 ||
    !(Number(inputYear[1]) <= 12) ||
    Number(inputYear[1]) === 0 ||
    Number(inputYear[2]) === 0 ||
    !(Number(inputYear[2]) <= 31)
  ) {
    throw new Error(
      "Invalid date format! You must provide a date in YYYY-MM-DD format!!"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Could not find user!!");
  }

  const userId = user._id;

  payload.user = userId;

  const currentBookingHistory = await Booking.find({
    date: payload.date,
  }).select("startTime endTime date");

  const newTime = {
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  const isNotTimeFree = bookingUtils.doesOverlap(
    currentBookingHistory,
    newTime
  );

  if (isNotTimeFree) {
    throw new Error("Time is already overlapped!!");
  }

  if (currentDate < toDay) {
    throw new Error("Date is out of range");
  }

  const result = await Booking.create(payload);
  return result;
};

// --------------------------------------------------------------------------------------------------------------------

const retriveABookingsIntoDB = async (id: string, isUser: boolean) => {
  if (isUser) {
    const result = await Booking.find().populate("facility");
    return result;
  }

  const result = await Booking.find().populate("user").populate("facility");
  if (result.length < 1) {
    throw new Error("Could not find data");
  }
  return result;
};

const deleteABookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    { runValidators: true, new: true }
  ).populate("facility");
  return result;
};

export const BookingService = {
  createABookingIntoDB,
  retriveABookingsIntoDB,
  deleteABookingFromDB,
};

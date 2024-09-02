import { initiatePayment } from "../Payment/payment.utils";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { bookingUtils } from "./booking.utils";

const createABookingIntoDB = async (payload: TBooking, email: string) => {
  console.log(payload, email);

  const currentDate = new Date(payload.date);
  const toDay = new Date();
  const inputYear = payload.date.split("-");

  // const [day, month, year] = date.split("-");
  // let formattedDate = `${year}-${month}-${day}`;
  // console.log(payload.facility);

  const findBookByCurrentDateAndFacility = await Booking.find({
    date: payload.date,
    facility: payload.facility,
  });
  // console.log("FF", findBookByCurrentDateAndFacility);

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

  // const currentBookingHistory = await Booking.find({
  //   date: payload.date,
  // }).select("startTime endTime date");

  const newTime = {
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  const isNotTimeFree = bookingUtils.doesOverlap(
    findBookByCurrentDateAndFacility,
    newTime
  );

  if (isNotTimeFree) {
    throw new Error("Time is already overlapped!!");
  }

  if (currentDate < toDay) {
    throw new Error("Date is out of range");
  }
  function generateUniqueTransactionId() {
    const randomString = Math.random().toString(36).substr(2, 9);
    const transactionId = `TXN-${Date.now()}-${randomString}`;
    return transactionId;
  }

  const transactionId = generateUniqueTransactionId();

  const paymentInfo = {
    transactionId,
    payment: payload.payableAmount,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };
  const paymentSession = await initiatePayment(paymentInfo);
  // return paymentSession;

  if (paymentSession?.result) {
    const result = await Booking.create(payload);
    return { paymentSession, result };
  }
};

// --------------------------------------------------------------------------------------------------------------------

const retriveABookingsIntoDB = async (email: string, isUser: boolean) => {
  if (isUser) {
    // console.log(id);

    const user = await User.findOne({ email: email });

    const result = await Booking.find({
      user: user?._id,
      isBooked: "confirmed",
    })
      .populate("user")
      .populate("facility");
    if (result.length < 1) {
      throw new Error("Could not find data");
    }
    return result;
  }
  const result = await Booking.find({ isBooked: "confirmed" })
    .populate("user")
    .populate("facility");
  if (result.length < 1) {
    throw new Error("Could not find data");
  }
  // const result = await Booking.find().populate("facility");
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

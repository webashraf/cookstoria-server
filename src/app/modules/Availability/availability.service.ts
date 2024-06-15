import { Booking } from "../Booking/booking.model";
import { availiabilityUtils } from "./availability.utils";

const checkAvailabilityFromDB = async (date: string = "0") => {
  let formattedNewDate = date;

  const inputYear = date.split("-");
  if (date.length === 1) {
    formattedNewDate = new Date().toISOString().slice(0, 10);
    console.log(formattedNewDate);
  } else if (
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


  console.log({ formattedNewDate });
  const currentDate = new Date(formattedNewDate);
  const toDay = new Date();

  if (currentDate < toDay && !(date.length === 1)) {
    throw new Error("Date is already pas!!");
  }

  const currentBookingHistory = await Booking.find({
    date: formattedNewDate,
  }).select("startTime endTime");
  console.log({ currentBookingHistory }, { formattedNewDate });

  if (currentBookingHistory.length < 1) {
    return availiabilityUtils.generateTwoHourTimeSlots();
  }

  const result = availiabilityUtils.generateAvailableSlots(
    currentBookingHistory
  );

  return result;
};

export const checkAvailabilityService = {
  checkAvailabilityFromDB,
};

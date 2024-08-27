import { AnyObject } from "mongoose";
import { Booking } from "../Booking/booking.model";
import { availiabilityUtils } from "./availability.utils";

const checkAvailabilityFromDB = async (
  date: string = "0",
  facility: string = ""
) => {
  let formattedNewDate = date;

  const inputYear = date.split("-");
  if (date.length === 1) {
    formattedNewDate = new Date().toISOString().slice(0, 10);
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

  const currentDate = new Date(formattedNewDate);
  const toDay = new Date();

  if (currentDate < toDay && !(date.length === 1)) {
    throw new Error("Date is already pas!!");
  }

  const filter: AnyObject = {
    date: formattedNewDate,
  };

  if (facility) {
    filter["facility"] = facility;
  }

  if (filter) {
    const facilityResult = await Booking.find({
      date: "2028-06-23",
      facility: "66ccc0a163c1483f70b8615d",
    });
    console.log("facilityResult: ", facilityResult);
  }

  const currentBookingHistory =
    await Booking.find(filter).select("startTime endTime");
  console.log("Current Booking History", currentBookingHistory);

  if (currentBookingHistory.length === 0) {
    throw new Error("Not available slot based on this facility!!");
  }

  if (currentBookingHistory.length < 1) {
    return availiabilityUtils.generateTwoHourTimeSlots();
  }
  const result = availiabilityUtils.generateAvailableSlots(
    currentBookingHistory
  );
  console.log("result: ", result);

  if (result.length === 0) {
    throw new Error("Not available slot. Try another date!!");
  }
  return result;
};

export const checkAvailabilityService = {
  checkAvailabilityFromDB,
};

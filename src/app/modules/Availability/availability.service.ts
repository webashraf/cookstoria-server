import { Booking } from "../Booking/booking.model";
import { availiabilityUtils } from "./availability.utils";

const checkAvailabilityFromDB = async (date: string) => {
  const [day, month, year] = date.split("-");
  const formattedDate = `${year}-${month}-${day}`;
  const currentDate = new Date(formattedDate);
  const toDay = new Date();

  if (currentDate < toDay) {
    throw new Error("Date is out of range");
  }

  const currentBookingHistory = await Booking.find({
    date: formattedDate,
  }).select("startTime endTime");

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

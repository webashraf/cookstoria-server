import { Booking } from "../Booking/booking.model";

const checkAvailabilityFromDB = async (date: string) => {
  const [day, month, year] = date.split("-");
  const formattedDate = `${year}-${month}-${day}`;
  const standardDate = new Date(formattedDate);
  const toDay = new Date();

  if (standardDate < toDay) {
    console.log("hello");
    throw new Error("Date is out of range");
  }

  const currentBookingHistory = await Booking.find({
    date: formattedDate,
  });

  // const { startTime, endTime } = currentBookingHistory as any;
  let startTime;
  let endTime;

  let bookedTime = 0;

  currentBookingHistory.forEach((time) => {
    startTime = time.startTime;
    endTime = time.endTime;

    const time1 = new Date(`2000-01-01T${startTime}:00`);
    const time2 = new Date(`2000-01-01T${endTime}:00`);

    const differenceMilliseconds = Number(time1) - Number(time2);

    const differenceInHour = (
      Math.abs(differenceMilliseconds) / 3600000
    ).toFixed(2);
    bookedTime += Number(differenceInHour);
  });
  const availableTime = 24 - Number(bookedTime);
  console.log(availableTime, startTime, endTime);
  return currentBookingHistory;
};

export const checkAvailabilityService = {
  checkAvailabilityFromDB,
};

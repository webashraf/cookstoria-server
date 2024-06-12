import { Schema, model } from "mongoose";
import { Facility } from "../Facility/facility.model";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  payableAmount: {
    type: Number,
    default: 0,
    // required: true,
  },
  isBooked: {
    type: String,
    enum: ["confirmed", "canceled"],
    default: "confirmed",
  },
});

bookingSchema.pre("save", async function (next) {
  const { startTime, endTime } = this;

  const time1 = new Date(`2000-01-01T${startTime}:00`);
  const time2 = new Date(`2000-01-01T${endTime}:00`);

  const differenceMilliseconds = Number(time1) - Number(time2);

  const differenceInHour = (Math.abs(differenceMilliseconds) / 3600000).toFixed(
    2
  );

  console.log("Difference", Number(differenceInHour));

  const facilityForBooking = await Facility.findById(this.facility);
  const payableAmount =
    Number(differenceInHour) * Number(facilityForBooking?.pricePerHour);
  console.log(payableAmount);
  this.payableAmount = payableAmount;

  console.log(this);

    if (!facilityForBooking) {
      throw new Error("Facility not found!!");
    }
    next();
});

export const Booking = model<TBooking>("Booking", bookingSchema);

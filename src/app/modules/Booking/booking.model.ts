import { Schema, model } from "mongoose";
import { Facility } from "../Facility/facility.model";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
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
    ref: "User",
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
  },
  payableAmount: {
    type: Number,
    default: 0,
  },
  isBooked: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
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

  const facilityForBooking = await Facility.findById(this.facility);
  const payableAmount =
    Number(differenceInHour) * Number(facilityForBooking?.pricePerHour);
  this.payableAmount = payableAmount;

  if (!facilityForBooking) {
    throw new Error("Facility not found!!");
  }
  next();
});

export const Booking = model<TBooking>("Booking", bookingSchema);

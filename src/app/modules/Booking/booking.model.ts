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
  payable: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ["confirmed", "canceled"],
    default: "confirmed",
  },
});

bookingSchema.pre("save", async function (next) {
  console.log(this.facility);

  const isFacilityExist = await Facility.findById(this.facility);
  console.log(isFacilityExist);

  if (!isFacilityExist) {
    throw new Error("Facility not found!!");
  }
  next();
});

export const Booking = model<TBooking>("Booking", bookingSchema);

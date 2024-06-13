import { z } from "zod";

const timeRegex = /^([01]\d|2[0-4]):([0-5]\d)$/;

const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z
      .string()
      .regex(timeRegex, { message: "Invalid start time format" }),
    endTime: z
      .string()
      .regex(timeRegex, { message: "Invalid end time format" }),
    user: z.string(),
    facility: z.string(),
    // payableAmount: z.number(),
    // isBooked: z.enum(["confirmed", "unconfirmed", "canceled"]),
  }),
});

export const BookingValidators = {
  BookingValidationSchema,
};

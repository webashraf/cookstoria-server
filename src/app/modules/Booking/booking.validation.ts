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
    facility: z.string(),
  }),
});

export const BookingValidators = {
  BookingValidationSchema,
};

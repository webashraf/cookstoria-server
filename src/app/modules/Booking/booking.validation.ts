import { z } from "zod";

const timeRegex = /^([01]\d|2[0-4]):([0-5]\d)$/;
// const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const dateRegex = /^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/;

const BookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string({ required_error: "End time is missing!!" })
      .regex(dateRegex, {
        message: "Invalid date format. Use YYYY-MM-DD or DD-MM-YYYY!!",
      }),
    startTime: z
      .string({ required_error: "Start time is missing!!" })
      .regex(timeRegex, { message: "Use HH:mm format!!" }),
    endTime: z
      .string({ required_error: "End time is missing!!" })
      .regex(timeRegex, { message: "Use HH:mm format!!" }),
    facility: z.string({ required_error: "Facility is required!!" }),
  }),
});

export const BookingValidators = {
  BookingValidationSchema,
};

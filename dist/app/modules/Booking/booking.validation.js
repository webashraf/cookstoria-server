"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidators = void 0;
const zod_1 = require("zod");
const timeRegex = /^([01]\d|2[0-4]):([0-5]\d)$/;
// const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateRegex = /^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/;
const BookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z
            .string({ required_error: "End time is missing!!" })
            .regex(dateRegex, {
            message: "Invalid date format. Use YYYY-MM-DD or DD-MM-YYYY!!",
        }),
        startTime: zod_1.z
            .string({ required_error: "Start time is missing!!" })
            .regex(timeRegex, { message: "Use HH:mm format!!" }),
        endTime: zod_1.z
            .string({ required_error: "End time is missing!!" })
            .regex(timeRegex, { message: "Use HH:mm format!!" }),
        facility: zod_1.z.string({ required_error: "Facility is required!!" }),
    }),
});
exports.BookingValidators = {
    BookingValidationSchema,
};

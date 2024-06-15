"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityValidators = void 0;
const zod_1 = require("zod");
const facilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required." }),
        description: zod_1.z.string({ required_error: "Description is required." }),
        pricePerHour: zod_1.z.number({ required_error: "Price per hour is required." }),
        location: zod_1.z.string({ required_error: "Location is required." }),
    }),
});
const updeteFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
    }),
});
exports.FacilityValidators = {
    facilityValidationSchema,
    updeteFacilityValidationSchema,
};

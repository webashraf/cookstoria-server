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
//! Old code
// const updeteFacilityValidationSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     photoUrl: z.string().optional(),
//     description: z.string().optional(),
//     pricePerHour: z.number().optional(),
//     location: z.string().optional(),
//   }),
// });
// * new code make it require
const updateFacilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        photoUrl: zod_1.z.string(),
        description: zod_1.z.string(),
        pricePerHour: zod_1.z.number(),
        location: zod_1.z.string(),
    }),
});
exports.FacilityValidators = {
    facilityValidationSchema,
    updateFacilityValidationSchema,
};

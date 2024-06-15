import { z } from "zod";

const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    description: z.string({ required_error: "Description is required." }),
    pricePerHour: z.number({ required_error: "Price per hour is required." }),
    location: z.string({ required_error: "Location is required." }),
  }),
});

const updeteFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    location: z.string().optional(),
  }),
});

export const FacilityValidators = {
  facilityValidationSchema,
  updeteFacilityValidationSchema,
};

import { z } from "zod";

const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string(),
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

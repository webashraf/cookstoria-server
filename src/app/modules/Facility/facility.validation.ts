import { z } from "zod";

const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string(),
  }),
});

export const FacilityValidators = {
  facilityValidationSchema,
};

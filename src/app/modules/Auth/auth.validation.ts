import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required!!" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address!!",
      }),
    password: z.string({ required_error: "Password is missing!!" }),
  }),
});

export const AuthValidator = {
  loginValidationSchema,
};

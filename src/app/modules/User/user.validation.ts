import { z } from "zod";

const userCreateValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Name is required!!" }),

    email: z
      .string({ required_error: "Email is required!!" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address!!",
      }),

    password: z.string({ required_error: "Password is required!!" }),
    profilePicture: z.string({
      required_error: "profilePicture is required!!",
    }),

    role: z.enum(["admin", "user"], { required_error: "Role is required!!" }),
  }),
});

export const userValidations = {
  userCreateValidationSchema,
};

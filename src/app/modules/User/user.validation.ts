import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!!" }),

    email: z
      .string({ required_error: "Email is required!!" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address!!",
      }),

    password: z.string({ required_error: "Password is required!!" }),

    phone: z.string({ required_error: "Phone number is required!!" }),
    role: z.enum(["admin", "user"], { required_error: "Role is required!!" }),

    address: z.string({ required_error: "Address is required!!" }),
  }),
});

export const UserValidatior = {
  userValidationSchema,
};

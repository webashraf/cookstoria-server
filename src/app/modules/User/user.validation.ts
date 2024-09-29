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

const userUpdateValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Name is required!!" }).optional(),

    email: z
      .string({ required_error: "Email is required!!" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address!!",
      })
      .optional(),

    password: z.string({ required_error: "Password is required!!" }).optional(),
    profilePicture: z
      .string({
        required_error: "profilePicture is required!!",
      })
      .optional(),

    role: z
      .enum(["admin", "user"], { required_error: "Role is required!!" })
      .optional(),
    isDeleted: z.boolean().optional(),
    status: z.enum(["active", "blocked"]).optional(),
    needsPasswordChange: z.boolean().optional(),
  }),
});

export const userValidations = {
  userCreateValidationSchema,
  userUpdateValidationSchema,
};

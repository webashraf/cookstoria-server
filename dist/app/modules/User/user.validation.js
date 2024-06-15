"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidatior = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required!!" }),
        email: zod_1.z
            .string({ required_error: "Email is required!!" })
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            message: "Invalid email address!!",
        }),
        password: zod_1.z.string({ required_error: "Password is required!!" }),
        phone: zod_1.z.string({ required_error: "Phone number is required!!" }),
        role: zod_1.z.enum(["admin", "user"], { required_error: "Role is required!!" }),
        address: zod_1.z.string({ required_error: "Address is required!!" }),
    }),
});
exports.UserValidatior = {
    userValidationSchema,
};

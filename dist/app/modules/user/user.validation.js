"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const userCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: "Name is required!!" }),
        email: zod_1.z
            .string({ required_error: "Email is required!!" })
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            message: "Invalid email address!!",
        }),
        password: zod_1.z.string({ required_error: "Password is required!!" }),
        profilePicture: zod_1.z.string({
            required_error: "profilePicture is required!!",
        }),
        role: zod_1.z.enum(["admin", "user"], { required_error: "Role is required!!" }),
    }),
});
exports.userValidations = {
    userCreateValidationSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required!!" })
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            message: "Invalid email address!!",
        }),
        password: zod_1.z.string({ required_error: "Password is missing!!" }),
    }),
});
exports.AuthValidator = {
    loginValidationSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFilesArrayZodSchema = exports.ImageFileZodSchema = void 0;
const zod_1 = require("zod");
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "png",
    "jpeg",
    "jpg",
];
exports.ImageFileZodSchema = zod_1.z.object({
    fieldname: zod_1.z.string(),
    originalname: zod_1.z.string(),
    encoding: zod_1.z.string(),
    mimetype: zod_1.z.enum(ACCEPTED_FILE_TYPES),
    path: zod_1.z.string(),
    size: zod_1.z
        .number()
        .refine((size) => size <= MAX_UPLOAD_SIZE, "File size must be less than 3MB"),
    filename: zod_1.z.string(),
});
exports.ImageFilesArrayZodSchema = zod_1.z.object({
    image: exports.ImageFileZodSchema,
});

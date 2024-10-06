"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeValidations = void 0;
const zod_1 = require("zod");
const nutritionFactsValidationSchema = zod_1.z.object({
    calories: zod_1.z
        .number()
        .min(0, { message: "Calories must be a positive number" }),
    protein: zod_1.z.number().min(0, { message: "Protein must be a positive number" }),
    fat: zod_1.z.number().min(0, { message: "Fat must be a positive number" }),
    carbohydrates: zod_1.z
        .number()
        .min(0, { message: "Carbohydrates must be a positive number" }),
});
const recipeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, { message: "Title is required" }),
        user: zod_1.z.string().min(1, { message: "User is required" }),
        imageUrl: zod_1.z.string().url({ message: "Invalid URL" }).optional(),
        ingredients: zod_1.z.array(zod_1.z.string().min(1, { message: "Ingredient cannot be empty" })),
        tags: zod_1.z.array(zod_1.z.string().min(1, { message: "Ingredient cannot be empty" })),
        categories: zod_1.z.array(zod_1.z.string().min(1, { message: "Ingredient cannot be empty" })),
        htmlInstructions: zod_1.z
            .string()
            .min(1, { message: "Instructions are required" }),
        instructions: zod_1.z.string().min(1, { message: "Instructions are required" }),
        preparationTime: zod_1.z
            .number()
            .min(1, { message: "Preparation time must be at least 1 minute" }),
        cookingTime: zod_1.z
            .number()
            .min(1, { message: "Cooking time must be at least 1 minute" }),
        servings: zod_1.z.number().min(1, { message: "Servings must be at least 1" }),
        cuisine: zod_1.z.string().optional(),
        isPremium: zod_1.z.boolean().optional(),
        dietaryRestrictions: zod_1.z.array(zod_1.z.string()).optional(),
        nutritionFacts: nutritionFactsValidationSchema.optional(),
    }),
});
exports.recipeValidations = {
    recipeValidationSchema,
};

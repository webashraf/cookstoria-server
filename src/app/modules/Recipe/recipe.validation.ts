import { z } from "zod";

const nutritionFactsValidationSchema = z.object({
  calories: z
    .number()
    .min(0, { message: "Calories must be a positive number" }),
  protein: z.number().min(0, { message: "Protein must be a positive number" }),
  fat: z.number().min(0, { message: "Fat must be a positive number" }),
  carbohydrates: z
    .number()
    .min(0, { message: "Carbohydrates must be a positive number" }),
});

const recipeValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    user: z.string().min(1, { message: "User is required" }),
    imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
    ingredients: z.array(
      z.string().min(1, { message: "Ingredient cannot be empty" })
    ),
    tags: z.array(z.string().min(1, { message: "Ingredient cannot be empty" })),
    categories: z.array(
      z.string().min(1, { message: "Ingredient cannot be empty" })
    ),
    htmlInstructions: z
      .string()
      .min(1, { message: "Instructions are required" }),
    instructions: z.string().min(1, { message: "Instructions are required" }),
    preparationTime: z
      .number()
      .min(1, { message: "Preparation time must be at least 1 minute" }),
    cookingTime: z
      .number()
      .min(1, { message: "Cooking time must be at least 1 minute" }),
    servings: z.number().min(1, { message: "Servings must be at least 1" }),
    cuisine: z.string().min(1, { message: "Cuisine must be required" }),
    dietaryRestrictions: z
      .array(z.string())
      .min(1, { message: "Dietary Restrictions must be required" }),
    isPremium: z.boolean().optional(),
    nutritionFacts: nutritionFactsValidationSchema.optional(),
  }),
});

const nutritionFactsValidationSchemaForUpdate = z.object({
  calories: z
    .number()
    .min(0, { message: "Calories must be a positive number" })
    .optional(),
  protein: z
    .number()
    .min(0, { message: "Protein must be a positive number" })
    .optional(),
  fat: z
    .number()
    .min(0, { message: "Fat must be a positive number" })
    .optional(),
  carbohydrates: z
    .number()
    .min(0, { message: "Carbohydrates must be a positive number" })
    .optional(),
});

const updateRecipeValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    user: z.string().min(1, { message: "User is required" }).optional(),
    imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
    ingredients: z
      .array(z.string().min(1, { message: "Ingredient cannot be empty" }))
      .optional(),
    tags: z
      .array(z.string().min(1, { message: "Ingredient cannot be empty" }))
      .optional(),
    categories: z
      .array(z.string().min(1, { message: "Ingredient cannot be empty" }))
      .optional(),
    htmlInstructions: z
      .string()
      .min(1, { message: "Instructions are required" })
      .optional(),
    instructions: z
      .string()
      .min(1, { message: "Instructions are required" })
      .optional(),
    // preparationTime: z
    //   .number()
    //   .min(1, { message: "Preparation time must be at least 1 minute" })
    //   .optional(),
    // cookingTime: z
    //   .number()
    //   .min(1, { message: "Cooking time must be at least 1 minute" })
    //   .optional(),
    servings: z
      .number()
      .min(1, { message: "Servings must be at least 1" })
      .optional(),
    cuisine: z.string().optional(),
    isPremium: z.boolean().optional(),
    dietaryRestrictions: z.array(z.string()).optional(),
    nutritionFacts: nutritionFactsValidationSchemaForUpdate.optional(),
  }),
});

export const recipeValidations = {
  recipeValidationSchema,
  updateRecipeValidationSchema,
};

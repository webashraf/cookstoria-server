import { model, Schema } from "mongoose";
import { IRecipe } from "./recipe.interface";

const recipeSchema: Schema<IRecipe> = new Schema({
  title: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ingredients: { type: [String], required: true },
  tags: { type: [String], required: true },
  categories: { type: [String], required: true },
  instructions: { type: String, required: true },
  htmlInstructions: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  cuisine: { type: String, required: false },
  dietaryRestrictions: { type: [String], required: false },
  imageUrl: { type: String },
  nutritionFacts: {
    calories: { type: Number, required: false },
    protein: { type: Number, required: false },
    fat: { type: Number, required: false },
    carbohydrates: { type: Number, required: false },
  },
  createdAt: { type: Date, default: Date.now, required: false },
  updatedAt: { type: Date, default: Date.now, required: false },
  isDeleted: { type: Boolean, default: false, required: false },
  isPremium: { type: Boolean, default: false, required: false },
  status: { type: String, default: "publish", required: false },
});

export const Recipe = model<IRecipe>("Recipe", recipeSchema);

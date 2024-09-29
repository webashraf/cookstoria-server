import { ObjectId } from "mongoose";

export interface IRecipe {
  title: string;
  user: ObjectId;
  ingredients: string[];
  instructions: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  cuisine?: string;
  dietaryRestrictions?: string[];
  imageUrl?: string;
  nutritionFacts?: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

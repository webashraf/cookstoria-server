"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    cuisine: { type: String, required: false },
    dietaryRestrictions: { type: [String], required: false },
    imageUrl: { type: String, required: true },
    nutritionFacts: {
        calories: { type: Number, required: false },
        protein: { type: Number, required: false },
        fat: { type: Number, required: false },
        carbohydrates: { type: Number, required: false },
    },
    createdAt: { type: Date, default: Date.now, required: false },
    updatedAt: { type: Date, default: Date.now, required: false },
    isDeleted: { type: Boolean, default: false, required: false },
    status: { type: String, default: "publish", required: false },
});
exports.Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);

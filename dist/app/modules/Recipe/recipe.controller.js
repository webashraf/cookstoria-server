"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const recipe_service_1 = require("./recipe.service");
const createRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeService.createRecipeIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Recipe is created successfully!",
        data: result,
    });
}));
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeService.deleteRecipeIntoDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Recipe is deleted successfully!",
        data: result,
    });
}));
const publishUnpublishRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeService.publishOrUnpublishRecipeIntoDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Recipe status successfully updated!",
        data: result,
    });
}));
const getRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeService.getRecipeFromDB();
    res.status(200).json({
        success: true,
        message: "Recipe successfully get!",
        data: result,
    });
}));
exports.recipeController = {
    getRecipe,
    createRecipe,
    deleteRecipe,
    publishUnpublishRecipe,
};

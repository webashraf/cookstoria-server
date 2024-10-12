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
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield recipe_service_1.recipeService.createRecipeIntoDB(req.body, image);
    res.status(200).json({
        success: true,
        message: "Recipe is created successfully!",
        data: result,
    });
}));
const updateRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const image = (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path;
    const result = yield recipe_service_1.recipeService.updateRecipeIntoDB(req.params.id, req.body, image);
    res.status(200).json({
        success: true,
        message: "Recipe is updated successfully!",
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
const partialUpdateRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeService.updateRecipePertialInfo(req.params.id, req.query);
    res.status(200).json({
        success: true,
        message: "Recipe status successfully updated!",
        data: result,
    });
}));
const getRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeService.getRecipeFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Recipe successfully get!",
        data: result.recipes,
        dataLength: result.dataLength,
    });
}));
exports.recipeController = {
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    partialUpdateRecipe,
};

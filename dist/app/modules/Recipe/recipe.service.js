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
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeService = void 0;
const recipe_modal_1 = require("./recipe.modal");
const createRecipeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeData = Object.assign(Object.assign({}, payload), { createdAt: new Date(), updatedAt: new Date() });
    const res = yield recipe_modal_1.Recipe.create(recipeData);
    return res;
});
const deleteRecipeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield recipe_modal_1.Recipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, upsert: true });
    return res;
});
const publishOrUnpublishRecipeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipe_modal_1.Recipe.findById(id);
    // console.log(recipe);
    if ((recipe === null || recipe === void 0 ? void 0 : recipe.status) === "unpublish") {
        // console.log(recipe?.status);
        const res = yield recipe_modal_1.Recipe.findByIdAndUpdate(id, { status: "publish" }, { new: true, runValidators: true, upsert: true });
        return res;
    }
    else if ((recipe === null || recipe === void 0 ? void 0 : recipe.status) === "publish") {
        const res = yield recipe_modal_1.Recipe.findByIdAndUpdate(id, { status: "unpublish" }, { new: true, runValidators: true, upsert: true });
        return res;
    }
});
const getRecipeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield recipe_modal_1.Recipe.find().populate("user");
    return res;
});
exports.recipeService = {
    getRecipeFromDB,
    createRecipeIntoDB,
    deleteRecipeIntoDB,
    publishOrUnpublishRecipeIntoDB,
};

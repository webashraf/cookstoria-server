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
exports.recipeService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../user/user.model");
const recipe_modal_1 = require("./recipe.modal");
const createRecipeIntoDB = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, { image });
    const recipeData = Object.assign(Object.assign({}, payload), { imageUrl: image, createdAt: new Date(), updatedAt: new Date() });
    const isUserExist = yield user_model_1.User.isUserExistById(payload.user);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    const res = yield recipe_modal_1.Recipe.create(recipeData);
    return res;
});
const deleteRecipeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield recipe_modal_1.Recipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, upsert: true });
    return res;
});
const publishOrUnpublishRecipeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipe_modal_1.Recipe.findById(id);
    if ((recipe === null || recipe === void 0 ? void 0 : recipe.status) === "unpublish") {
        const res = yield recipe_modal_1.Recipe.findByIdAndUpdate(id, { status: "publish" }, { new: true, runValidators: true, upsert: true });
        return res;
    }
    else if ((recipe === null || recipe === void 0 ? void 0 : recipe.status) === "publish") {
        const res = yield recipe_modal_1.Recipe.findByIdAndUpdate(id, { status: "unpublish" }, { new: true, runValidators: true, upsert: true });
        return res;
    }
});
const getRecipeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterQueryItems = Object.assign({}, query);
    const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
    removableFields.forEach((field) => delete filterQueryItems[field]);
    // search
    let searchTerm = "";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = recipe_modal_1.Recipe.find({
        $or: ["title", "ingredients", "tags"].map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    // Filter query
    const filterQuery = searchQuery.find(filterQueryItems).populate("user");
    // sort
    let sort = "-cookingTime";
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 0;
    let skip = 0;
    if (query === null || query === void 0 ? void 0 : query.limit) {
        limit = Number(query.limit);
    }
    if (query === null || query === void 0 ? void 0 : query.page) {
        page = Number(query === null || query === void 0 ? void 0 : query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    let fields = "-__v";
    if (query === null || query === void 0 ? void 0 : query.fields) {
        fields = query.fields.split(",").join(" ");
    }
    const filedLimitQuery = yield limitQuery.select(fields);
    return filedLimitQuery;
});
const getMyRecipeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterQueryItems = Object.assign({}, query);
    const removableFields = ["searchTerm", "sort", "limit", "page", "fields"];
    removableFields.forEach((field) => delete filterQueryItems[field]);
    // search
    let searchTerm = "";
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = recipe_modal_1.Recipe.find({
        $or: ["title", "ingredients", "tags"].map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    // Filter query
    const filterQuery = searchQuery.find(filterQueryItems).populate("user");
    // sort
    let sort = "-upVote";
    if (query === null || query === void 0 ? void 0 : query.sort) {
        sort = query.sort;
    }
    const sortQuery = filterQuery.sort(sort);
    let page = 1;
    let limit = 0;
    let skip = 0;
    if (query === null || query === void 0 ? void 0 : query.limit) {
        limit = Number(query.limit);
    }
    if (query === null || query === void 0 ? void 0 : query.page) {
        page = Number(query === null || query === void 0 ? void 0 : query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    let fields = "-__v";
    if (query === null || query === void 0 ? void 0 : query.fields) {
        fields = query.fields.split(",").join(" ");
    }
    const filedLimitQuery = yield limitQuery.select(fields);
    return filedLimitQuery;
});
exports.recipeService = {
    getRecipeFromDB,
    createRecipeIntoDB,
    deleteRecipeIntoDB,
    publishOrUnpublishRecipeIntoDB,
    getMyRecipeFromDB,
};

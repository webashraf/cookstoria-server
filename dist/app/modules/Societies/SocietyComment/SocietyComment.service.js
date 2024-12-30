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
exports.societyPostCommentService = void 0;
const SocietyComment_model_1 = require("./SocietyComment.model");
const createSocietyPostCommentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = SocietyComment_model_1.SocietyPostComment.create(payload);
    return result;
});
const getSocietyCommentFormDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filterQueryItems = Object.assign({}, query);
    const removableFields = ["sort", "limit", "page", "fields"];
    removableFields.forEach((field) => delete filterQueryItems[field]);
    const allRecipe = yield SocietyComment_model_1.SocietyPostComment.find(filterQueryItems);
    // Filter query
    const filterQuery = SocietyComment_model_1.SocietyPostComment.find(filterQueryItems).populate({
        path: "userId",
        populate: {
            path: "userId",
        },
    });
    // sort
    let sort = "-updatedAt";
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
    return {
        comments: filedLimitQuery,
        dataLength: allRecipe === null || allRecipe === void 0 ? void 0 : allRecipe.length,
    };
});
exports.societyPostCommentService = {
    createSocietyPostCommentIntoDB,
    getSocietyCommentFormDB,
};

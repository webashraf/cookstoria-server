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
exports.userOpinionsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const recipeComments_service_1 = require("./recipeComments.service");
const createRecipeUserOpinion = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipeComments_service_1.userOpinionsServices.createCommentUpDownVoteAndRatingsIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Recipe status successfully updated!",
        data: result,
    });
}));
const removeUserOpinions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.query.postId;
    const userId = req.query.userId;
    const result = yield recipeComments_service_1.userOpinionsServices.removeUserOpinionsFromRecipeIntoDB({
        postId,
        userId,
    });
    res.status(200).json({
        success: true,
        message: "Recipe status successfully updated!",
        data: result,
    });
}));
const getComments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipeComments_service_1.userOpinionsServices.getCommentsInfo(req.params.postId);
    res.status(200).json({
        success: true,
        message: "Recipe comments successfully retrieved!",
        data: result,
    });
}));
exports.userOpinionsController = {
    createRecipeUserOpinion,
    removeUserOpinions,
    getComments,
};

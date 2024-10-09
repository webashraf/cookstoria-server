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
exports.userOpinionsServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const recipe_modal_1 = require("../Recipe/recipe.modal");
const user_model_1 = require("../user/user.model");
const recipeComments_modal_1 = require("./recipeComments.modal");
const createCommentUpDownVoteAndRatingsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId, upVote, downVote } = payload;
    const isPostExist = yield recipe_modal_1.Recipe.findById(postId);
    if (!isPostExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Post does not exist!!");
    }
    const isUserExist = yield user_model_1.User.isUserExistById(userId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    const commentFilter = { postId, userId };
    const postComment = yield recipeComments_modal_1.RecipeComments.findOne(commentFilter);
    if (postComment) {
        const update = Object.assign({}, payload);
        const currentRecipe = yield recipeComments_modal_1.RecipeComments.find({ postId });
        const totalUpVotes = currentRecipe.reduce((sum, recipe) => sum + (recipe.upVote || 0), 0);
        console.log("currentRecipe", totalUpVotes);
        if (upVote) {
            update.upVote = 1;
            update.downVote = 0;
            yield recipe_modal_1.Recipe.findByIdAndUpdate(postId, { upVote: totalUpVotes }, {
                new: true,
            });
        }
        if (downVote) {
            update.downVote = 1;
            update.upVote = 0;
            yield recipe_modal_1.Recipe.findByIdAndUpdate(postId, { upVote: totalUpVotes }, {
                new: true,
            });
        }
        // Update the existing comment
        const res = yield recipeComments_modal_1.RecipeComments.findOneAndUpdate(commentFilter, update, {
            new: true,
        });
        return res;
    }
    else {
        const res = yield recipeComments_modal_1.RecipeComments.create(payload);
        return res;
    }
});
const removeUserOpinionsFromRecipeIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ postId, userId, }) {
    const isPostExist = yield recipe_modal_1.Recipe.findById(postId);
    if (!isPostExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Post does not exist!!");
    }
    const commentFilter = { postId, "comments.userId": userId };
    const postComment = yield recipeComments_modal_1.RecipeComments.findOne(commentFilter);
    if (!postComment) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Comment does not exist for this user!!");
    }
    else {
        const update = { isDeleted: true };
        update.$set = { "comments.$.description": "" };
        const res = yield recipeComments_modal_1.RecipeComments.findOneAndUpdate(commentFilter, update, {
            new: true,
        });
        return res;
    }
});
const getCommentsInfo = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield recipeComments_modal_1.RecipeComments.find({ postId }).populate("userId");
    return res;
});
exports.userOpinionsServices = {
    createCommentUpDownVoteAndRatingsIntoDB,
    removeUserOpinionsFromRecipeIntoDB,
    getCommentsInfo,
};

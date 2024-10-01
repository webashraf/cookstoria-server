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
    const { postId, comments } = payload;
    const { userId, upVote, downVote, rate, description } = comments;
    // Check if the post exists
    const isPostExist = yield recipe_modal_1.Recipe.findById(postId);
    if (!isPostExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Post does not exist!!");
    }
    // Check if the user exists
    const isUserExist = yield user_model_1.User.isUserExistById(userId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    const commentFilter = { postId, "comments.userId": userId };
    const postComment = yield recipeComments_modal_1.RecipeComments.findOne(commentFilter);
    if (postComment) {
        const update = {};
        // If user upvotes, set upVote to 1 and downVote to 0
        if (upVote) {
            update.$set = { "comments.$.upVote": 1, "comments.$.downVote": 0 };
        }
        // If user downvotes, set downVote to 1 and upVote to 0
        if (downVote) {
            update.$set = { "comments.$.downVote": 1, "comments.$.upVote": 0 };
        }
        // Update the rating if it's passed in the request
        if (rate !== undefined) {
            update.$set = Object.assign(Object.assign({}, update.$set), { "comments.$.rate": rate });
        }
        // Update the description if it's passed in the request
        if (description) {
            update.$set = Object.assign(Object.assign({}, update.$set), { "comments.$.description": description });
        }
        // Update the existing comment
        const res = yield recipeComments_modal_1.RecipeComments.findOneAndUpdate(commentFilter, update, {
            new: true,
        });
        return res;
    }
    else {
        // Create a new comment if it doesn't exist
        const res = yield recipeComments_modal_1.RecipeComments.create(payload);
        return res;
    }
});
const removeUserOpinionsFromRecipeIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ postId, userId, }) {
    console.log({ postId, userId });
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
exports.userOpinionsServices = {
    createCommentUpDownVoteAndRatingsIntoDB,
    removeUserOpinionsFromRecipeIntoDB,
};

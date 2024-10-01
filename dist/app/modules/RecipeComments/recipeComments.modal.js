"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeComments = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    description: {
        type: String,
        default: "",
    },
    rate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5,
    },
    upVote: {
        type: Number,
        default: 0,
        max: 1,
    },
    downVote: {
        type: Number,
        default: 0,
        max: 1,
    },
    createdAt: {
        type: String,
        default: new Date().toString(),
    },
    updatedAt: {
        type: String,
        default: new Date().toString(),
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
});
const userOpinionsSchema = new mongoose_1.Schema({
    postId: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
});
exports.RecipeComments = (0, mongoose_1.model)("RecipeComments", userOpinionsSchema);

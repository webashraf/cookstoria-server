"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeComments = void 0;
const mongoose_1 = require("mongoose");
const userOpinionsSchema = new mongoose_1.Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    comments: {
        type: String,
        default: "",
    },
    rate: {
        type: Number,
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
exports.RecipeComments = (0, mongoose_1.model)("RecipeComments", userOpinionsSchema);

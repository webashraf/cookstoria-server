"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpvoteDownvote = void 0;
const mongoose_1 = require("mongoose");
const UpvoteDownvoteSchema = new mongoose_1.Schema({
    postId: {
        type: String,
        ref: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: String,
        ref: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    voteType: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.UpvoteDownvote = (0, mongoose_1.model)("UpvoteDownvote", UpvoteDownvoteSchema);

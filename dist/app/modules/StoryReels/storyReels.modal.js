"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryReels = void 0;
const mongoose_1 = require("mongoose");
const userOpinionsSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    images: {
        type: [String],
        required: true,
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
exports.StoryReels = (0, mongoose_1.model)("StoryReels", userOpinionsSchema);

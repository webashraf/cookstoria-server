"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyPostComment = void 0;
const mongoose_1 = require("mongoose");
const SocietyCommentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SocietyMember",
        required: true,
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SocietyPost",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.SocietyPostComment = (0, mongoose_1.model)("SocietyPostComment", SocietyCommentSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyPost = void 0;
const mongoose_1 = require("mongoose");
const societyPostSchema = new mongoose_1.Schema({
    societyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Society",
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SocietyMember",
        required: true,
    },
    content: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.SocietyPost = (0, mongoose_1.model)("SocietyPost", societyPostSchema);

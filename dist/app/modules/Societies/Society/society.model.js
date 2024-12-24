"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Society = void 0;
const mongoose_1 = require("mongoose");
const societySchema = new mongoose_1.Schema({
    societyName: {
        type: String,
        required: true,
        unique: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    privacyType: {
        type: String,
        enum: ["Public", "Private"],
        default: "Public",
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.Society = (0, mongoose_1.model)("Society", societySchema);

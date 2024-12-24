"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyMember = void 0;
const mongoose_1 = require("mongoose");
const societyMemberSchema = new mongoose_1.Schema({
    societyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Society",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
        enum: ["Member", "Moderator", "Admin"],
        default: "Member",
    },
    notificationsEnabled: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.SocietyMember = (0, mongoose_1.model)("SocietyMember", societyMemberSchema);

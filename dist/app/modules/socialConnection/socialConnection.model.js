"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const mongoose_1 = require("mongoose");
const followersSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
exports.Follow = (0, mongoose_1.model)("Follow", followersSchema);

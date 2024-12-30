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
Object.defineProperty(exports, "__esModule", { value: true });
exports.upvoteDownvoteService = void 0;
const upvoteDownvote_model_1 = require("./upvoteDownvote.model");
const createOrUpdateUpvoteDownvoteIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, userId, voteType } = payload;
        const result = yield upvoteDownvote_model_1.UpvoteDownvote.findOneAndUpdate({ postId, userId }, { voteType, createdAt: new Date() }, { upsert: true, new: true });
        return result;
    }
    catch (error) {
        console.error("Error creating or updating Upvote Downvote:", error);
        throw error;
    }
});
const getUpvoteDownvoteFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const upvote = yield upvoteDownvote_model_1.UpvoteDownvote.find({ postId, voteType: "upvote" });
    const downvote = yield upvoteDownvote_model_1.UpvoteDownvote.find({ postId, voteType: "downvote" });
    return { upvote, downvote };
});
exports.upvoteDownvoteService = {
    createOrUpdateUpvoteDownvoteIntoDB,
    getUpvoteDownvoteFromDB,
};

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyReelsServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../user/user.model");
const storyReels_modal_1 = require("./storyReels.modal");
const createUpdateStory = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = payload;
    const isUserExist = yield user_model_1.User.isUserExistById(user);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    const res = yield storyReels_modal_1.StoryReels.findOneAndUpdate({ user }, {
        $push: { images: { $each: [image], $position: 0 } },
        $set: { updatedAt: new Date().toISOString() },
    }, { new: true, upsert: true });
    return res;
});
const removeImageFromStory = (storyId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const isStoryExist = yield storyReels_modal_1.StoryReels.findById(storyId);
    if (!isStoryExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    // Remove the image from the images array
    const updatedStory = yield storyReels_modal_1.StoryReels.findByIdAndUpdate(storyId, {
        $pull: { images: imageUrl },
    }, { new: true });
    if (!updatedStory) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Story not found!!");
    }
    // Check if the images array is empty after the update
    if (updatedStory.images.length === 0) {
        // If empty, delete the entire story document
        yield storyReels_modal_1.StoryReels.findByIdAndDelete(storyId);
        return { message: "Story deleted as it contained no more images." };
    }
    return updatedStory;
});
const getStories = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield storyReels_modal_1.StoryReels.find()
        .populate("user")
        .sort("-updatedAt")
        .lean();
    return res;
});
exports.storyReelsServices = {
    createUpdateStory,
    removeImageFromStory,
    getStories,
};

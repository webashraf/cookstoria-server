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
exports.storyReelsContainer = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const storyReels_service_1 = require("./storyReels.service");
const createStoryReels = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield storyReels_service_1.storyReelsServices.createUpdateStory(req.body, image);
    res.status(200).json({
        success: true,
        message: "Story created successfully updated!",
        data: result,
    });
}));
const removeAStroyImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.image);
    const result = yield storyReels_service_1.storyReelsServices.removeImageFromStory(req.params.id, req.body.image);
    res.status(200).json({
        success: true,
        message: "Story image is deleted successfully!",
        data: result,
    });
}));
const getStoryReels = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield storyReels_service_1.storyReelsServices.getStories();
    res.status(200).json({
        success: true,
        message: "Stories successfully retrieved!",
        data: result,
    });
}));
exports.storyReelsContainer = {
    createStoryReels,
    removeAStroyImage,
    getStoryReels,
};

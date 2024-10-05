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
exports.socialConductivityController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const socialConnection_service_1 = require("./socialConnection.service");
const createAFollower = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield socialConnection_service_1.socialConductivityServices.createFollowIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Successfully added new follower!!",
        data: result,
    });
}));
const unfollowAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = yield socialConnection_service_1.socialConductivityServices.unfollowASingleUser((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.followedUserId);
    res.status(200).json({
        success: true,
        message: "Successfully added new follower!!",
        data: result,
    });
}));
const getFollowersById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield socialConnection_service_1.socialConductivityServices.retrievedFollowerByIdIntoDB(userId);
    res.status(200).json({
        success: true,
        message: "Followers retrieved successful!!",
        data: result,
    });
}));
const getFollowers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield socialConnection_service_1.socialConductivityServices.retrievedFollowerByIntoDB();
    res.status(200).json({
        success: true,
        message: "Followers retrieved successful!!",
        data: result,
    });
}));
exports.socialConductivityController = {
    createAFollower,
    unfollowAUser,
    getFollowersById,
    getFollowers,
};

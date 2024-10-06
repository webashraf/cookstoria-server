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
exports.socialConnectivityServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../user/user.model");
const socialConnection_model_1 = require("./socialConnection.model");
const createFollowIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistById(payload.userId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "User not found!!");
    }
    const haveFollower = yield socialConnection_model_1.Follow.findOne({
        userId: payload.userId,
    });
    const myFollow = haveFollower === null || haveFollower === void 0 ? void 0 : haveFollower._id;
    if (!haveFollower) {
        const res = yield socialConnection_model_1.Follow.create(payload);
        return res;
    }
    else {
        const isAlreadyFollowing = yield socialConnection_model_1.Follow.findOne({
            _id: myFollow,
            followers: payload.followers,
        });
        if (isAlreadyFollowing) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, "User has already followed!");
        }
        else {
            const res = yield socialConnection_model_1.Follow.findByIdAndUpdate(myFollow, { $addToSet: { followers: payload.followers } }, { new: true });
            return res;
        }
    }
});
const unfollowASingleUser = (myId, followedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistById(myId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const followRecord = yield socialConnection_model_1.Follow.findOne({ followers: followedUserId });
    if (!followRecord) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Follow record not found!");
    }
    const updatedFollowRecord = yield socialConnection_model_1.Follow.findOneAndUpdate({ userId: myId }, { $pull: { followers: followedUserId } }, { new: true });
    return updatedFollowRecord;
});
const retrievedFollowerByIdIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistById(userId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const res = yield socialConnection_model_1.Follow.findOne({ userId }).populate("followers");
    return res;
});
const retrievedFollowerByIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield socialConnection_model_1.Follow.find().populate("followers");
    return res;
});
exports.socialConnectivityServices = {
    createFollowIntoDB,
    unfollowASingleUser,
    retrievedFollowerByIdIntoDB,
    retrievedFollowerByIntoDB,
};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.societyMemberService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importStar(require("http-status"));
const appError_1 = __importDefault(require("../../../error/appError"));
const user_model_1 = require("../../user/user.model");
const society_model_1 = require("../Society/society.model");
const societyMember_model_1 = require("./societyMember.model");
const createSocietyMemberIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistById(payload.userId);
    const isSocietyExist = yield society_model_1.Society.findById(payload.societyId);
    const isUserExistInSociety = yield societyMember_model_1.SocietyMember.findOne({
        userId: payload.userId,
        societyId: payload.societyId,
    });
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!!");
    }
    if (!isSocietyExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Society does not exist!!");
    }
    if (isUserExistInSociety) {
        throw new Error("User all ready exist in this society!");
    }
    const result = yield societyMember_model_1.SocietyMember.create(payload);
    return result;
});
// * get all users by a original userId
// ! Keep it for quantum
const getMemberByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield societyMember_model_1.SocietyMember.find({ userId }).populate("societyId");
    return result;
});
// * get current login society single user
const getCurrentSocietyMemberByUserIdFromDB = (queries) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, societyId } = queries;
    const isUserExist = yield user_model_1.User.isUserExistById(userId);
    const isSocietyExist = yield society_model_1.Society.findById(societyId);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.NOT_FOUND, "user not found!");
    }
    if (!isSocietyExist) {
        throw new appError_1.default(http_status_1.NOT_FOUND, "Society not found!");
    }
    const result = yield societyMember_model_1.SocietyMember.findOne({
        userId,
        societyId,
    }).populate("userId");
    return result;
});
// * Get all members for a single society
const getSingleSocietyMembersBySocietyIdFromDB = (societyId) => __awaiter(void 0, void 0, void 0, function* () { return yield societyMember_model_1.SocietyMember.find({ societyId }).populate("userId"); });
exports.societyMemberService = {
    createSocietyMemberIntoDB,
    getMemberByIdFromDB,
    getSingleSocietyMembersBySocietyIdFromDB,
    getCurrentSocietyMemberByUserIdFromDB,
};

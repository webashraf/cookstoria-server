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
exports.societyMemberService = void 0;
const http_status_1 = __importDefault(require("http-status"));
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
    console.log("isUserExistInSociety", isUserExistInSociety);
    const result = yield societyMember_model_1.SocietyMember.create(payload);
    return result;
});
const getMemberByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield societyMember_model_1.SocietyMember.find({ userId }).populate("societyId");
    return result;
});
const getSingleSocietyMemberBySocietyIdFromDB = (societyId) => __awaiter(void 0, void 0, void 0, function* () { return yield societyMember_model_1.SocietyMember.find({ societyId }).populate("userId"); });
exports.societyMemberService = {
    createSocietyMemberIntoDB,
    getMemberByIdFromDB,
    getSingleSocietyMemberBySocietyIdFromDB,
};

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
exports.societyServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../../error/appError"));
const user_model_1 = require("../../user/user.model");
const societyMember_model_1 = require("../SocietyMember/societyMember.model");
const society_model_1 = require("./society.model");
const createSocietyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistById(payload === null || payload === void 0 ? void 0 : payload.admin);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!");
    }
    const result = yield society_model_1.Society.create(payload);
    return result;
});
const getSocietyForConnectFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const societyMemberConnectedness = yield societyMember_model_1.SocietyMember.find({
            userId,
        }).session(session);
        const societyIds = societyMemberConnectedness.map((member) => member.societyId);
        const unmatchedSocieties = yield society_model_1.Society.find({
            _id: { $nin: societyIds },
        }).session(session);
        yield session.commitTransaction();
        session.endSession();
        return unmatchedSocieties;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        console.error("Error during transaction:", error);
        throw error;
    }
});
const getSocietyFromDB = () => __awaiter(void 0, void 0, void 0, function* () { return yield society_model_1.Society.find(); });
const getSingleSocietyFromDB = (societyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield society_model_1.Society.findById(societyId);
});
exports.societyServices = {
    createSocietyIntoDB,
    getSocietyForConnectFromDB,
    getSingleSocietyFromDB,
    getSocietyFromDB,
};

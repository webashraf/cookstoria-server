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
exports.societyPostService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../../error/appError"));
const society_model_1 = require("../Society/society.model");
const societyMember_model_1 = require("../SocietyMember/societyMember.model");
const societyPost_model_1 = require("./societyPost.model");
const createSocietyPostIntoDB = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield societyMember_model_1.SocietyMember.findById(payload === null || payload === void 0 ? void 0 : payload.userId);
    const isSocietyExist = yield society_model_1.Society.findById(payload === null || payload === void 0 ? void 0 : payload.societyId);
    const isUserExistInCurrentSociety = yield societyMember_model_1.SocietyMember.find({
        societyId: payload === null || payload === void 0 ? void 0 : payload.societyId,
        userId: payload === null || payload === void 0 ? void 0 : payload.userId,
    });
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User does not exist!");
    }
    if (!isSocietyExist) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Society does not exist!");
    }
    if (!isUserExistInCurrentSociety) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User does not exist this society!");
    }
    const result = yield societyPost_model_1.SocietyPost.create(Object.assign(Object.assign({}, payload), { imageUrl: image }));
    return result;
});
const getSocietyPostFromDB = (societyId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield societyPost_model_1.SocietyPost.find({ societyId }).populate({
        path: "userId",
        populate: {
            path: "userId",
        },
    });
    return result;
});
exports.societyPostService = {
    createSocietyPostIntoDB,
    getSocietyPostFromDB,
};

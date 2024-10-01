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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("./user.model");
const createNewUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistByEmail(payload.email);
    if (isUserExist) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, "User already exist !");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const updateUserIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExistByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!isUserExist) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User not found!");
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { $set: payload }, { new: true, runValidators: true });
    // if (!result) {
    //   throw new Error("Failed to update user!");
    // }
    return result;
});
exports.userServices = {
    createNewUserIntoDB,
    updateUserIntoDb,
};

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
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload.email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User is deleted!");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User is blocked!!");
    }
    if (!(yield (0, auth_utils_1.isPasswordMatched)(payload.password, user.password))) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Don't match password!!");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
        id: user._id,
        photo: user.profilePicture,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const changePasswordIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "This user is deleted !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "This user is blocked ! !");
    }
    if (!(yield (0, auth_utils_1.isPasswordMatched)(payload.oldPassword, user.password))) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Don't match password!!");
    }
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt));
    yield user_model_1.User.findOneAndUpdate({
        email: userData.email,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const generateNewPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "This user is deleted !");
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "This user is blocked ! !");
    }
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt));
    yield user_model_1.User.findOneAndUpdate({
        email: payload.email,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshTokenToAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const user = yield user_model_1.User.isUserExistByEmail(email);
    if (!user) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "User not found!");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
        id: user._id,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
    return {
        accessToken,
    };
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.User.find();
    return res;
});
exports.authServices = {
    getAllUsersFromDB,
    loginUser,
    changePasswordIntoDB,
    generateNewPassword: generateNewPassword,
    refreshTokenToAccessToken,
};

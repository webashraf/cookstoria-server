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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(payload.id);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //create token and sent to the  client
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ userData, payload });
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(userData.userId);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.UserModel.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bycript_salt_raund));
    yield user_model_1.UserModel.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(userId);
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    if (user.passwordChangedAt &&
        user_model_1.UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
};

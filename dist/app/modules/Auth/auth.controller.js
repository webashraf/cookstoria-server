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
exports.authControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            refreshToken,
        },
    });
}));
const userPasswordChange = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userData = jwt.verify(
    //   req.headers.authorization as string,
    //   config.jwt_access_secret as string
    // );
    const result = yield auth_service_1.authServices.changePasswordIntoDB(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Password is updated successfully!",
        data: result,
    });
}));
const forgatPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.generateNewPassword(req.body);
    res.status(200).json({
        success: true,
        message: "Password is updated successfully!",
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.cookies);
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.authServices.refreshTokenToAccessToken(refreshToken);
    res.status(200).json({
        success: true,
        message: "Access token retrieved successfully!",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.getAllUsersFromDB();
    res.status(200).json({
        success: true,
        message: "User retrieved successfully!",
        data: result,
    });
}));
const getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.getAllAdminFromDB();
    res.status(200).json({
        success: true,
        message: "User retrieved successfully!",
        data: result,
    });
}));
exports.authControllers = {
    getAllUsers,
    getAllAdmin,
    loginUser,
    userPasswordChange,
    forgatPassword,
    refreshToken,
};

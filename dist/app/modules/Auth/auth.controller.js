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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.node_env === "production",
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
        },
    });
}));
const userPasswordChange = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = jsonwebtoken_1.default.verify(req.headers.authorization, config_1.default.jwt_access_secret);
    const result = yield auth_service_1.authServices.changePasswordIntoDB(userData, req.body);
    res.status(200).json({
        success: true,
        message: "Password is updated successfully!",
        data: result,
    });
}));
const forgatPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userData = jwt.verify(
    //   req.headers.authorization as string,
    //   config.jwt_access_secret as string
    // );
    const result = yield auth_service_1.authServices.generateNewPassword(req.body);
    res.status(200).json({
        success: true,
        message: "Password is updated successfully!",
        data: result,
    });
}));
exports.authControllers = {
    loginUser,
    userPasswordChange,
    forgatPassword,
};

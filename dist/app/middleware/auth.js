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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const appError_1 = __importDefault(require("../error/appError"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized for this user!!!");
        }
        const { email, role } = decoded;
        const user = yield user_model_1.User.isUserExistByEmail(email);
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
        console.log("Auth guard", requiredRoles, !requiredRoles.includes(role));
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized  hi!");
        }
        next();
    }));
};
exports.default = auth;

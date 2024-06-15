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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const notFoundError_1 = __importDefault(require("../error/notFoundError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requireRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const solidToken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        if ((token === null || token === void 0 ? void 0 : token.split(" ")[0]) !== "Bearer") {
            throw new notFoundError_1.default(401, "You have no access to this route");
        }
        if (!token) {
            throw new notFoundError_1.default(401, "You have no access to this route");
        }
        jsonwebtoken_1.default.verify(solidToken, config_1.default.jwt_access_secret_key, function (err, decoded) {
            if (err) {
                throw new notFoundError_1.default(401, "You have no access to this route");
            }
            const { role } = decoded;
            if (requireRoles && !requireRoles.includes(role)) {
                throw new notFoundError_1.default(401, "You have no access to this route");
            }
            next();
        });
    }));
};
exports.default = auth;

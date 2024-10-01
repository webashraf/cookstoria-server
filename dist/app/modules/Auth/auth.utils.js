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
exports.isPasswordMatched = exports.createToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, { expiresIn });
};
exports.createToken = createToken;
const isPasswordMatched = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const comparePass = yield bcrypt_1.default.compare(password, hashPassword);
    return comparePass;
});
exports.isPasswordMatched = isPasswordMatched;

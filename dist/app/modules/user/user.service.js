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
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const createNewUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt));
    const result = yield user_model_1.User.create(payload, {});
    const newSavedUser = yield user_model_1.User.findById({ _id: result._id });
    result.password = "";
    return newSavedUser;
});
exports.userServices = {
    createNewUserIntoDB,
};

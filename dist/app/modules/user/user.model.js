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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active",
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt));
        this.needsPasswordChange = true;
        this.isDeleted = false;
        this.status = "active";
        next();
    });
});
userSchema.statics.isUserExistByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({
            email,
            isDeleted: false,
            status: "active",
        }).select("+password");
    });
};
userSchema.statics.isUserExistById = function (_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({
            _id,
            isDeleted: false,
            status: "active",
        }).select("+password");
    });
};
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);

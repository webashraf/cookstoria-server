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
exports.societyMemberController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const societyMember_service_1 = require("./societyMember.service");
const createSocietyMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield societyMember_service_1.societyMemberService.createSocietyMemberIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Society member created successfully!!",
        data: result,
    });
}));
const getSocietyMemberById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield societyMember_service_1.societyMemberService.getMemberByIdFromDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Society member retrieved successfully",
        data: result,
    });
}));
const getSingleSocietyMemberById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield societyMember_service_1.societyMemberService.getSingleSocietyMemberBySocietyIdFromDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Society member retrieved successfully",
        data: result,
    });
}));
exports.societyMemberController = {
    createSocietyMember,
    getSocietyMemberById,
    getSingleSocietyMemberById,
};

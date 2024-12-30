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
exports.societyPostCommentController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const SocietyComment_service_1 = require("./SocietyComment.service");
const createSocietyPostComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SocietyComment_service_1.societyPostCommentService.createSocietyPostCommentIntoDB(req.body);
    res.status(200).send({
        success: true,
        message: "Society post comment created successfully!!",
        data: result,
    });
}));
const getSocietyComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SocietyComment_service_1.societyPostCommentService.getSocietyCommentFormDB(req.query);
    res.status(200).send({
        success: true,
        message: "Society post comment retrieve successfully",
        data: result,
    });
}));
exports.societyPostCommentController = {
    createSocietyPostComment,
    getSocietyComment,
};

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
exports.societyController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const society_service_1 = require("./society.service");
const createSociety = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield society_service_1.societyServices.createSocietyIntoDB(req.body, image);
    res.status(200).json({
        success: true,
        message: "Society created successfully!!",
        data: result,
    });
}));
const getSocietyForConnect = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield society_service_1.societyServices.getSocietyForConnectFromDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Society retrieved successfully!",
        data: result,
    });
}));
const getSingleSociety = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield society_service_1.societyServices.getSingleSocietyFromDB(req.params.id);
    res.status(200).json({
        success: true,
        message: "Society retrieved successfully",
        data: result,
    });
}));
const getSociety = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield society_service_1.societyServices.getSocietyFromDB();
    res.status(200).json({
        success: true,
        message: "Society retrieved successfully!",
        data: result,
    });
}));
const updateSociety = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield society_service_1.societyServices.updateSocietyIntoDB(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Society updated successfully",
        data: result,
    });
}));
exports.societyController = {
    createSociety,
    getSocietyForConnect,
    getSingleSociety,
    getSociety,
    updateSociety
};

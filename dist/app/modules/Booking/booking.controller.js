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
exports.BookingController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const createABooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret_key);
    const email = decoded.email;
    const result = yield booking_service_1.BookingService.createABookingIntoDB(req.body, email);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking created successfully",
        data: result,
    });
}));
const retriveBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.retriveABookingsIntoDB(req.params.id, false);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const retriveBookingsForUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.retriveABookingsIntoDB(req.params.id, true);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const deleteBookingForUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.deleteABookingFromDB(req.params.id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Booking cancelled successfully",
        data: result,
    });
}));
exports.BookingController = {
    createABooking,
    retriveBookings,
    retriveBookingsForUser,
    deleteBookingForUser,
};

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const payment_utils_1 = require("../Payment/payment.utils");
const user_model_1 = require("../User/user.model");
const booking_model_1 = require("./booking.model");
const booking_utils_1 = require("./booking.utils");
const createABookingIntoDB = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, email);
    const currentDate = new Date(payload.date);
    const toDay = new Date();
    const inputYear = payload.date.split("-");
    // const [day, month, year] = date.split("-");
    // let formattedDate = `${year}-${month}-${day}`;
    // console.log(payload.facility);
    const findBookByCurrentDateAndFacility = yield booking_model_1.Booking.find({
        date: payload.date,
        facility: payload.facility,
    });
    // console.log("FF", findBookByCurrentDateAndFacility);
    if (inputYear[0].length !== 4 ||
        !(Number(inputYear[1]) <= 12) ||
        Number(inputYear[1]) === 0 ||
        Number(inputYear[2]) === 0 ||
        !(Number(inputYear[2]) <= 31)) {
        throw new Error("Invalid date format! You must provide a date in YYYY-MM-DD format!!");
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new Error("Could not find user!!");
    }
    const userId = user._id;
    payload.user = userId;
    // const currentBookingHistory = await Booking.find({
    //   date: payload.date,
    // }).select("startTime endTime date");
    const newTime = {
        startTime: payload.startTime,
        endTime: payload.endTime,
    };
    const isNotTimeFree = booking_utils_1.bookingUtils.doesOverlap(findBookByCurrentDateAndFacility, newTime);
    if (isNotTimeFree) {
        throw new Error("Time is already overlapped!!");
    }
    if (currentDate < toDay) {
        throw new Error("Date is out of range");
    }
    function generateUniqueTransactionId() {
        const randomString = Math.random().toString(36).substr(2, 9);
        const transactionId = `TXN-${Date.now()}-${randomString}`;
        return transactionId;
    }
    const transactionId = generateUniqueTransactionId();
    const paymentInfo = {
        transactionId,
        payment: payload.payableAmount,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
    };
    console.log(user);
    console.log(transactionId);
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentInfo);
    console.log("paymentSession", paymentSession);
    // return paymentSession;
    if (paymentSession === null || paymentSession === void 0 ? void 0 : paymentSession.result) {
        const result = yield booking_model_1.Booking.create(payload);
        return { paymentSession, result };
    }
});
// --------------------------------------------------------------------------------------------------------------------
const retriveABookingsIntoDB = (email, isUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (isUser) {
        // console.log(id);
        const user = yield user_model_1.User.findOne({ email: email });
        console.log(user === null || user === void 0 ? void 0 : user._id);
        const result = yield booking_model_1.Booking.find({
            user: user === null || user === void 0 ? void 0 : user._id,
            isBooked: "confirmed",
        })
            .populate("user")
            .populate("facility");
        if (result.length < 1) {
            throw new Error("Could not find data");
        }
        return result;
    }
    const result = yield booking_model_1.Booking.find({ isBooked: "confirmed" })
        .populate("user")
        .populate("facility");
    if (result.length < 1) {
        throw new Error("Could not find data");
    }
    // const result = await Booking.find().populate("facility");
    return result;
});
const deleteABookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: "canceled" }, { runValidators: true, new: true }).populate("facility");
    return result;
});
exports.BookingService = {
    createABookingIntoDB,
    retriveABookingsIntoDB,
    deleteABookingFromDB,
};

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
exports.checkAvailabilityService = void 0;
const booking_model_1 = require("../Booking/booking.model");
const availability_utils_1 = require("./availability.utils");
const checkAvailabilityFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (date = "0") {
    let formattedNewDate = date;
    const inputYear = date.split("-");
    if (date.length === 1) {
        formattedNewDate = new Date().toISOString().slice(0, 10);
        console.log(formattedNewDate);
    }
    else if (inputYear[0].length !== 4 ||
        !(Number(inputYear[1]) <= 12) ||
        Number(inputYear[1]) === 0 ||
        Number(inputYear[2]) === 0 ||
        !(Number(inputYear[2]) <= 31)) {
        throw new Error("Invalid date format! You must provide a date in YYYY-MM-DD format!!");
    }
    console.log({ formattedNewDate });
    const currentDate = new Date(formattedNewDate);
    const toDay = new Date();
    if (currentDate < toDay && !(date.length === 1)) {
        throw new Error("Date is already pas!!");
    }
    const currentBookingHistory = yield booking_model_1.Booking.find({
        date: formattedNewDate,
    }).select("startTime endTime");
    console.log({ currentBookingHistory }, { formattedNewDate });
    if (currentBookingHistory.length < 1) {
        return availability_utils_1.availiabilityUtils.generateTwoHourTimeSlots();
    }
    const result = availability_utils_1.availiabilityUtils.generateAvailableSlots(currentBookingHistory);
    return result;
});
exports.checkAvailabilityService = {
    checkAvailabilityFromDB,
};

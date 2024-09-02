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
const checkAvailabilityFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (date = "0", facility = "") {
    let formattedNewDate = date;
    const inputYear = date.split("-");
    if (date.length === 1) {
        formattedNewDate = new Date().toISOString().slice(0, 10);
    }
    else if (inputYear[0].length !== 4 ||
        !(Number(inputYear[1]) <= 12) ||
        Number(inputYear[1]) === 0 ||
        Number(inputYear[2]) === 0 ||
        !(Number(inputYear[2]) <= 31)) {
        throw new Error("Invalid date format! You must provide a date in YYYY-MM-DD format!!");
    }
    const currentDate = new Date(formattedNewDate);
    const toDay = new Date();
    // ! old condition
    // if (currentDate < toDay || !(date.length === 1)) {
    //   throw new Error("Date is already pas!!");
    // }
    if (currentDate < toDay) {
        throw new Error("Date is already pas!!");
    }
    const filter = {
        date: formattedNewDate,
    };
    if (facility) {
        filter["facility"] = facility;
    }
    // if (filter) {
    //   const facilityResult = await Booking.find({
    //     date: "2028-06-23",
    //     facility: "66ccc0a163c1483f70b8615d",
    //   });
    //   console.log("facilityResult: ", facilityResult);
    // }
    const currentBookingHistory = yield booking_model_1.Booking.find(filter).select("startTime endTime");
    // if (currentBookingHistory.length === 0) {
    //   throw new Error("Not available slot based on this facility!!");
    // }
    if (currentBookingHistory.length < 1) {
        return availability_utils_1.availiabilityUtils.generateTwoHourTimeSlots();
    }
    const result = availability_utils_1.availiabilityUtils.generateAvailableSlots(currentBookingHistory);
    if (result.length === 0) {
        throw new Error("Not available slot. Try another date!!");
    }
    return result;
});
exports.checkAvailabilityService = {
    checkAvailabilityFromDB,
};

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
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const facility_model_1 = require("../Facility/facility.model");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Facility",
    },
    payableAmount: {
        type: Number,
        default: 0,
    },
    isBooked: {
        type: String,
        enum: ["confirmed", "unconfirmed", "canceled"],
        default: "confirmed",
    },
});
bookingSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { startTime, endTime } = this;
        const time1 = new Date(`2000-01-01T${startTime}:00`);
        const time2 = new Date(`2000-01-01T${endTime}:00`);
        const differenceMilliseconds = Number(time1) - Number(time2);
        const differenceInHour = (Math.abs(differenceMilliseconds) / 3600000).toFixed(2);
        const facilityForBooking = yield facility_model_1.Facility.findById(this.facility);
        const payableAmount = Number(differenceInHour) * Number(facilityForBooking === null || facilityForBooking === void 0 ? void 0 : facilityForBooking.pricePerHour);
        this.payableAmount = payableAmount;
        if (!facilityForBooking) {
            throw new Error("Facility not found!!");
        }
        next();
    });
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);

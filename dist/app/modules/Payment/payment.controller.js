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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const successPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; color: #333;">
    <div style="background-color: #fff; padding: 40px; border-radius: 8px; text-align: center; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #101010; margin: 0 0 20px 0;">GameGrounds</h1>
        <h2 style="color: #101010; margin: 0 0 20px 0;">Booking Payment Successful</h2>
        <h3 style="margin: 0 0 10px 0;">Thank you for your booking!</h3>
        <p style="margin: 0 0 20px 0;">Your payment has been successfully processed.</p>
        <p style="margin: 0 0 20px 0;">You will receive a confirmation email with your booking details shortly.</p>
     
    </div>
</div>
`);
}));
const failedPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; color: #333;">
    <div style="background-color: #fff; padding: 40px; border-radius: 8px; text-align: center; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #101010; margin: 0 0 20px 0;">GameGrounds</h1>
        <h2 style="color: #d32f2f; margin: 0 0 20px 0;">Booking Payment Failed</h2>
        <h3 style="margin: 0 0 10px 0;">We're sorry, but your payment was not successful.</h3>
        <p style="margin: 0 0 20px 0;">Please check your payment details and try again.</p>
        <p style="margin: 0 0 20px 0;">If you continue to experience issues, please contact our support team.</p>
  
    </div>
</div>

`);
}));
exports.paymentController = {
    successPayment,
    failedPayment,
};

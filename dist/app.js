"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const glovalErrorHandaler_1 = __importDefault(require("./app/middleware/glovalErrorHandaler"));
const auth_routes_1 = require("./app/modules/Auth/auth.routes");
const availability_routes_1 = require("./app/modules/Availability/availability.routes");
const booking_routes_1 = require("./app/modules/Booking/booking.routes");
const facility_routes_1 = require("./app/modules/Facility/facility.routes");
const payment_route_1 = require("./app/modules/Payment/payment.route");
const user_routes_1 = require("./app/modules/User/user.routes");
const app = (0, express_1.default)();
// Define allowed origins
// const allowedOrigins = [
//   "https://game-grounds-frontend.vercel.app",
//   "https://game-grouhnds-sports-facility-booking-backend.vercel.app",
//   // "https://game-grouhnds-sports-facility-booking-backend.vercel.app/api/payment",
//   "http://localhost:5173",
//   "http://localhost:3000",
// ];
// // Custom CORS configuration
// const corsOptions: cors.CorsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, success: boolean) => void
//   ) => {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"), false);
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
const corsOptions = {
    credentials: true,
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://game-grounds-frontend.vercel.app",
        "https://game-grouhnds-sports-facility-booking-backend.vercel.app",
    ], // Whitelist the domains you want to allow
};
app.use((0, cors_1.default)(corsOptions)); // Use the cors middleware with your options
app.use(express_1.default.json());
// Define routes
app.use("/api/auth/", user_routes_1.userRoute);
app.use("/api/facility/", facility_routes_1.facilityRoute);
app.use("/api/bookings", booking_routes_1.bookingRoute);
app.use("/api/auth/", auth_routes_1.AuthRoute);
app.use("/api/check-availability", availability_routes_1.availabilityRoute);
app.use("/api/payment/", payment_route_1.paymentRoute);
app.get("/", (req, res) => {
    res.send("Hello! Products");
});
// Global error handler
app.use(glovalErrorHandaler_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
exports.default = app;

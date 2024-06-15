"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const glovalErrorHandaler_1 = __importDefault(require("./app/middleware/glovalErrorHandaler"));
const auth_routes_1 = require("./app/modules/Auth/auth.routes");
const availability_routes_1 = require("./app/modules/Availability/availability.routes");
const booking_routes_1 = require("./app/modules/Booking/booking.routes");
const facility_routes_1 = require("./app/modules/Facility/facility.routes");
const user_routes_1 = require("./app/modules/User/user.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth/", user_routes_1.userRoute);
app.use("/api/facility/", facility_routes_1.facilityRoute);
app.use("/api/bookings", booking_routes_1.bookingRoute);
app.use("/api/auth/", auth_routes_1.AuthRoute);
app.use("/api/check-availability", availability_routes_1.availabilityRoute);
app.get("/", (req, res) => {
    res.send("Hello! roducts");
});
app.use((req, res) => {
    res.status(500).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
app.use(glovalErrorHandaler_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const glovalErrorHandalerMiddleware_1 = __importDefault(require("./app/middleware/glovalErrorHandalerMiddleware"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
const corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5173"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routes
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("<h2 style='font-family: Arial, sans-serif; color: #4a4a4a; text-align: center; padding: 20px; background-color: #f0f0f0; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>Hello! CookstoriaCulinary</h2>");
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found This Route",
    });
});
app.use(glovalErrorHandalerMiddleware_1.default);
exports.default = app;

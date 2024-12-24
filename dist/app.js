"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const glovalErrorHandalerMiddleware_1 = __importDefault(require("./app/middleware/glovalErrorHandalerMiddleware"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
const corsOptions = {
    credentials: true,
    origin: [
        // "https://cook-storia-culinary-frontend.vercel.app",
        "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
// routes
app.use("/api/v1", routes_1.default);
app.get("/api/v1", (req, res) => {
    res.send("this is /api/v1");
});
app.get("/", (req, res) => {
    res.send(`<section
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
      "
    >
      <h2
        style="
          color: #333;
          text-align: center;
          padding: 15px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        "
      >
        Welcome to Cookstoria Culinary Server
      </h2>
    </section>`);
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

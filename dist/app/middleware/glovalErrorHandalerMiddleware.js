"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const appError_1 = __importDefault(require("../error/appError"));
const handleCastError_1 = __importDefault(require("../error/handleCastError"));
const handleMongoseValidationError_1 = __importDefault(require("../error/handleMongoseValidationError"));
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const globalErrorHandlerMiddleware = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = err.statusCode || 500;
    let message = "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong!",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        statusCode = (0, handleMongoseValidationError_1.default)(err).statusCode;
        message = (0, handleMongoseValidationError_1.default)(err).message;
        errorSources = (0, handleMongoseValidationError_1.default)(err).errorSources;
    }
    else if (err.name === "CastError") {
        statusCode = (0, handleCastError_1.default)(err).statusCode;
        message = (0, handleCastError_1.default)(err).message;
        errorSources = (0, handleCastError_1.default)(err).errorSources;
    }
    else if (err instanceof appError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "socialConnectivity",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource: errorSources,
        // err: err.name,
        stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandlerMiddleware;

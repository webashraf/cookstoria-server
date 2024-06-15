"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleCastError_1 = __importDefault(require("../error/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../error/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const notFoundError_1 = __importDefault(require("../error/notFoundError"));
const glovalErrorHandaler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!!!";
    let errorMessages = [
        {
            path: "",
            message,
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 1100) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    if (err instanceof notFoundError_1.default === true && err.statusCode === 401) {
        return res.status(statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    else if (err instanceof notFoundError_1.default === true) {
        return res.status(statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
            data: [],
        });
    }
    else {
        return res.status(statusCode).json({
            success: false,
            message,
            errorMessages,
            stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
        });
    }
};
exports.default = glovalErrorHandaler;

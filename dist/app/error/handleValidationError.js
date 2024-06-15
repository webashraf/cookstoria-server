"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const statusCode = 400;
    const errorMessages = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        statusCode,
        message: "Validation error!!",
        errorMessages,
    };
};
exports.default = handleValidationError;

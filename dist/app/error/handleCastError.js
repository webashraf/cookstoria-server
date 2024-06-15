"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const errorMessages = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode,
        message: "Invalid ID!!",
        errorMessages,
    };
};
exports.default = handleCastError;

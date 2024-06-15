"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const statusCode = 400;
    const match = err.message.match(/"([^"]*)"/);
    const errorMessages = [
        {
            path: "",
            message: `${match && match[1]} is already exist`,
        },
    ];
    return {
        statusCode,
        message: "Validation error!!",
        errorMessages,
    };
};
exports.default = handleDuplicateError;

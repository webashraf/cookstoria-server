"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const statusCode = 400;
    const errorMessages = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message: "Validation error!!",
        errorMessages,
    };
};
exports.default = handleZodError;

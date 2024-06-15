"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fnc) => {
    return (req, res, next) => {
        Promise.resolve(fnc(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;

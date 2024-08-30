"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidatior.userValidationSchema), user_controller_1.UserController.signupUser);
router.get("/:email", user_controller_1.UserController.retrieveSingleUser);
exports.userRoute = router;

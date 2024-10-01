"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.userValidations.userCreateValidationSchema), user_controller_1.userController.signupUser);
router.post("/update-user/:id", (0, validateRequest_1.default)(user_validation_1.userValidations.userUpdateValidationSchema), user_controller_1.userController.updateUserInfo);
exports.userRoutes = router;

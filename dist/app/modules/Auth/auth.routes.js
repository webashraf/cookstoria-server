"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/login-user", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.authControllers.loginUser);
router.post("/change-password", (0, auth_1.default)("admin", "user"), auth_controller_1.authControllers.userPasswordChange);
router.post("/generate-new-password", auth_controller_1.authControllers.forgatPassword);
router.post("/refresh-token", auth_controller_1.authControllers.refreshToken);
exports.authRoutes = router;

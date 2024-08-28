"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_const_1 = require("../User/user.const");
const facility_controller_1 = require("./facility.controller");
const facility_validation_1 = require("./facility.validation");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_validation_1.FacilityValidators.facilityValidationSchema), facility_controller_1.FacilityController.createFacility);
router.put("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_validation_1.FacilityValidators.updateFacilityValidationSchema), facility_controller_1.FacilityController.updateFacility);
router.delete("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.admin), facility_controller_1.FacilityController.deleteFacility);
router.get("/", facility_controller_1.FacilityController.retrieveFacility);
exports.facilityRoute = router;

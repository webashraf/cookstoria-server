"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityRoute = void 0;
const express_1 = require("express");
const availability_controller_1 = require("./availability.controller");
const router = (0, express_1.Router)();
router.get("/", availability_controller_1.CheckAvailabilityController.checkAvailability);
exports.availabilityRoute = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realTimeDataTransferRoute = void 0;
const express_1 = require("express");
const realTimeDataTransfer_controller_1 = require("./realTimeDataTransfer.controller");
const router = (0, express_1.Router)();
router.get("/discus", realTimeDataTransfer_controller_1.realTimeDataTransferController.liveChatOptions);
exports.realTimeDataTransferRoute = router;

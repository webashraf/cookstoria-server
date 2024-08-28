"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const notFoundError_1 = __importDefault(require("../../error/notFoundError"));
const facility_model_1 = require("./facility.model");
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(payload);
    return result;
});
const updateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteFacilityIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
const retrieveFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.find({ isDeleted: false });
    if (result.length < 1) {
        throw new notFoundError_1.default(404, "No Data Found");
    }
    return result;
});
const retrieveSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findById(id);
    return result;
});
exports.FacilityService = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityIntoDB,
    retrieveFacilityFromDB,
    retrieveSingleFacilityFromDB,
};

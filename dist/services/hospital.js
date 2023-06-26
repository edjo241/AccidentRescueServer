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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHospitalService = void 0;
const createHospitalService = (hospitalRepository) => {
    return {
        accidentHospital: (hid) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield hospitalRepository.accidentHospital(hid);
            return result;
        }),
        hospitalAccidentDetails: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield hospitalRepository.hospitalAccidentDetails(accId);
            return result;
        }),
        addPatient: (firstName, lastName, sex, age, phone, address, roadAccident, accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield hospitalRepository.addPatient(firstName, lastName, sex, age, phone, address, roadAccident, accId);
            return result;
        }),
        reportPolice: (policeId, hospitalId, accidentId, description) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield hospitalRepository.reportPolice(policeId, hospitalId, accidentId, description);
            return result;
        }),
        hospitalComplete: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield hospitalRepository.hospitalComplete(accId);
            return result;
        }),
        hospitalRead: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield hospitalRepository.hospitalRead(accId);
            return result;
        })
    };
};
exports.createHospitalService = createHospitalService;

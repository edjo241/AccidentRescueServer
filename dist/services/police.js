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
exports.createPoliceService = void 0;
const createPoliceService = (policeRepository) => {
    return {
        getPolice: () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.getPolice();
            return result;
        }),
        accidentPolice: (hid) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.accidentPolice(hid);
            return result;
        }),
        policeAccidentDetails: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.policeAccidentDetails(accId);
            return result;
        }),
        patientDetails: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.patientDetails(accId);
            return result;
        }),
        addFaultDriver: (firstName, lastName, sex, age, phone, dlNo, vhNo, accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.addFaultDriver(firstName, lastName, sex, age, phone, dlNo, vhNo, accId);
            return result;
        }),
        policeComplete: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.policeComplete(accId);
            return result;
        }),
        policeRead: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield policeRepository.policeRead(accId);
            return result;
        })
    };
};
exports.createPoliceService = createPoliceService;

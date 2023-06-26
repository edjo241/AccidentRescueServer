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
exports.policeRead = exports.policeComplete = exports.addFaultDriver = exports.patientDetails = exports.policeAccidentDetails = exports.accidentPolice = exports.getPolice = void 0;
const getPolice = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield policeService.getPolice();
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.getPolice = getPolice;
const accidentPolice = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hid = req.body.hid;
    const status = yield policeService.accidentPolice(hid);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.accidentPolice = accidentPolice;
const policeAccidentDetails = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accId = req.body.accId;
    const status = yield policeService.policeAccidentDetails(accId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.policeAccidentDetails = policeAccidentDetails;
const patientDetails = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accId = req.body.accId;
    const status = yield policeService.patientDetails(accId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.patientDetails = patientDetails;
const addFaultDriver = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let sex = req.body.sex;
    let age = req.body.age;
    let phone = req.body.phone;
    let dlNo = req.body.dlNo;
    let vhNo = req.body.vhNo;
    let accId = req.body.accId;
    console.log("accid value", accId);
    const status = yield policeService.addFaultDriver(firstName, lastName, sex, age, phone, dlNo, vhNo, accId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.addFaultDriver = addFaultDriver;
const policeComplete = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accidentId = req.body.accident_id;
    const status = yield policeService.policeComplete(accidentId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.policeComplete = policeComplete;
const policeRead = (policeService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accidentId = req.body.accident_id;
    const status = yield policeService.policeRead(accidentId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.policeRead = policeRead;

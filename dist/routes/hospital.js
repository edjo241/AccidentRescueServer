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
exports.hospitalRead = exports.hospitalComplete = exports.reportPolice = exports.addPatient = exports.hospitalAccidentDetails = exports.accidentHospital = void 0;
const accidentHospital = (hospitalService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hid = req.body.hid;
    console.log("hid value", hid);
    const status = yield hospitalService.accidentHospital(hid);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.accidentHospital = accidentHospital;
const hospitalAccidentDetails = (hospitalService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accId = req.body.accId;
    console.log("accid value", accId);
    const status = yield hospitalService.hospitalAccidentDetails(accId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.hospitalAccidentDetails = hospitalAccidentDetails;
const addPatient = (hospitalService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let sex = req.body.sex;
    let age = req.body.age;
    let phone = req.body.phone;
    let address = req.body.address;
    let roadAccident = req.body.roadAccident;
    let accId = req.body.accId;
    console.log("accid value", accId);
    const status = yield hospitalService.addPatient(firstName, lastName, sex, age, phone, address, roadAccident, accId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.addPatient = addPatient;
const reportPolice = (hospitalService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let policeId = req.body.police_id;
    let hospitalId = req.body.hospital_id;
    let accidentId = req.body.accident_id;
    let description = req.body.description;
    const status = yield hospitalService.reportPolice(policeId, hospitalId, accidentId, description);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.reportPolice = reportPolice;
const hospitalComplete = (hospitalService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accidentId = req.body.accident_id;
    const status = yield hospitalService.hospitalComplete(accidentId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.hospitalComplete = hospitalComplete;
const hospitalRead = (hospitalService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accidentId = req.body.accident_id;
    const status = yield hospitalService.hospitalRead(accidentId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.hospitalRead = hospitalRead;

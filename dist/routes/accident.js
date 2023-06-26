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
exports.hospitalAccept = exports.accidentAccept = exports.accidentFetch = exports.accidentReport = void 0;
const accidentReport = (accidentService, nearbyService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("accident api hitted");
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let uid = req.body.uid;
    const status = yield accidentService.accidentReport(latitude, longitude, uid);
    console.log("accident route" + latitude, longitude);
    let result = {
        status: null,
        accidentLatitude: null,
        accidentLongitude: null
    };
    result.status = status;
    result.accidentLatitude = latitude;
    result.accidentLongitude = longitude;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.accidentReport = accidentReport;
const accidentFetch = (accidentService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accident_id = req.body.acc_id;
    const status = yield accidentService.accidentFetch(accident_id);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.accidentFetch = accidentFetch;
const accidentAccept = (accidentService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accident_id = req.body.acc_id;
    let user_id = req.body.uid;
    const status = yield accidentService.accidentAccept(accident_id, user_id);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.accidentAccept = accidentAccept;
const hospitalAccept = (accidentService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accId = req.body.accId;
    let hid = req.body.hid;
    const status = yield accidentService.hospitalAccept(accId, hid);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.hospitalAccept = hospitalAccept;

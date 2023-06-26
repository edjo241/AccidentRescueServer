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
exports.hospitalList = exports.nearbyReport = void 0;
const nearbyReport = (nearbyService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let uid = req.body.uid;
    let accId = req.body.acc_id;
    const status = yield nearbyService.nearbyReport(latitude, longitude, uid, accId);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.nearbyReport = nearbyReport;
const hospitalList = (nearbyService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("nearby hospital api");
    let acc_id = req.body.acc_id;
    const status = yield nearbyService.hospitalList(acc_id);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.hospitalList = hospitalList;

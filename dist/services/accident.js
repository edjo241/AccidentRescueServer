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
exports.createAccidentService = void 0;
const createAccidentService = (accidentRepository) => {
    return {
        accidentReport: (latitude, longitude, uid) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield accidentRepository.accidentReport(latitude, longitude, uid);
            const nearbyHospital = () => __awaiter(void 0, void 0, void 0, function* () {
                const hospitalList = yield accidentRepository.hospitalFetch();
                console.log("hospital fetch");
                hospitalList.recordset.map((item) => {
                    compareLoc(item.latitude, item.longitude, latitude, longitude, item.hid, result);
                });
            });
            setTimeout(nearbyHospital, 2000);
            function compareLoc(accidentLatitude, accidentLongitude, userLat, userLong, hid, accId) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("formula " + accidentLatitude, accidentLongitude, userLat, userLong + "uid :" + uid);
                    const R = 6371;
                    const dLat = deg2rad(userLat - accidentLatitude);
                    const dLon = deg2rad(userLong - accidentLongitude);
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(deg2rad(accidentLatitude)) *
                            Math.cos(deg2rad(userLat)) *
                            Math.sin(dLon / 2) *
                            Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const d = R * c;
                    const radius = 15;
                    if (d <= radius) {
                        console.log("It is a match");
                        const result = yield accidentRepository.nearbyHospital(hid, accId, d);
                    }
                    else {
                        console.log("It is not a match");
                    }
                });
            }
            function deg2rad(deg) {
                return deg * (Math.PI / 180);
            }
            return result;
        }),
        accidentFetch: (acc_id) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield accidentRepository.accidentFetch(acc_id);
            return result;
        }),
        accidentAccept: (acc_id, uid) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield accidentRepository.accidentAccept(acc_id, uid);
            return result;
        }),
        hospitalAccept: (accId, hid) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield accidentRepository.hospitalAccept(accId, hid);
            return result;
        }),
    };
};
exports.createAccidentService = createAccidentService;

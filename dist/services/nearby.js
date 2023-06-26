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
exports.createNearbyService = void 0;
const notification_1 = require("../notification");
let accidentLatitude;
let accidentLongitude;
let accident_id = -1;
let accidentUserid;
const createNearbyService = (nearbyRepository) => {
    return {
        nearbyReport: (latitude, longitude, uid, accId) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield nearbyRepository.nearbyReport(latitude, longitude, uid, accId);
            console.log("nerby");
            console.log("repo", accId);
            (0, notification_1.sendNotification)(result, accId);
        }),
        hospitalList: (acc_id) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield nearbyRepository.hospitalList(acc_id);
            return result;
        })
    };
};
exports.createNearbyService = createNearbyService;

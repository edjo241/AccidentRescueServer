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
exports.createNearbyRepository = void 0;
let sql = require('mssql');
let async = require('async');
const config_1 = require("../config");
let config = (0, config_1.loadConfig)();
const createNearbyRepository = () => {
    return {
        nearbyReport: (latitude, longitude, uid, accidentId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update users set location=geography::Point(${latitude},${longitude},4326) where uid=${uid}`);
                let result2 = yield pool.request().query(`insert into nearbyUser (uid,[accident-id]) values('${uid}','${accidentId}')`);
                let result3 = yield pool.request().query(`select push_token from users where uid =${uid}`);
                let pushArray = [];
                result3.recordset.forEach((item) => {
                    pushArray.push(item.push_token);
                });
                return pushArray;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        hospitalList: (acc_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select * from hospital where hid in (select hid from nearbyHospital where accId='${acc_id}' )`);
                let hospitalId = result.recordset.map((item) => item.hid);
                let result2 = yield pool.request().query(`select accId,distance,hid from nearbyHospital where hid in (${hospitalId})`);
                const send = result.recordset.map((item) => {
                    const distance = result2.recordset.filter((item2) => item2.accId == acc_id && item2.hid == item.hid);
                    return Object.assign(Object.assign({}, item), { distance: distance[0].distance });
                });
                return send;
            }
            catch (error) {
                console.log(error.message);
            }
        })
    };
};
exports.createNearbyRepository = createNearbyRepository;

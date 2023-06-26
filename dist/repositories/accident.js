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
exports.createAccidentRepository = void 0;
let sql = require('mssql');
let aync = require('async');
const turf = require('@turf/turf');
const config_1 = require("../config");
const geolib = require('geolib');
let config = (0, config_1.loadConfig)();
const { sendMessage } = require('../websocket.ts');
const web = require('ws');
const ws = new web('ws://192.168.0.163:8080');
const createAccidentRepository = () => {
    return {
        accidentReport: (latitude, longitude, uid) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`insert into accident (uid,latitude,longitude,timestamp) values ('${uid}','${latitude}','${longitude}',GETDATE())`);
                let send = yield pool.request().query(`select top 1 * from accident order by timestamp desc`);
                function myFunction() {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log('This function was triggered after 30 seconds');
                        let nearby = yield pool.request().query(`select uid from nearbyUser where [accident-id]='${send.recordset[0].accident_id}'`);
                        console.log("Length ", nearby.recordset.length);
                        if (nearby.recordset.length == 0) {
                            const messageObject = {
                                id: send.recordset[0].accident_id,
                                acc_latitude: latitude,
                                acc_longitude: longitude
                            };
                            ws.send(JSON.stringify(messageObject));
                        }
                        console.log("is there any nearby: ", nearby);
                    });
                }
                setTimeout(myFunction, 30000);
                return send.recordset[0].accident_id;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        accidentFetch: (acc_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result1 = yield pool.request().query(`select * from accident where accident_id='${acc_id}'`);
                let result3 = yield pool.request().query(`select convert(varchar,timestamp,120) as time from accident where accident_id='${acc_id}'`);
                console.log(result3);
                let result2 = yield pool.request().query(`select * from users where uid in (select uid from accident where accident_id='${acc_id}')`);
                let result = {
                    acc_id: result1.recordset[0].accident_id,
                    reporter: result2.recordset[0].firstName,
                    time: result3.recordset[0].time,
                    reporter_phone: result2.recordset[0].phone,
                    latitude: result1.recordset[0].latitude,
                    longitude: result1.recordset[0].longitude
                };
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        accidentAccept: (acc_id, uid) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update accident set is_accepted='1',accepted_uid='${uid}' where accident_id='${acc_id}' and is_accepted='0'`);
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        hospitalFetch: () => __awaiter(void 0, void 0, void 0, function* () {
            let pool = yield sql.connect(config.dbConfig.connectionString);
            let result = yield pool.request().query(`select hid,latitude,longitude from hospital where role='hospital'`);
            console.log(result);
            return result;
        }),
        nearbyHospital: (hid, accId, distance) => __awaiter(void 0, void 0, void 0, function* () {
            let pool = yield sql.connect(config.dbConfig.connectionString);
            let result = yield pool.request().query(`insert into nearbyHospital (hid,accId,distance) values ('${hid}','${accId}','${distance}')`);
            console.log(result);
            return result;
        }),
        hospitalAccept: (accId, hid) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update accident set hospital_id='${hid}' where accident_id='${accId}'`);
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
    };
};
exports.createAccidentRepository = createAccidentRepository;

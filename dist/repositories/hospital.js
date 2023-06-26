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
exports.createHospitalRepository = void 0;
let sql = require('mssql');
let aync = require('async');
const config_1 = require("../config");
let config = (0, config_1.loadConfig)();
const createHospitalRepository = () => {
    return {
        accidentHospital: (hid) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select b.firstName,b.lastName,b.phone,b.vehicleNumber,convert(varchar,a.timestamp,120) as time,a.accident_id,a.hospital_read,a.police_read from accident as a inner join users as b on a.accepted_uid=b.uid where hospital_id='${hid}' and hospital_closed=0`);
                console.log(result.recordset);
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        hospitalAccidentDetails: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select b.firstName,b.lastName,b.phone,b.vehicleNumber,convert(varchar,a.timestamp,120) as time,a.latitude,a.longitude from accident as a inner join users as b on a.accepted_uid=b.uid where accident_id='${accId}'`);
                console.log(result.recordset);
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        addPatient: (firstName, lastName, sex, age, phone, address, roadAccident, accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`insert into patient (firstName,lastName,sex,age,phone,address,roadAccident,accident_id) values ('${firstName}','${lastName}','${sex}','${age}','${phone}','${address}','${roadAccident}','${accId}')`);
                console.log(result);
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        reportPolice: (policeId, hospitalId, accidentId, description) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`insert into policeReport (police_id,hospital_id,accident_id,description) values('${policeId}','${hospitalId}','${accidentId}','${description}')`);
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        hospitalComplete: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update accident set hospital_closed='1' where accident_id='${accId}'`);
                return result;
            }
            catch (error) {
            }
        }),
        hospitalRead: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update accident set hospital_read='1' where accident_id='${accId}'`);
                return result;
            }
            catch (error) {
            }
        })
    };
};
exports.createHospitalRepository = createHospitalRepository;

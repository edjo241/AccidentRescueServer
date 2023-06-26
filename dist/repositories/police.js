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
exports.createPoliceRepository = void 0;
let sql = require('mssql');
let aync = require('async');
const config_1 = require("../config");
let config = (0, config_1.loadConfig)();
const createPoliceRepository = () => {
    return {
        getPolice: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select hid,name from hospital where role='police'`);
                console.log(result.recordset[0]);
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        accidentPolice: (hid) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select a.accident_id,convert(varchar,a.timestamp,120) as time,a.hospital_read,a.police_read,c.name,d.firstName,d.lastName from accident as a join policeReport as b on a.accident_id=b.accident_id join  hospital as c on b.hospital_id=c.hid join users as d on a.accepted_uid=d.uid where b.police_id='${hid}' and police_closed=0`);
                console.log(result.recordset);
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        policeAccidentDetails: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select b.firstName,b.lastName,b.phone,b.vehicleNumber,convert(varchar,a.timestamp,120) as time,a.latitude,a.longitude,c.description from accident as a inner join users as b on a.accepted_uid=b.uid inner join policeReport as c on a.accident_id=c.accident_id
                where a.accident_id='${accId}'`);
                console.log(result.recordset);
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        patientDetails: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select * from patient where accident_id='${accId}'`);
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        addFaultDriver: (firstName, lastName, sex, age, phone, dlNo, vhNo, accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`insert into faultDriver (firstName,lastName,sex,age,phone,dlNo,vhNo,accident_id) values ('${firstName}','${lastName}','${sex}','${age}','${phone}','${dlNo}','${vhNo}','${accId}')`);
                console.log(result);
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        policeComplete: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update accident set police_closed='1' where accident_id='${accId}'`);
                return result;
            }
            catch (error) {
            }
        }),
        policeRead: (accId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`update accident set police_read='1' where accident_id='${accId}'`);
                return result;
            }
            catch (error) {
            }
        })
    };
};
exports.createPoliceRepository = createPoliceRepository;

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
exports.createRegistrationRepository = void 0;
let sql = require('mssql');
let async = require('async');
const config_1 = require("../config");
let config = (0, config_1.loadConfig)();
const createRegistrationRepository = () => {
    return {
        SaveUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let query = yield pool.request().query(`insert into users (firstName,lastName,pwd,phone,vehicleNumber) values ('${user.firstName}','${user.lastName}','${user.pwd}','${user.phone}','${user.vehicleNumber}')`);
                let result = yield pool.request().query(`select * from users where firstName='${user.firstName}'`);
                if (result.recordset.length) {
                    const { user } = {
                        user: {
                            uid: result.recordset[0].uid,
                            firstName: result.recordset[0].firstName
                        }
                    };
                    return user;
                }
                else {
                    let error = "registration unsucessfull";
                    return error;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        GetUser: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query("select * from users");
                console.log("repo");
                return result.recordset;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        updateToken: (uid, pushToken) => __awaiter(void 0, void 0, void 0, function* () {
            let pool = yield sql.connect(config.dbConfig.connectionString);
            let result = yield pool.request().query(`update users set push_token='${pushToken}' where uid='${uid}'`);
            console.log("push token updation", result);
            return result;
        }),
        SaveHospital: (name, type, latitude, longitude, email, password, role, police_id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let query = yield pool.request().query(`insert into hospital (name,type,latitude,longitude,email,password,role,police_id) values('${name}','${type}','${latitude}','${longitude}','${email}','${password}','${role}','${police_id}')`);
                let result = yield pool.request().query(`select * from hospital where email='${email}'`);
                if (result.recordset.length) {
                    const { user } = {
                        user: {
                            hid: result.recordset[0].hid,
                            name: result.recordset[0].name,
                            role: result.recordset[0].role,
                        }
                    };
                    return user;
                }
                else {
                    let error = "registration unsucessfull";
                    return error;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        SavePolice: (name, latitude, longitude, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let query = yield pool.request().query(`insert into hospital (name,latitude,longitude,email,password,role) values('${name}','${latitude}','${longitude}','${email}','${password}','${role}')`);
                let result = yield pool.request().query(`select * from hospital where email='${email}'`);
                if (result.recordset.length) {
                    const { user } = {
                        user: {
                            hid: result.recordset[0].hid,
                            name: result.recordset[0].name,
                            role: result.recordset[0].role,
                        }
                    };
                    return user;
                }
                else {
                    let error = "registration unsucessfull";
                    return error;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        })
    };
};
exports.createRegistrationRepository = createRegistrationRepository;

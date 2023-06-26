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
exports.createLoginRepository = void 0;
let sql = require("mssql");
let async = require('async');
const config_1 = require("../config");
let config = (0, config_1.loadConfig)();
const createLoginRepository = () => {
    return {
        login: (phone, password) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select * from users where phone='${phone}' and pwd='${password}'`);
                console.log(result);
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
                    let error = "login unsucessfull";
                    return error;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        websiteLogin: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query(`select * from hospital where email='${email}' and password='${password}'`);
                console.log(result.recordset[0].hid);
                if (result.recordset.length) {
                    if (result.recordset[0].role == 'hospital') {
                        const { user } = {
                            user: {
                                hid: result.recordset[0].hid,
                                name: result.recordset[0].name,
                                role: result.recordset[0].role,
                                policeId: result.recordset[0].police_id
                            }
                        };
                        return user;
                    }
                    else {
                        const { user } = {
                            user: {
                                hid: result.recordset[0].hid,
                                name: result.recordset[0].name,
                                role: result.recordset[0].role,
                            }
                        };
                        return user;
                    }
                }
                else {
                    let error = "login unsucessfull";
                    return error;
                }
            }
            catch (error) {
                console.log(error.message);
            }
        })
    };
};
exports.createLoginRepository = createLoginRepository;

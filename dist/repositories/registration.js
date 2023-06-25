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
                let result = yield pool.request().query("insert query");
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        GetUser: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let pool = yield sql.connect(config.dbConfig.connectionString);
                let result = yield pool.request().query("select * from user");
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        })
    };
};
exports.createRegistrationRepository = createRegistrationRepository;

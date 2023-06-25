"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const server_1 = require("./server");
const registration_1 = require("./services/registration");
const registration_2 = require("./repositories/registration");
const login_1 = require("./services/login");
dotenv_1.default.config();
const config = (0, config_1.loadConfig)();
const regRepo = (0, registration_2.createRegistrationRepository)();
const loginService = (0, login_1.createLoginService)(config, regRepo);
const registrationService = (0, registration_1.createRegistrationService)(regRepo);
const server = (0, server_1.createServer)({
    config,
    services: {
        loginService,
        registrationService
    },
    enableCors: false,
    sendErrors: true
});
server.listen(6001, () => {
    console.log("server is listening on 6001.");
});

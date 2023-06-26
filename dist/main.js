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
const accident_1 = require("./repositories/accident");
const login_1 = require("./repositories/login");
const nearby_1 = require("./repositories/nearby");
const hospital_1 = require("./repositories/hospital");
const police_1 = require("./repositories/police");
const login_2 = require("./services/login");
const nearby_2 = require("./services/nearby");
const accident_2 = require("./services/accident");
const hospital_2 = require("./services/hospital");
const police_2 = require("./services/police");
const websocket_1 = require("./websocket");
const admin = require('firebase-admin');
const serviceAccount = require('./notification-accidentrescue-firebase-adminsdk-fhy4z-cfee406429.json');
(0, websocket_1.websocketFunction)();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-accidentrescue.firebaseio.com",
    projectId: "notification-accidentrescue"
});
dotenv_1.default.config();
const config = (0, config_1.loadConfig)();
const regRepo = (0, registration_2.createRegistrationRepository)();
const logRepo = (0, login_1.createLoginRepository)();
const accidentRepo = (0, accident_1.createAccidentRepository)();
const nearbyRepo = (0, nearby_1.createNearbyRepository)();
const hospitalRepo = (0, hospital_1.createHospitalRepository)();
const policeRepo = (0, police_1.createPoliceRepository)();
const loginService = (0, login_2.createLoginService)(logRepo);
const registrationService = (0, registration_1.createRegistrationService)(regRepo);
const accidentService = (0, accident_2.createAccidentService)(accidentRepo);
const nearbyService = (0, nearby_2.createNearbyService)(nearbyRepo);
const hospitalService = (0, hospital_2.createHospitalService)(hospitalRepo);
const policeService = (0, police_2.createPoliceService)(policeRepo);
const server = (0, server_1.createServer)({
    config,
    services: {
        loginService,
        registrationService,
        accidentService,
        nearbyService,
        hospitalService,
        policeService,
    },
    enableCors: false,
    sendErrors: true
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("server is listening on 8001.");
});

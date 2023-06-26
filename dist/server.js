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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRegistration_1 = require("./routes/userRegistration");
const login_1 = require("./routes/login");
const accident_1 = require("./routes/accident");
const accident_2 = require("./routes/accident");
const userRegistration_2 = require("./routes/userRegistration");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const nearby_1 = require("./routes/nearby");
const userRegistration_3 = require("./routes/userRegistration");
const login_2 = require("./routes/login");
const nearby_2 = require("./routes/nearby");
const accident_3 = require("./routes/accident");
const hospital_1 = require("./routes/hospital");
const hospital_2 = require("./routes/hospital");
const hospital_3 = require("./routes/hospital");
const userRegistration_4 = require("./routes/userRegistration");
const police_1 = require("./routes/police");
const hospital_4 = require("./routes/hospital");
const police_2 = require("./routes/police");
const police_3 = require("./routes/police");
const police_4 = require("./routes/police");
const police_5 = require("./routes/police");
const hospital_5 = require("./routes/hospital");
const police_6 = require("./routes/police");
const hospital_6 = require("./routes/hospital");
const police_7 = require("./routes/police");
const asyncHandler = (handler) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield handler(req, res, next);
    }
    catch (e) {
        next(e);
    }
});
const createServer = (options) => {
    const server = (0, express_1.default)();
    server.use((0, cors_1.default)());
    if (options.enableCors) {
        server.use((0, cors_1.default)({ origin: "frontend url", credentials: true }));
    }
    server.use((0, compression_1.default)());
    server.use(body_parser_1.default.json());
    server.use((0, helmet_1.default)());
    server.use(helmet_1.default.frameguard({ action: "deny" }));
    server.use((0, express_session_1.default)({
        name: "sessionName",
        secret: options.config.session.secret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: options.config.session.cookieMaxAgeMs,
            secure: "auto",
            path: "/",
            httpOnly: options.config.sessionCookie.httpOnly,
            sameSite: options.config.sessionCookie.sameSite
        }
    }));
    server.get("/api/getUsers", (0, userRegistration_1.getUsers)(options.services.registrationService));
    server.use("/api/registerUser", (0, userRegistration_1.saveUser)(options.services.registrationService));
    server.post("/api/updateToken", (0, userRegistration_2.updateToken)(options.services.registrationService));
    server.post("/api/loginUser", (0, login_1.login)(options.services.loginService));
    server.post("/api/accidentReport", (0, accident_1.accidentReport)(options.services.accidentService, options.services.nearbyService));
    server.post("/api/nearby", (0, nearby_1.nearbyReport)(options.services.nearbyService));
    server.post("/api/accidentFetch", (0, accident_2.accidentFetch)(options.services.accidentService));
    server.post("/api/accidentAccept", (0, accident_1.accidentAccept)(options.services.accidentService));
    server.post("/api/registerHospital", (0, userRegistration_3.SaveHospital)(options.services.registrationService));
    server.post("/api/registerPolice", (0, userRegistration_4.SavePolice)(options.services.registrationService));
    server.post("/api/websiteLogin", (0, login_2.websiteLogin)(options.services.loginService));
    server.post("/api/hospitalList", (0, nearby_2.hospitalList)(options.services.nearbyService));
    server.post("/api/hospitalAccept", (0, accident_3.hospitalAccept)(options.services.accidentService));
    server.post("/api/accidentHospital", (0, hospital_1.accidentHospital)(options.services.hospitalService));
    server.post("/api/hospitalAccidentDetails", (0, hospital_2.hospitalAccidentDetails)(options.services.hospitalService));
    server.post("/api/addPatient", (0, hospital_3.addPatient)(options.services.hospitalService));
    server.get("/api/getPolice", (0, police_1.getPolice)(options.services.policeService));
    server.post("/api/reportPolice", (0, hospital_4.reportPolice)(options.services.hospitalService));
    server.post("/api/accidentPolice", (0, police_2.accidentPolice)(options.services.policeService));
    server.post("/api/policeAccidentDetails", (0, police_3.policeAccidentDetails)(options.services.policeService));
    server.post("/api/patientDetails", (0, police_4.patientDetails)(options.services.policeService));
    server.post("/api/addFaultDriver", (0, police_5.addFaultDriver)(options.services.policeService));
    server.post("/api/hospitalComplete", (0, hospital_5.hospitalComplete)(options.services.hospitalService));
    server.post("/api/policeComplete", (0, police_6.policeComplete)(options.services.policeService));
    server.post("/api/hospitalRead", (0, hospital_6.hospitalRead)(options.services.hospitalService));
    server.post("/api/policeRead", (0, police_7.policeRead)(options.services.policeService));
    return server;
};
exports.createServer = createServer;

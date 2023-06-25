import path from "path";
import express,{RequestHandler} from "express";
import cors from "cors";
import { Config } from "./config";
import{saveUser,getUsers} from "./routes/userRegistration";
import {login} from './routes/login';
import { accidentAccept, accidentReport } from "./routes/accident";
import {accidentFetch} from './routes/accident';
import { RegistrationService } from "./services/registration";
import { updateToken } from "./routes/userRegistration";
import { LoginService } from "./services/login";
import { AccidentService } from "./services/accident";
import compression from  "compression";
import helmet from "helmet";
import bodyParser from "body-parser"
import multer from  "multer"
import session from "express-session";
import { secure } from "./secure";
import { nearbyReport } from "./routes/nearby";
import { NearbyService } from "./services/nearby";
import { SaveHospital } from "./routes/userRegistration";
import { websiteLogin } from "./routes/login";
import { hospitalList } from "./routes/nearby";
import { hospitalAccept } from "./routes/accident";
import { HospitalService } from "./services/hospital";
import { PoliceService } from "./services/police";
import { accidentHospital } from "./routes/hospital";
import { hospitalAccidentDetails } from "./routes/hospital";
import { addPatient } from "./routes/hospital";
import { SavePolice } from "./routes/userRegistration";
import { getPolice } from "./routes/police";
import { reportPolice } from "./routes/hospital";
import { accidentPolice } from "./routes/police";
import { policeAccidentDetails } from "./routes/police";
import { patientDetails } from "./routes/police";
import { addFaultDriver } from "./routes/police";
import { hospitalComplete } from "./routes/hospital";
import { policeComplete } from "./routes/police";
import { hospitalRead } from "./routes/hospital";
import { policeRead } from "./routes/police";


const asyncHandler = 
(handler : RequestHandler): RequestHandler =>
async (req,res,next) => {
    try{
        return await handler(req,res,next);    
    } catch(e){
        next(e);
    }
};

interface CreateServerOptions{
    config : Config;
    services:{
        loginService:LoginService;
        registrationService : RegistrationService;
        accidentService:AccidentService;
        nearbyService:NearbyService;
        hospitalService:HospitalService;
        policeService:PoliceService;
    };
    enableCors: boolean;
    sendErrors: boolean;
}

export const createServer = (options : CreateServerOptions) => {
    const server = express();
    server.use(cors())

    if(options.enableCors){
        server.use(
            cors({origin : "frontend url",credentials : true})
        );
    }

    // The Usual

    server.use(compression());
    server.use(bodyParser.json());
    server.use(helmet());
    server.use(helmet.frameguard({action: "deny"}));
    server.use(
        session({
            name: "sessionName",
            secret : options.config.session.secret,
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

        })
    );

    // routings
    server.get("/api/getUsers",
    // secure(),
    getUsers(options.services.registrationService));
    server.use("/api/registerUser",saveUser(options.services.registrationService))
    server.post("/api/updateToken",updateToken(options.services.registrationService))
    server.post("/api/loginUser",login(options.services.loginService))
    server.post("/api/accidentReport",accidentReport(options.services.accidentService,options.services.nearbyService))
    server.post("/api/nearby",nearbyReport(options.services.nearbyService))
    server.post("/api/accidentFetch",accidentFetch(options.services.accidentService))
    server.post("/api/accidentAccept",accidentAccept(options.services.accidentService))
    server.post("/api/registerHospital",SaveHospital(options.services.registrationService))
    server.post("/api/registerPolice",SavePolice(options.services.registrationService))
    server.post("/api/websiteLogin",websiteLogin(options.services.loginService))
    server.post("/api/hospitalList",hospitalList(options.services.nearbyService))
    server.post("/api/hospitalAccept",hospitalAccept(options.services.accidentService))
    server.post("/api/accidentHospital",accidentHospital(options.services.hospitalService))
    server.post("/api/hospitalAccidentDetails",hospitalAccidentDetails(options.services.hospitalService))
    server.post("/api/addPatient",addPatient(options.services.hospitalService))
    server.get("/api/getPolice",getPolice(options.services.policeService))
    server.post("/api/reportPolice",reportPolice(options.services.hospitalService))
    server.post("/api/accidentPolice",accidentPolice(options.services.policeService))
    server.post("/api/policeAccidentDetails",policeAccidentDetails(options.services.policeService))
    server.post("/api/patientDetails",patientDetails(options.services.policeService))
    server.post("/api/addFaultDriver",addFaultDriver(options.services.policeService))
    server.post("/api/hospitalComplete",hospitalComplete(options.services.hospitalService))
    server.post("/api/policeComplete",policeComplete(options.services.policeService))
    server.post("/api/hospitalRead",hospitalRead(options.services.hospitalService))
    server.post("/api/policeRead",policeRead(options.services.policeService))

    return server;
}
import dotenv from "dotenv";
import { loadConfig } from "./config";
import {createServer} from "./server";
import { createRegistrationService } from "./services/registration";
import { createRegistrationRepository } from "./repositories/registration";
import { createAccidentRepository } from "./repositories/accident";
import { createLoginRepository } from "./repositories/login";
import { createNearbyRepository } from "./repositories/nearby";
import { createHospitalRepository } from "./repositories/hospital";
import { createPoliceRepository } from "./repositories/police";
import {createLoginService} from "./services/login";
import { createNearbyService } from "./services/nearby";
import { createAccidentService } from "./services/accident";
import { createHospitalService } from "./services/hospital";
import { createPoliceService } from "./services/police";
import { websocketFunction } from "./websocket";
import { sendNotification } from "./notification";
const admin = require('firebase-admin');
const serviceAccount = require('./notification-accidentrescue-firebase-adminsdk-fhy4z-cfee406429.json');


websocketFunction();
// sendNotification();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-accidentrescue.firebaseio.com",
    projectId:"notification-accidentrescue"
  });

dotenv.config();

const config =loadConfig();

const regRepo= createRegistrationRepository();
const logRepo= createLoginRepository();
const accidentRepo=createAccidentRepository();
const nearbyRepo=createNearbyRepository();
const hospitalRepo=createHospitalRepository();
const policeRepo=createPoliceRepository();


const loginService = createLoginService(logRepo);
const registrationService = createRegistrationService(regRepo);
const accidentService=createAccidentService(accidentRepo);
const nearbyService=createNearbyService(nearbyRepo);
const hospitalService=createHospitalService(hospitalRepo);
const policeService=createPoliceService(policeRepo);

const server = createServer({
config,
services:{   
    loginService,
    registrationService,
    accidentService,
    nearbyService,
    hospitalService,
    policeService,
},
enableCors:false,
sendErrors:true
});

const port= process.env.PORT || 8080

server.listen(port, ()=> {
    console.log("server is listening on 8001.")
})

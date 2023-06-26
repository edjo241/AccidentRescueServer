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
exports.SavePolice = exports.SaveHospital = exports.updateToken = exports.getUsers = exports.saveUser = void 0;
const saveUser = (registrationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.user);
    let user = req.body.user;
    const status = yield registrationService.saveUser(user);
    let result = {
        status: null
    };
    result.status = status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.saveUser = saveUser;
const getUsers = (registrationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield registrationService.GetUser();
    let result = {
        users: null,
    };
    result.users = data;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.getUsers = getUsers;
const updateToken = (registrationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.body.uid;
    let pushToken = req.body.pushToken;
    console.log("update api ", uid);
    console.log("update api ", pushToken);
    const data = yield registrationService.updateToken(uid, pushToken);
    let result = {
        status: null
    };
    result.status = data;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.updateToken = updateToken;
const SaveHospital = (registrationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hid = req.body.name;
    let type = req.body.type;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let police_id = req.body.police_id;
    const data = yield registrationService.SaveHospital(hid, type, latitude, longitude, email, password, role, police_id);
    let result = {
        status: null
    };
    result.status = data;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.SaveHospital = SaveHospital;
const SavePolice = (registrationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hid = req.body.name;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    const data = yield registrationService.SavePolice(hid, latitude, longitude, email, password, role);
    let result = {
        status: null
    };
    result.status = data;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
});
exports.SavePolice = SavePolice;

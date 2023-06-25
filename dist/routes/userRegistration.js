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
exports.getUsers = exports.saveUser = void 0;
const saveUser = (registrationService) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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

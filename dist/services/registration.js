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
exports.createRegistrationService = void 0;
const createRegistrationService = (registrationRepository) => {
    return {
        saveUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield registrationRepository.SaveUser(user);
            return result;
        }),
        GetUser: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let result = yield registrationRepository.GetUser();
                return result;
            }
            catch (error) {
                console.log(error.message);
            }
        }),
        updateToken: (uid, pushToken) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield registrationRepository.updateToken(uid, pushToken);
        }),
        SaveHospital: (name, type, latitude, longitude, email, password, role, police_id) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield registrationRepository.SaveHospital(name, type, latitude, longitude, email, password, role, police_id);
            return result;
        }),
        SavePolice: (name, latitude, longitude, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield registrationRepository.SavePolice(name, latitude, longitude, email, password, role);
            return result;
        })
    };
};
exports.createRegistrationService = createRegistrationService;

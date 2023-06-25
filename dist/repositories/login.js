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
exports.createLoginService = void 0;
const createLoginService = (config, userRepository) => {
    return {
        login: (userName, password, headersToForward) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = {
                user: {
                    fullName: "userName",
                    message: "",
                    isAdmin: true,
                    userPermission: null,
                    userDataConfiguration: true
                }
            };
            return user;
        })
    };
};
exports.createLoginService = createLoginService;

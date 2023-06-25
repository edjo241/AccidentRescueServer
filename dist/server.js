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
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
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
    if (options.enableCors) {
        server.use((0, cors_1.default)({ origin: "fronted url", credentials: true }));
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
    server.get("api/getUsers", (0, userRegistration_1.getUsers)(options.services.registrationService));
    return server;
};
exports.createServer = createServer;

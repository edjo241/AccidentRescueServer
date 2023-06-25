"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const loadConfig = () => {
    return {
        dbConfig: {
            connectionString: "Server=tcp:arjunnair.database.windows.net,1433;Database=ambulance;Uid=edwin,Pwd={your_password}n;Trusted_Connection=yes;Request Timeout=0"
        },
        session: {
            secret: "yourSecret",
            cookieMaxAgeMs: 28800000
        },
        sessionCookie: {
            httpOnly: true,
            sameSite: true
        }
    };
};
exports.loadConfig = loadConfig;

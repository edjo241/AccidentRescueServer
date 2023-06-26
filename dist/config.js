"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const loadConfig = () => {
    return {
        dbConfig: {
            connectionString: "Server=tcp:accidentrescue.database.windows.net,1433;Initial Catalog=AMS;Persist Security Info=False;User ID=edwin;Password=accidentRescuer007;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
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

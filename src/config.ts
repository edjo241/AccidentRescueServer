import path from "path";
export interface Config{
    dbConfig:{
        connectionString:string;
    },
    session :{
        secret : string;
        cookieMaxAgeMs :number;
    }
    sessionCookie: {
        httpOnly:boolean;
        sameSite: boolean;
    }
}
export const loadConfig=():Config =>{
    return{
        dbConfig:{
            // connectionString:"Server=.;Database=AMS;Uid=sa,Pwd=admin@123;Trusted_Connection=yes;Request Timeout=0"
            // connectionString:"Server=localhost,1433;Database=AMS;Uid=sa;Password=admin@123;Trusted_Connection=True;TrustServerCertificate=True;Request Timeout=0"
            connectionString:"Server=tcp:accidentrescue.database.windows.net,1433;Initial Catalog=AMS;Persist Security Info=False;User ID=edwin;Password=accidentRescuer007;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
        },
        session :{
            secret : "yourSecret",
            cookieMaxAgeMs:28800000
        },
        sessionCookie:{
            httpOnly:true,
            sameSite:true
        }
    }
}

// connectionString=Server=tcp:arjunnair.database.windows.net,1433;Initial Catalog=ambulance;Persist Security Info=False;User ID=edwin;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
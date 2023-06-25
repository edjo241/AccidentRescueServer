import {RequestHandler} from "express";
import session from "express-session"
// import {LoginUser} from "./services/login";
declare module "express-session"{
    export interface SessionData{
        user:any;
    }
}

export const secure = (): RequestHandler=> (req,res,next)=>{
    if(
        !req.session?.user||
        (req.session?.cookie.expires as Date).getTime() < new Date().getTime()        
    ){
        return res.status(401).send();
    }
    return next();
}
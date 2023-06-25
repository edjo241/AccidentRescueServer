import { RequestHandler } from "express";
import { LoginService } from "../services/login";
import { LoginRepository } from "../repositories/login";
 
export const login=
(loginService:LoginService) : RequestHandler =>
async(req,res)=>{
        console.log("hi");
        let phone=req.body.phone;
        let password=req.body.password;
        
        const status=await loginService.login(phone,password);
        
        
        let result={
            status:null
        }
        result.status=status;
        
        let jsonResult=JSON.stringify(result);
        return res.status(200).send(jsonResult)
    }
export const websiteLogin=(loginService:LoginRepository): RequestHandler=>
async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password

    const status=await loginService.websiteLogin(email,password);

    let result={
        status:null
    }
    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}
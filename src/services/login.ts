
import { LoginRepository } from "../repositories/login";
export interface LoginService{
    login:(phone:Number,password:string)=>any,
    websiteLogin:(email:string,password:string)=>any,
}

export const createLoginService=(loginRepository:LoginRepository)=>{
    return{
        login:async(phone:Number,password:string)=>{
            const result=await loginRepository.login(phone,password);
            return result;
        },
        websiteLogin:async(email:string,password:string)=>{
            const result=await loginRepository.websiteLogin(email,password);
            return result
        }
    }
}
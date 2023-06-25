import { RegistrationRepository } from "../repositories/registration";
import {users} from '../types/user';


export interface RegistrationService{
    saveUser :(user:users) => any;
    GetUser : ()=> any;
    updateToken:(uid:number,pushToken:string)=>any;
    SaveHospital:(name:string,type:string,latitude:number,longitude:number,email:string,password:string,role:string,police_id:number)=>any,
    SavePolice:(name:string,latitude:number,longitude:number,email:string,password:string,role:string)=>any,
    
}

export const createRegistrationService=( 
    registrationRepository : RegistrationRepository
    ): RegistrationService =>{
        return{
            saveUser :  async (user:users) => {
                const result = await registrationRepository.SaveUser(user);
                return result;
            },
        
        GetUser : async()=>{
            try{
                let result = await registrationRepository.GetUser();
                return result;
           }
           catch (error : any){
               console.log(error.message);

           }
        },
        updateToken:async(uid:number,pushToken:string)=>{
            const result=await registrationRepository.updateToken(uid,pushToken);
            
        },
        SaveHospital:async(name:string,type:string,latitude:number,longitude:number,email:string,password:string,role:string,police_id:number)=>{
            const result=await registrationRepository.SaveHospital(name,type,latitude,longitude,email,password,role,police_id);
            return result;
        },
        SavePolice:async(name:string,latitude:number,longitude:number,email:string,password:string,role:string)=>{
            const result=await registrationRepository.SavePolice(name,latitude,longitude,email,password,role);
            return result;
        }
    }
};
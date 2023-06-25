import { HospitalRepository } from "../repositories/hospital";

export interface HospitalService{
    accidentHospital:(hid:number)=>any,
    hospitalAccidentDetails:(accId:number)=>any,
    addPatient:(firstName:string,lastName:string,sex:string,age:number,phone:number,address:string,roadAccident:boolean,accId:number)=>any,
    reportPolice:(policeId:number,hospitalId:number,accidentId:number,description:string)=>any,
    hospitalComplete:(accId:number)=>any,
    hospitalRead:(accId:number)=>any,
}

export const createHospitalService=(hospitalRepository:HospitalRepository)=>{
    return{
        accidentHospital:async(hid:number)=>{
            const result=await hospitalRepository.accidentHospital(hid);
            return result
        },
        hospitalAccidentDetails:async(accId:number)=>{
            const result=await hospitalRepository.hospitalAccidentDetails(accId);
            return result
        },
        addPatient:async(firstName:string,lastName:string,sex:string,age:number,phone:number,address:string,roadAccident:boolean,accId:number)=>{
            const result=await hospitalRepository.addPatient(firstName,lastName,sex,age,phone,address,roadAccident,accId);
            return result
        },
        reportPolice:async(policeId:number,hospitalId:number,accidentId:number,description:string)=>{
            const result=await hospitalRepository.reportPolice(policeId,hospitalId,accidentId,description);
            return result;
        },
        hospitalComplete:async(accId:number)=>{
                const result=await hospitalRepository.hospitalComplete(accId);
                return result;
            
            
        },

        hospitalRead:async(accId:number)=>{
            const result=await hospitalRepository.hospitalRead(accId);
            return result;
        
        
    }
        
    }
}
import { PoliceRepository } from "../repositories/police";

export interface PoliceService{
    getPolice:()=>any,
    accidentPolice:(hid:number)=>any,
    policeAccidentDetails:(accId:number)=>any,
    patientDetails:(accId:number)=>any,
    addFaultDriver:(firstName:string,lastName:string,sex:string,age:number,phone:number,dlNo:string,vhNo:string,accId:number)=>any,
    policeComplete:(accId:number)=>any,
    policeRead:(accId:number)=>any,
}

export const createPoliceService=(policeRepository:PoliceRepository)=>{
    return{
        getPolice:async()=>{
            const result=await policeRepository.getPolice();
            return result;
        },
        accidentPolice:async(hid:number)=>{
            const result=await policeRepository.accidentPolice(hid);
            return result
        },
        policeAccidentDetails:async(accId:number)=>{
            const result=await policeRepository.policeAccidentDetails(accId);
            return result;
        },
        patientDetails:async(accId:number)=>{
            const result=await policeRepository.patientDetails(accId);
            return result;
        },
        addFaultDriver:async(firstName:string,lastName:string,sex:string,age:number,phone:number,dlNo:string,vhNo:string,accId:number)=>{
            const result=await policeRepository.addFaultDriver(firstName,lastName,sex,age,phone,dlNo,vhNo,accId);
            return result;
        },
        policeComplete:async(accId:number)=>{
            const result=await policeRepository.policeComplete(accId);
            return result;
        
        
    },

    policeRead:async(accId:number)=>{
        const result=await policeRepository.policeRead(accId);
        return result;
    
    
}
        
    }
}
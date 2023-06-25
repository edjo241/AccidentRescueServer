import { AccidentRepository } from "../repositories/accident";

export interface AccidentService{
    accidentReport:(latitude:Number,longitude:Number,uid:Number)=>any,
    accidentFetch:(acc_id:number)=>any,
    accidentAccept:(acc_id:number,uid:number)=>any,
    hospitalAccept:(accId:number,hid:number)=>any,
    
}

export const createAccidentService=(accidentRepository:AccidentRepository):AccidentService=>{
    return{
        accidentReport:async(latitude:Number,longitude:Number,uid:Number)=>{
            const result=await accidentRepository.accidentReport(latitude,longitude,uid);
            
            
            const nearbyHospital=async()=>{
                const hospitalList=await accidentRepository.hospitalFetch()
                console.log("hospital fetch");
                hospitalList.recordset.map((item:any)=>{
                    
                    compareLoc(item.latitude,item.longitude,latitude,longitude,item.hid,result);
                })
                
            }
            setTimeout(nearbyHospital,2000)
       // finding nearby user
      
       async function compareLoc(accidentLatitude:any, accidentLongitude:any, userLat:any, userLong:any,hid:any,accId:any) {
        //function to compare and find nearby users
        console.log("formula "+accidentLatitude,accidentLongitude,userLat,userLong+"uid :"+uid);
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(userLat - accidentLatitude);
        const dLon = deg2rad(userLong - accidentLongitude);
        const a = //Haversine Formula
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(accidentLatitude)) *
            Math.cos(deg2rad(userLat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        // return d;
    
        const radius = 15; // check if the user is in 5KM
        if (d <= radius) {
            console.log("It is a match");
            
            const result=await accidentRepository.nearbyHospital(hid,accId,d);
            

        }
        else {
            console.log("It is not a match");
    }
      }
    
      function deg2rad(deg:any) {
        // converting lat,long values to radian

        return deg * (Math.PI / 180);
      }
            

            return result;
        },
        
        accidentFetch:async(acc_id:number)=>{
            const result=await accidentRepository.accidentFetch(acc_id);
            return result;
        },
        accidentAccept:async(acc_id:number,uid:number)=>{
            const result=await accidentRepository.accidentAccept(acc_id,uid);
            return result
        },
        hospitalAccept:async(accId:number,hid:number)=>{
            const result=await accidentRepository.hospitalAccept(accId,hid);
            return result;
        },
        
    }
}
import { RequestHandler } from "express";
import { HospitalService } from "../services/hospital";

export const accidentHospital=(hospitalService:HospitalService): RequestHandler=>
async(req,res)=>{
    let hid=req.body.hid;
    console.log("hid value",hid);
    const status=await hospitalService.accidentHospital(hid);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const hospitalAccidentDetails=(hospitalService:HospitalService): RequestHandler=>
async(req,res)=>{
    let accId=req.body.accId;
    console.log("accid value",accId);
    const status=await hospitalService.hospitalAccidentDetails(accId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const addPatient=(hospitalService:HospitalService): RequestHandler=>
async(req,res)=>{
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let sex=req.body.sex;
    let age=req.body.age;
    let phone=req.body.phone;
    let address=req.body.address;
    let roadAccident=req.body.roadAccident;
    let accId=req.body.accId;
    console.log("accid value",accId);
    const status=await hospitalService.addPatient(firstName,lastName,sex,age,phone,address,roadAccident,accId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const reportPolice=(hospitalService:HospitalService): RequestHandler=>
async(req,res)=>{
    let policeId=req.body.police_id;
    let hospitalId=req.body.hospital_id;
    let accidentId=req.body.accident_id;
    let description=req.body.description;
    const status=await hospitalService.reportPolice(policeId,hospitalId,accidentId,description);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const hospitalComplete=(hospitalService:HospitalService): RequestHandler=>
async(req,res)=>{
   
    let accidentId=req.body.accident_id;
  
    const status=await hospitalService.hospitalComplete(accidentId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const hospitalRead=(hospitalService:HospitalService): RequestHandler=>
async(req,res)=>{
   
    let accidentId=req.body.accident_id;
  
    const status=await hospitalService.hospitalRead(accidentId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

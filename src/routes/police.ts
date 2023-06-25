import { RequestHandler } from "express";
import { PoliceService } from "../services/police";

export const getPolice=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
    // let query=req.query.query as string;
    // console.log("query",query);
    const status=await policeService.getPolice();

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const accidentPolice=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
    let hid=req.body.hid;
    const status=await policeService.accidentPolice(hid);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const policeAccidentDetails=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
    let accId=req.body.accId;
    const status=await policeService.policeAccidentDetails(accId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const patientDetails=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
    let accId=req.body.accId;
    const status=await policeService.patientDetails(accId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const addFaultDriver=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let sex=req.body.sex;
    let age=req.body.age;
    let phone=req.body.phone;
    let dlNo=req.body.dlNo;
    let vhNo=req.body.vhNo;
    let accId=req.body.accId;
    console.log("accid value",accId);
    const status=await policeService.addFaultDriver(firstName,lastName,sex,age,phone,dlNo,vhNo,accId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const policeComplete=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
   
    let accidentId=req.body.accident_id;
  
    const status=await policeService.policeComplete(accidentId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const policeRead=(policeService:PoliceService): RequestHandler=>
async(req,res)=>{
   
    let accidentId=req.body.accident_id;
  
    const status=await policeService.policeRead(accidentId);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}
import { RequestHandler } from "express";
import { AccidentService } from "../services/accident";
import { NearbyService } from "../services/nearby";

export const accidentReport=(accidentService:AccidentService,nearbyService:NearbyService): RequestHandler=>
async(req,res)=>{
    console.log("accident api hitted");

    // websocketFunction();
    
    let latitude=req.body.latitude;
    let longitude=req.body.longitude;
    let uid=req.body.uid;
    const status=await accidentService.accidentReport(latitude,longitude,uid);
    
    

        // nearbyService.accidentData(latitude,longitude,uid,status);
        console.log("accident route"+latitude,longitude);
    

    let result={
        status:null,
        accidentLatitude:null,
        accidentLongitude:null
    }

    result.status=status;
    result.accidentLatitude=latitude;
    result.accidentLongitude=longitude;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}

export const accidentFetch=(accidentService:AccidentService):RequestHandler=>
async(req,res)=>{
    let accident_id=req.body.acc_id;
    const status=await accidentService.accidentFetch(accident_id);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);

}

export const accidentAccept=(accidentService:AccidentService):RequestHandler=>
async(req,res)=>{
    let accident_id=req.body.acc_id; 
    let user_id=req.body.uid;
    const status=await accidentService.accidentAccept(accident_id,user_id);

    let result={
        status:null
    }

    result.status=status

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}

export const hospitalAccept=(accidentService:AccidentService): RequestHandler=>
async(req,res)=>{
    let accId=req.body.accId;
    let hid=req.body.hid;
    const status=await accidentService.hospitalAccept(accId,hid);

    let result={
        status:null
    }

    result.status=status;

    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}


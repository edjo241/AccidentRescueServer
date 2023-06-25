import { RequestHandler } from "express";
import { NearbyService } from "../services/nearby";

export const nearbyReport=(nearbyService:NearbyService): RequestHandler =>
async(req,res)=>{
    let latitude=req.body.latitude;
    let longitude=req.body.longitude;
    let uid=req.body.uid;
    let accId=req.body.acc_id;
    const status=await nearbyService.nearbyReport(latitude,longitude,uid,accId);

    let result={
        status:null
    }
    result.status=status
    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}

export const hospitalList=(nearbyService:NearbyService):RequestHandler=>
async(req,res)=>{
    console.log("nearby hospital api");
    
    let acc_id=req.body.acc_id;
    const status=await nearbyService.hospitalList(acc_id);

    let result={
        status:null
    }
    result.status=status
    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}
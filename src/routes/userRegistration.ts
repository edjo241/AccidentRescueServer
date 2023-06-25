// const express=require('express')
// const router=express.Router()
// router.post('/',async(req,res)=>{
//     // console.log("working");
//     console.log(req.body.username);
//     res.send("hi user");
// })
// module.exports=router
import { RequestHandler} from "express"
import { RegistrationService } from "../services/registration"
import {users} from '../types/user'

export const saveUser = 
(registrationService : RegistrationService) : RequestHandler =>
async(req,res)=>{
    console.log(req.body.user);
    let user = req.body.user as users;
    const status = await registrationService.saveUser(user);
    let result ={
        status:null
    };
    result.status=status;
    let jsonResult = JSON.stringify(result);
    return res.status(200).send(jsonResult);
}

export const getUsers = 
(registrationService : RegistrationService) : RequestHandler =>
async(req,res) =>{
    const data= await registrationService.GetUser();
    let result={
        users:null,
    };
    result.users=data;
    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}

export const updateToken=
(registrationService : RegistrationService) : RequestHandler=>
    async(req,res) =>{
        let uid=req.body.uid;
        let pushToken=req.body.pushToken;
        console.log("update api ",uid,);
        console.log("update api ",pushToken,);
        
        const data=await registrationService.updateToken(uid,pushToken);
        let result={
            status:null
        }
        // console.log(data);
        
        result.status=data;
        let jsonResult=JSON.stringify(result);
        return res.status(200).send(jsonResult);
    }
export const SaveHospital=(registrationService:RegistrationService):RequestHandler=>
async(req,res)=>{
    let hid=req.body.name;
    let type=req.body.type;
    let latitude=req.body.latitude;
    let longitude=req.body.longitude;
    let email=req.body.email;
    let password=req.body.password;
    let role=req.body.role;
    let police_id=req.body.police_id

    const data =await registrationService.SaveHospital(hid,type,latitude,longitude,email,password,role,police_id);
    let result={
        status:null
    }

    result.status=data;
    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}

export const SavePolice=(registrationService:RegistrationService):RequestHandler=>
async(req,res)=>{
    let hid=req.body.name;
    let latitude=req.body.latitude;
    let longitude=req.body.longitude;
    let email=req.body.email;
    let password=req.body.password;
    let role=req.body.role;
    
    

    const data =await registrationService.SavePolice(hid,latitude,longitude,email,password,role);
    let result={
        status:null
    }

    result.status=data;
    let jsonResult=JSON.stringify(result);
    return res.status(200).send(jsonResult);
}


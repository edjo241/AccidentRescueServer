let sql=require('mssql');
let aync=require('async');
import { loadConfig } from "../config";
let config=loadConfig();

export interface HospitalRepository{
    accidentHospital:(hid:number)=>any,
    hospitalAccidentDetails:(accId:number)=>any,
    addPatient:(firstName:string,lastName:string,sex:string,age:number,phone:number,address:string,roadAccident:boolean,accId:number)=>any,
    reportPolice:(policeId:number,hospitalId:number,accidentId:number,description:string)=>any,
    hospitalComplete:(accId:number)=>any,
    hospitalRead:(accId:number)=>any,
}

export const createHospitalRepository=():HospitalRepository=>{
    return{
        // fetching hospitals that the emergency case was given
        accidentHospital:async(hid:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select b.firstName,b.lastName,b.phone,b.vehicleNumber,convert(varchar,a.timestamp,120) as time,a.accident_id,a.hospital_read,a.police_read from accident as a inner join users as b on a.accepted_uid=b.uid where hospital_id='${hid}' and hospital_closed=0`);
                console.log(result.recordset);
                return result.recordset;
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        hospitalAccidentDetails:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select b.firstName,b.lastName,b.phone,b.vehicleNumber,convert(varchar,a.timestamp,120) as time,a.latitude,a.longitude from accident as a inner join users as b on a.accepted_uid=b.uid where accident_id='${accId}'`);
                console.log(result.recordset);
                return result.recordset;
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        addPatient:async(firstName:string,lastName:string,sex:string,age:number,phone:number,address:string,roadAccident:boolean,accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`insert into patient (firstName,lastName,sex,age,phone,address,roadAccident,accident_id) values ('${firstName}','${lastName}','${sex}','${age}','${phone}','${address}','${roadAccident}','${accId}')`);
                console.log(result);
                
                return result;
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        reportPolice:async(policeId:number,hospitalId:number,accidentId:number,description:string)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`insert into policeReport (police_id,hospital_id,accident_id,description) values('${policeId}','${hospitalId}','${accidentId}','${description}')`);
                return result;
               
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        hospitalComplete:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update accident set hospital_closed='1' where accident_id='${accId}'`);
                return result;
            }
            catch(error:any){

            }
        },

        hospitalRead:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update accident set hospital_read='1' where accident_id='${accId}'`);
                return result;
            }
            catch(error:any){

            }
        }
    }
}
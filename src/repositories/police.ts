let sql=require('mssql');
let aync=require('async');
import { loadConfig } from "../config";
let config=loadConfig();

export interface PoliceRepository{
    getPolice:()=>any,
    accidentPolice:(hid:number)=>any,
    policeAccidentDetails:(accId:number)=>any,
    patientDetails:(accId:number)=>any,
    addFaultDriver:(firstName:string,lastName:string,sex:string,age:number,phone:number,dlNo:string,vhNo:string,accId:number)=>any,
    policeComplete:(accId:number)=>any,
    policeRead:(accId:number)=>any,

}

export const createPoliceRepository=():PoliceRepository=>{
    return{
        getPolice:async()=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select hid,name from hospital where role='police'`);
                console.log(result.recordset[0]);
                return result.recordset;
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
          // fetching police that the emergency case was given
          accidentPolice:async(hid:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select a.accident_id,convert(varchar,a.timestamp,120) as time,a.hospital_read,a.police_read,c.name,d.firstName,d.lastName from accident as a join policeReport as b on a.accident_id=b.accident_id join  hospital as c on b.hospital_id=c.hid join users as d on a.accepted_uid=d.uid where b.police_id='${hid}' and police_closed=0`);
                console.log(result.recordset);
                return result.recordset;
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        policeAccidentDetails:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select b.firstName,b.lastName,b.phone,b.vehicleNumber,convert(varchar,a.timestamp,120) as time,a.latitude,a.longitude,c.description from accident as a inner join users as b on a.accepted_uid=b.uid inner join policeReport as c on a.accident_id=c.accident_id
                where a.accident_id='${accId}'`);
                console.log(result.recordset);
                return result.recordset;
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        patientDetails:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select * from patient where accident_id='${accId}'`)
                return result.recordset;
            }
            catch(error:any){
                console.log(error.message);
            }
        },
        addFaultDriver:async(firstName:string,lastName:string,sex:string,age:number,phone:number,dlNo:string,vhNo:string,accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`insert into faultDriver (firstName,lastName,sex,age,phone,dlNo,vhNo,accident_id) values ('${firstName}','${lastName}','${sex}','${age}','${phone}','${dlNo}','${vhNo}','${accId}')`);
                console.log(result);
                
                return result;
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        policeComplete:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update accident set police_closed='1' where accident_id='${accId}'`);
                return result;
            }
            catch(error:any){

            }
        },

        policeRead:async(accId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update accident set police_read='1' where accident_id='${accId}'`);
                return result;
            }
            catch(error:any){

            }
        }

    }
}
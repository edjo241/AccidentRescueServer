let sql=require('mssql');
let aync=require('async');
const turf = require('@turf/turf');
import { loadConfig } from "../config";
const geolib = require('geolib');
let config=loadConfig();
const {sendMessage}=require('../websocket.ts');
const web = require('ws');

const ws=new web('ws://192.168.0.163:8080')
export interface AccidentRepository{
    accidentReport:(latitude:Number,longitude:Number,uid:Number)=>any,
    accidentFetch:(acc_id:number)=>any,
    accidentAccept:(acc_id:number,uid:number)=>any,
    hospitalFetch:()=>any,
    nearbyHospital:(hid:number,accId:number,distance:number)=>any,
    hospitalAccept:(accId:number,hid:number)=>any,
   
}

export const createAccidentRepository=():AccidentRepository=>{
    return{
        accidentReport:async(latitude:Number,longitude:Number,uid:Number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`insert into accident (uid,latitude,longitude,timestamp) values ('${uid}','${latitude}','${longitude}',GETDATE())`);
                let send=await pool.request().query(`select top 1 * from accident order by timestamp desc`)
                // console.log("db data"+send.recordset[0]);
                async function myFunction() {
                    console.log('This function was triggered after 30 seconds');
                    let nearby=await pool.request().query(`select uid from nearbyUser where [accident-id]='${send.recordset[0].accident_id}'`);
                    console.log("Length ",nearby.recordset.length);
                    
                    if(nearby.recordset.length==0){
                        // wss.clients.forEach(function each(client:any){
                        //     if(client.readyState===web.OPEN){
                        //         client.send("hi" )
                        //     }
                        // })
                        // sendMessage(ws,'helloooooooo');
                        const messageObject={
                            id:send.recordset[0].accident_id,
                            acc_latitude:latitude,
                            acc_longitude:longitude
                          }
                          ws.send(JSON.stringify(messageObject
                            ) )
                    }
                    console.log("is there any nearby: ",nearby);
                    
                  }
                  
                  setTimeout(myFunction, 30000);
                
                return send.recordset[0].accident_id;
            }
            catch(error:any){
                console.log(error.message);
                
            }
           
              
        },
        accidentFetch:async(acc_id:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result1=await pool.request().query(`select * from accident where accident_id='${acc_id}'`);
                let result3=await pool.request().query(`select convert(varchar,timestamp,120) as time from accident where accident_id='${acc_id}'`);
                console.log(result3);
                
                let result2=await pool.request().query(`select * from users where uid in (select uid from accident where accident_id='${acc_id}')`);
                

                let result={
                    acc_id:result1.recordset[0].accident_id,
                    reporter:result2.recordset[0].firstName,
                    time:result3.recordset[0].time,
                    reporter_phone:result2.recordset[0].phone,
                    latitude:result1.recordset[0].latitude,
                    longitude:result1.recordset[0].longitude
                }
                
                return result;
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        accidentAccept:async(acc_id:number,uid:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update accident set is_accepted='1',accepted_uid='${uid}' where accident_id='${acc_id}' and is_accepted='0'`);
                return result
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },

        // hospital

        hospitalFetch:async()=>{
            let pool=await sql.connect(config.dbConfig.connectionString);
            let result=await pool.request().query(`select hid,latitude,longitude from hospital where role='hospital'`);
            console.log(result);
            return result;
            
        },
        nearbyHospital:async(hid:number,accId:number,distance:number)=>{
            let pool=await sql.connect(config.dbConfig.connectionString);
            let result=await pool.request().query(`insert into nearbyHospital (hid,accId,distance) values ('${hid}','${accId}','${distance}')`);
            console.log(result);
            
            return result;
        },
        hospitalAccept:async(accId:number,hid:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update accident set hospital_id='${hid}' where accident_id='${accId}'`);
                
                return result;
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },

        
        
    }
}
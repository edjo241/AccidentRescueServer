let sql=require('mssql');
let async=require('async');
import { loadConfig } from "../config";
import {users} from '../types/user'
let config = loadConfig();
export interface RegistrationRepository{
    SaveUser: (user:users) => any;
    GetUser : ()=> any;
    updateToken:(uid:number,pushToken:string)=>any;
    SaveHospital:(name:string,type:string,latitude:number,longitude:number,email:string,password:string,role:string,police_id:number)=>any,
    SavePolice:(name:string,latitude:number,longitude:number,email:string,password:string,role:string)=>any,
}
export const createRegistrationRepository = (): RegistrationRepository => {
    return{
        SaveUser: async (user:users) =>{
            try{
                 let pool = await sql.connect(config.dbConfig.connectionString);
                 let query = await pool.request().query(`insert into users (firstName,lastName,pwd,phone,vehicleNumber) values ('${user.firstName}','${user.lastName}','${user.pwd}','${user.phone}','${user.vehicleNumber}')`);
                 let result=await pool.request().query(`select * from users where firstName='${user.firstName}'`)
                //  return result.recordset;
                if(result.recordset.length){
                    const {user} = {
                        user:{
                            uid : result.recordset[0].uid,
                            firstName: result.recordset[0].firstName                    
        
                        }
                    };
                // userDetail.uid=result.recordset[0].uid;
                // userDetail.firstName="qwerty";
                //result.recordset[0].firstName;
                return user;
            }
            else{
                let error="registration unsucessfull";
                return error;
            }
            }
            catch (error : any){
                console.log(error.message);

            }
        },
        GetUser : async()=>{
            try{
                let pool = await sql.connect(config.dbConfig.connectionString);
                let result = await pool.request().query("select * from users");
                console.log("repo");
                return result.recordset;
           }
           catch (error : any){
               console.log(error.message);

           }
        },
        updateToken:async(uid:number,pushToken:string)=>{
            let pool=await sql.connect(config.dbConfig.connectionString);
            let result=await pool.request().query(`update users set push_token='${pushToken}' where uid='${uid}'`);
            console.log("push token updation",result);
            return result;
            

        },

        SaveHospital:async(name:string,type:string,latitude:number,longitude:number,email:string,password:string,role:string,police_id:number)=>{
            try{

                let pool=await sql.connect(config.dbConfig.connectionString);
                let query=await pool.request().query(`insert into hospital (name,type,latitude,longitude,email,password,role,police_id) values('${name}','${type}','${latitude}','${longitude}','${email}','${password}','${role}','${police_id}')`);
                let result=await pool.request().query(`select * from hospital where email='${email}'`)
    
                if(result.recordset.length){
                    const {user} = {
                        user:{
                            hid : result.recordset[0].hid,
                            name: result.recordset[0].name,
                            role:result.recordset[0].role,
                                             
        
                        }
                    };
           
                return user;
            }
            else{
                let error="registration unsucessfull";
                return error;
            }
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        SavePolice:async(name:string,latitude:number,longitude:number,email:string,password:string,role:string)=>{
            try{

                let pool=await sql.connect(config.dbConfig.connectionString);
                let query=await pool.request().query(`insert into hospital (name,latitude,longitude,email,password,role) values('${name}','${latitude}','${longitude}','${email}','${password}','${role}')`);
                let result=await pool.request().query(`select * from hospital where email='${email}'`)
    
                if(result.recordset.length){
                    const {user} = {
                        user:{
                            hid : result.recordset[0].hid,
                            name: result.recordset[0].name,
                            role:result.recordset[0].role,
                                             
        
                        }
                    };
           
                return user;
            }
            else{
                let error="registration unsucessfull";
                return error;
            }
            }
            catch(error:any){
                console.log(error.message);
                
            }
        }

    };
}
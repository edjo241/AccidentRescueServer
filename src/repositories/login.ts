
let sql=require("mssql");
let async=require('async');
import {loadConfig} from '../config'
let config=loadConfig();

export interface LoginRepository{
    login:(phone:Number,password:string)=>any,
    websiteLogin:(email:string,password:string)=>any,
}

export const createLoginRepository=():LoginRepository=>{
    return{
        login:async(phone:Number,password:string)=>{
            
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select * from users where phone='${phone}' and pwd='${password}'`);
                console.log(result);
                
                
                // userdetails for login

               
                
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
                let error="login unsucessfull";
                return error;
            }
                
               
                
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        websiteLogin:async(email:string,password:string)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select * from hospital where email='${email}' and password='${password}'`);
                console.log(result.recordset[0].hid);
                
                
                // userdetails for login

                if(result.recordset.length){

                        if(result.recordset[0].role=='hospital'){
                            const {user} = {
                                user:{
                                    hid :result.recordset[0].hid,
                                    name:result.recordset[0].name,
                                    role:result.recordset[0].role,
                                    policeId:result.recordset[0].police_id                  
                
                                }
                            };
                            return user;

                        }
                        else{
                            const {user} = {
                                user:{
                                    hid :result.recordset[0].hid,
                                    name:result.recordset[0].name,
                                    role:result.recordset[0].role,
                
                                }
                            };
                            return user;
                        }
  
                }
                else{
                    let error="login unsucessfull";
                    return error;
                }
                
               
                
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        }
    }
}
let sql=require('mssql');
let async=require('async');
import { loadConfig } from '../config'
let config=loadConfig()

export interface NearbyRepository{
    nearbyReport:(latitude:number,longitude:number,uid:number,accidentId:number)=>any,
    hospitalList:(acc_id:number)=>any
}

export const createNearbyRepository=():NearbyRepository=>{
    return{
        nearbyReport:async(latitude:number,longitude:number,uid:number,accidentId:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`update users set location=geography::Point(${latitude},${longitude},4326) where uid=${uid}`)
                let result2= await pool.request().query(`insert into nearbyUser (uid,[accident-id]) values('${uid}','${accidentId}')`);

                //finding push token of nearby users

                // let result3=await pool.request().query(`select push_token from users where uid in (select uid from nearbyUser where [accident-id]='${accidentId}')`);
                let result3=await pool.request().query(`select push_token from users where uid =${uid}`);
                
                // storing push tokens in array
                let  pushArray : string[] =[];
                result3.recordset.forEach((item:any) => {
                    pushArray.push(item.push_token);
                });

                return pushArray;
                
            }
            catch(error:any){
                console.log(error.message);
                
            }
        },
        hospitalList:async(acc_id:number)=>{
            try{
                let pool=await sql.connect(config.dbConfig.connectionString);
                let result=await pool.request().query(`select * from hospital where hid in (select hid from nearbyHospital where accId='${acc_id}' )`);
                // console.log(result.recordset);
                
                let hospitalId=result.recordset.map((item:any)=>item.hid)
                // let result2=await pool.request().query(`select distance from nearbyHospital where hid='${item.hid}' and accId='${acc_id}'`)
                let result2=await pool.request().query(`select accId,distance,hid from nearbyHospital where hid in (${hospitalId})`);
                // console.log(result2.recordset);
                const send= result.recordset.map((item:any)=>{
                    
                    
                    const distance=result2.recordset.filter((item2:any)=>item2.accId==acc_id && item2.hid==item.hid
                     );
                    return{
                        ...item,
                        distance:distance[0].distance
                    }
                })
                // console.log("send",send);
                
                // console.log(hospitalId);
                // let array=result.recordset
                // let modified = array.map(async(item:any)=>{
                //     return{
                //         ...item,
                //         distance:result2.recordset[0].distance
                //     }
                //     // console.log(item);  
                // })

                //     console.log("nearby hospital",modified);
                    
                    return send;

        

            }
            catch(error:any){
                console.log(error.message);
                
            }
        }
    }
}
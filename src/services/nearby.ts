import { RequestHandler } from "express";
import { NearbyRepository } from "../repositories/nearby";
import { sendNotification } from "../notification";

let accidentLatitude:number;
let accidentLongitude:number;
let accident_id:number=-1;
let accidentUserid:number;

export interface NearbyService{
    nearbyReport:(latitude:number,longitude:number,uid:number,accId:number)=>any,
    hospitalList:(acc_id:number)=>any
    // accidentData:(latitude:number,longitude:number,uid:number,accidentId:number)=>any
}

export const createNearbyService=(nearbyRepository:NearbyRepository)=>{
    return{
        // accidentData:(latitude:number,longitude:number,uid:number,accidentId:number)=>{
        //     accidentLatitude=latitude;
        //     accidentLongitude=longitude;
        //     accident_id= accidentId;
        //     accidentUserid=uid;

        //     console.log(accidentLatitude,accidentLongitude,accident_id);
            
        // },
        nearbyReport:async(latitude:number,longitude:number,uid:number,accId:number)=>{

            // console.log("accident details "+latitude,longitude,accidentLatitude,accidentLongitude);
            

            // let isNearby:boolean=false;
            // // if not the same user checking if user is nearby
            // if(accidentUserid!=uid){
                
            //     compareLoc(accidentLatitude,accidentLongitude,latitude,longitude)
            // }
           

            // // finding nearby user

            // function compareLoc(accidentLatitude:number, accidentLongitude:number, userLat:number, userLong:number) {
            //     //function to compare and find nearby users
            //     const R = 6371; // Radius of the earth in km
            //     const dLat = deg2rad(userLat - accidentLatitude);
            //     const dLon = deg2rad(userLong - accidentLongitude);
            //     const a = //Haversine Formula
            //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            //       Math.cos(deg2rad(accidentLatitude)) *
            //         Math.cos(deg2rad(userLat)) *
            //         Math.sin(dLon / 2) *
            //         Math.sin(dLon / 2);
            //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            //     const d = R * c; // Distance in km
            //     // return d;
            
            //     const radius = 2; // check if the user is in 5KM
            //     if (d <= radius) {
            //         console.log("It is a match");

            //         isNearby=true;
            //     }
            //     else console.log("It is not a match");
            //   }
            
            //   function deg2rad(deg:number) {
            //     // converting lat,long values to radian

            //     return deg * (Math.PI / 180);
            //   }
            //   console.log("accident id "+accident_id);
              
            const result=await nearbyRepository.nearbyReport(latitude,longitude,uid,accId)
            console.log("nerby");
            
            console.log("repo",accId);
            

            // calling notification function
            sendNotification(result,accId);
        },
        hospitalList:async(acc_id:number)=>{
            const result=await nearbyRepository.hospitalList(acc_id);
            return result;
        }
    }
}
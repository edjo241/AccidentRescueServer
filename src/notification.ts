const admin = require('firebase-admin');
const serviceAccount = require('./notification-accidentrescue-firebase-adminsdk-fhy4z-cfee406429.json'); 
export function sendNotification(pushToken:any,accId:number){
  console.log("Notification",accId);
  

    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount),
    //     databaseURL: "https://notification-accidentrescue.firebaseio.com",
    //     projectId:"notification-accidentrescue"
    //   });
    
    
      const message = {
        notification: {
          title: 'ACCIDENT',
          body: 'An accident has happend near you ATTEND IT!',  
        },
        data: {
          title:'ACCIDENT',
          body:'An accident occured',
          accident_id:`${accId}`,
          // notifee: JSON.stringify({
          //   body: 'This message was sent via FCM!',
          //   android: {
          //     channelId: 'default',
          //     actions: [
          //       {
          //         title: 'Mark as Read',
          //         pressAction: {
          //           id: 'read',
          //         },
          //       },
          //     ],
          //   },
          // }),
        },

        android:{
            notification:{
                sound:'default',
                channel_id: 'default',
                priority:'high',
               
            },
           
        },

        tokens:pushToken
      };    
    
      admin
      .messaging()
      .sendMulticast(message)
      .then((response:any) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error:any) => {
        console.log('Error sending message:', error);
      });
     let token='fY9n_WHWTkSpXUIi5GDOrD:APA91bGKD4NP7W25r1O_pJsP2OcUoMa0kr00Prtink6crqeECE9FeL0zznXQld87MQn7Mmz3GchItFdwJSfC2Kt1JJ_7PWJfoaqks--fDfT_g0OcFuoUGzcHxpVI-sEfU9zsf-vCm1VK'

console.log("Notification reached");

      // admin.messaging().sendMulticast({
      //   tokens:token,
      //   data: {
      //     notifee: JSON.stringify({
      //       body: 'This message was sent via FCM!',
      //       android: {
      //         channelId: 'default',
      //         actions: [
      //           {
      //             title: 'Mark as Read',
      //             pressAction: {
      //               id: 'read',
      //             },
      //           },
      //         ],
      //       },
      //     }),
      //   },
      // });

}

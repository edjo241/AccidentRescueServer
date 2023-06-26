"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const admin = require('firebase-admin');
const serviceAccount = require('./notification-accidentrescue-firebase-adminsdk-fhy4z-cfee406429.json');
function sendNotification(pushToken, accId) {
    console.log("Notification", accId);
    const message = {
        notification: {
            title: 'ACCIDENT',
            body: 'An accident has happend near you ATTEND IT!',
        },
        data: {
            title: 'ACCIDENT',
            body: 'An accident occured',
            accident_id: `${accId}`,
        },
        android: {
            notification: {
                sound: 'default',
                channel_id: 'default',
                priority: 'high',
            },
        },
        tokens: pushToken
    };
    admin
        .messaging()
        .sendMulticast(message)
        .then((response) => {
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
    let token = 'fY9n_WHWTkSpXUIi5GDOrD:APA91bGKD4NP7W25r1O_pJsP2OcUoMa0kr00Prtink6crqeECE9FeL0zznXQld87MQn7Mmz3GchItFdwJSfC2Kt1JJ_7PWJfoaqks--fDfT_g0OcFuoUGzcHxpVI-sEfU9zsf-vCm1VK';
    console.log("Notification reached");
}
exports.sendNotification = sendNotification;

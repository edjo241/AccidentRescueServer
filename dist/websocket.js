"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketFunction = void 0;
const web = require('ws');
const websocketFunction = () => {
    const wss = new web.Server({ port: 8080 });
    const clients = [];
    wss.on('connection', (ws) => {
        console.log('Client connected ');
        clients.push(ws);
        ws.on('message', (message) => {
            let data = JSON.parse(message);
            console.log("type of message " + typeof data);
            console.log(`Received message: ${message}`);
            wss.clients.forEach(function each(client) {
                if (client.readyState === web.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        });
        ws.on('close', () => {
            console.log('Client disconnected');
            const index = clients.indexOf(ws);
            if (index > -1) {
                clients.splice(index, 1);
            }
        });
        function sendMessage(ws, message) {
            ws.send(message);
        }
        module.exports = {
            sendMessage: sendMessage
        };
    });
    ;
};
exports.websocketFunction = websocketFunction;

const web = require('ws');
 export const websocketFunction=()=>{
  const wss = new web.Server({ port: 8080 });
    const clients:any = [];
    wss.on('connection', (ws:any) => {
      console.log('Client connected ');
      clients.push(ws);
      
      
    
      ws.on('message', (message:any) => {
        let data=JSON.parse(message)
        console.log("type of message "+typeof data);
        
        console.log(`Received message: ${message}`);
        
            // Send the message back to the client
        wss.clients.forEach(function each(client:any){
            if(client.readyState===web.OPEN){
                client.send(JSON.stringify(data) )
            }
        })
           
      
     
      });
      
    
      ws.on('close', () => {
        console.log('Client disconnected');

        const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
      });
      function sendMessage(ws:any,message:any){
        ws.send(message)
      }
      
      module.exports={
        sendMessage:sendMessage
      }


    });
    ;
}



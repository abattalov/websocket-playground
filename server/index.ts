import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080});

wss.on("connection", function connection(ws){
    ws.on("error", console.error);

    ws.on('message', function message(data, isBinary){
        const parsed = JSON.parse(data.toString());

        console.log("Message type:", parsed.type);
        console.log("Message text:", parsed.text);

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN){
                client.send(data, {binary: isBinary});
            }
        })
        console.log(`received: %s`, data);
    });

    console.log('Client Connected');

    ws.on("close", () => {
        console.log("Client disconnected");
    })
})
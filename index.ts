"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { randomUUID } = require("crypto");
const { Socket } = require("dgram");
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8080 });

wss.on('connection', function (ws) {
    console.log('Client connected');
    ws.on('message', function (message) {
        const event =JSON.parse((message));

        const sockets = {}
        if(event.type=='join'){
            sockets[randomUUID()]=event.payload
        }
        console.log(sockets);
        
        
        
   
    });
});
console.log('WebSocket server listening on port 8080');

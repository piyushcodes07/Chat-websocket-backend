"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { randomUUID } = require("crypto");
const { Socket } = require("dgram");
const { PassThrough } = require("stream");
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8080 });

const sockets = {};
wss.on("connection", function (ws) {
  console.log("Client connected");
  ws.on("message", function (message) {
    const event = JSON.parse(message);

    if (event.type == "join") {
      sockets[randomUUID()] = { payload: event.payload, ws };
    }
    console.log(Object.keys(sockets).length);

    if (event.type == "message") {
        let roomID = event.payload.roomID
        let message = event.payload.message

        Object.keys(sockets).forEach((index)=>{
            if(sockets[index].payload.roomID==roomID){
                sockets[index].ws.send(message)

            }else{  
                //
            }
        })
    }
  });
});
console.log("WebSocket server listening on port 8080");

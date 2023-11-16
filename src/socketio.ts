// socketio.ts

import { Server, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import express from "express";
export interface ServerToClientEvents {
  serverMsg: (data: { msg: string; room: string }) => void;
}

export interface ClientToServerEvents {
  clientMsg: (data: { msg: string; room: string }) => void;
}

const app = express();
const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: ["http://localhost:4000"],
  },
});

io.on(
  "connection",
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("clientMsg", (data) => {
      console.log(data);
      if (data.room === "") {
        io.sockets.emit("serverMsg", data);
      } else {
        socket.join(data.room);
        io.to(data.room).emit("serverMsg", data);
      }
    });
  }
);

export { io, httpServer };

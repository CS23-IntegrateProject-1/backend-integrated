import { Server, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import express from "express";
import loadEnv from "./configs/dotenvConfig";

loadEnv();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.SOCKET_URL || "http://localhost:4000"],
  },
});

type Client = {
  sockId: string;
  userId: string;
};

const connectedClients: Array<Client> = [];

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  const id = socket.handshake.query.id as string;
  console.log("id", id);
  socket.join(id);
  
  connectedClients.push({ sockId: socket.id, userId: socket.handshake.query.id as string });
  
  console.log("connectedClients", connectedClients)

  socket.on("send-message", ({ recipients, text }) => {
    console.log("recipient", recipients, "and", "text", text)
    
    recipients.forEach((recipient: string) => {
      const newRecipients = recipients.filter(
        (r: string) => r !== recipient
      );

      newRecipients.push(id);
      console.log("newRecipients", newRecipients)

      // socket.on("receive-message", (data) => {
      // console.log("receive-message", data)
      // socket.to(socket.id).emit("receive-message", {
      //   recipients: newRecipients,
      //   sender: id,
      // text})
      
        // socket.broadcast.to(recipient).emit("receive-message", {
        //   recipients: newRecipients,
        //   sender: id,
        //   text,
        // });
      // })'

      // connectedClients.filter((client) => {
      //   client.userId === id
      // })
      
       
      connectedClients.forEach((client) => {
        io.to(client.sockId).emit('receive-message', { recipients: newRecipients, sender: client.userId, text });
        console.log("client", client.sockId, "and", "text", text, "and", "recipients", recipients,  "and", "sender", id)
      });


    });
  })

  socket.on("join-room", ({ roomKey, userId }) => {
    socket.join(roomKey);
    console.log("join room", roomKey, userId)
  })
});

export { httpServer, io };
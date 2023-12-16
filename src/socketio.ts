import { Server, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import express from "express";
import loadEnv from "./configs/dotenvConfig";
import { PrismaClient } from "@prisma/client";
const feature12Client = new PrismaClient();

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

interface Recipient {
  id: string;
  name: string;
}

const connectedClients: Array<Client> = [];

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  const id = socket.handshake.query.id as string;
  console.log("id", id);
  
  connectedClients.push({
    sockId: socket.id,
    userId: socket.handshake.query.id as string,
  });
  
  console.log("connectedClients", connectedClients);
  socket.join("1");
  console.log(id + "join room 1");

  socket.on("join-room", (recipients) => {
    console.log("recipients", recipients);
    recipients.forEach((recipient: Recipient) => {
      socket.join("1");
      console.log(recipient.id + "Join Room 1");
    });
  });

  socket.on("send-message", async ({ recipients, text }) => {
    console.log("recipient", recipients, "and", "text", text);

    try {
      // Insert this text message into Prisma DB along with the sender, recipients, and timestamp
      await feature12Client.message.create({
        data: {
          roomId: 1,
          userId: recipients,
          message: text,
          date_time: new Date(),
        },
      });

      // Broadcast to all clients in room A without sender
      recipients.forEach((recipient: string) => {
        // Check if the recipient is yourself
        if (recipient === id) {
          // Do nothing
        } else {
          socket.broadcast.to("1").emit("receive-message", {
            recipients: recipients,
            sender: id,
            text,
          });
        }
      });
    } catch (error) {
      console.error("Error storing message in the database:", error);
    }
  });

});

export { httpServer, io };



// import { Server, Socket } from "socket.io";
// import { createServer, Server as HttpServer } from "http";
// import express from "express";
// import loadEnv from "./configs/dotenvConfig";

// loadEnv();

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: [process.env.SOCKET_URL || "http://localhost:4000"],
//   },
// });

// type Client = {
//   sockId: string;
//   userId: string;
// };

// const connectedClients: Array<Client> = [];

// io.on("connection", (socket) => {
//   console.log(`Socket connected: ${socket.id}`);
//   const id = socket.handshake.query.id as string;
//   console.log("id", id);
//   socket.join(id);
  
//   connectedClients.push({ sockId: socket.id, userId: socket.handshake.query.id as string });
  
//   console.log("connectedClients", connectedClients)

//   socket.on("send-message", ({ recipients, text }) => {
//     console.log("recipient", recipients, "and", "text", text)
    
//     recipients.forEach((recipient: string) => {
//       const newRecipients = recipients.filter(
//         (r: string) => r !== recipient
//       );

//       newRecipients.push(id);
//       console.log("newRecipients", newRecipients)

//       // socket.on("receive-message", (data) => {
//       // console.log("receive-message", data)
//       // socket.to(socket.id).emit("receive-message", {
//       //   recipients: newRecipients,
//       //   sender: id,
//       // text})
      
//         // socket.broadcast.to(recipient).emit("receive-message", {
//         //   recipients: newRecipients,
//         //   sender: id,
//         //   text,
//         // });
//       // })'

//       // connectedClients.filter((client) => {
//       //   client.userId === id
//       // })
      
       
//       connectedClients.forEach((client) => {
//         io.to(client.sockId).emit('receive-message', { recipients: newRecipients, sender: client.userId, text });
//         console.log("client", client.sockId, "and", "text", text, "and", "recipients", recipients,  "and", "sender", id)
//       });


//     });
//   })

//   socket.on("join-room", ({ roomKey, userId }) => {
//     socket.join(roomKey);
//     console.log("join room", roomKey, userId)
//   })
// });

// export { httpServer, io };
import { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import configureCors from "./configs/corsConfig";
import loadEnv from "./configs/dotenvConfig";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import addressTracker from "./middlewares/addressTracker";
import Routes from "./routes";
import express from "express";
import { createServer } from "http";
import cors from "cors";

loadEnv();

const app = express();

// Error handling middleware (should be placed after your routes)
app.use(errorHandler);
app.use(addressTracker);
app.use(cors(configureCors()));
app.use(express.json());
app.use(cookieParser());


app.use(cors());
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: ["http://localhost:4000"],
  },
});
 interface ServerToClientEvents {
   serverMsg: (data: { msg: string; room: string }) => void;
   joinRoom: (room: string, cb: (message: string) => void) => void;
 }

 interface ClientToServerEvents {
   clientMsg: (data: { msg: string; room: string }) => void;
   joinRoom: (room: string, cb: (message: string) => void) => void;
 }
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

const routes = new Routes(app);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express with TypeScript!");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


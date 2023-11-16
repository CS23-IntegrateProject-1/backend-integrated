// index.ts

import express, { Request, Response } from "express";
import cors from "cors";
import configureCors from "./configs/corsConfig";
import loadEnv from "./configs/dotenvConfig";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import addressTracker from "./middlewares/addressTracker";
import { httpServer, io } from "./socketio"; // Import the exported io and httpServer

loadEnv();

const app = express();

app.use(errorHandler);
app.use(cors(configureCors()));
app.use(express.json());
app.use(cookieParser());
app.use(addressTracker);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Use your routes as needed

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

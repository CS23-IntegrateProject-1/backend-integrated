import express, { Request, Response } from "express";
import cors from "cors";
import configureCors from "./configs/corsConfig";
import loadEnv from "./configs/dotenvConfig";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import addressTracker from "./middlewares/addressTracker";
import { AuthRoutes } from "./routes/auth.routes";
import Feature1Routes from "./routes/feature1.routes";
import Feature3Routes from "./routes/feature3.routes";
import Feature4Routes from "./routes/feature4.routes";
import Feature5Routes from "./routes/feature5.routes";
import Feature6Routes from "./routes/feature6.routes";
import Feature7Routes from "./routes/feature7.routes";
import Feature8Routes from "./routes/feature8.routes";
import Feature10Routes from "./routes/feature10.routes";
import Feature11Routes from "./routes/feature11.routes";
import Feature12Routes from "./routes/feature12.routes";
import Feature14Routes from "./routes/feature14.routes";

import { httpServer as socketIoServer } from "./socketio";
import path from "path";
import MIKAPIRouter from "./routes/MIKAPI.routes";

loadEnv();

const app = express();

// Error handling middleware (should be placed after your routes)
app.use(errorHandler);
app.use(cors(configureCors()));
app.use(express.json());
app.use(cookieParser());
app.use(addressTracker);

// const routes = new Routes(app);

const port = process.env.PORT || 8080;
const socketIoPort = process.env.SOCKET_IO_PORT || 8000;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, Express with TypeScript!");
});

app.use("/api/mik", MIKAPIRouter);
app.use("/auth", AuthRoutes);
app.use("/feature1", Feature1Routes);
app.use("/feature3", Feature3Routes);
app.use("/feature4", Feature4Routes);
app.use("/feature5", Feature5Routes);
app.use("/feature6", Feature6Routes);
app.use("/feature7", Feature7Routes);
app.use("/feature8", Feature8Routes);
app.use("/feature10", Feature10Routes);
app.use("/feature11", Feature11Routes);
app.use("/feature12", Feature12Routes);
app.use("/feature14", Feature14Routes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
	console.log(`AppServer \tis running on port ${port}`);
});
socketIoServer.listen(socketIoPort, () => {
	console.log(`SocketIOServer \tis running on port ${socketIoPort}`);
});
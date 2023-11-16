// index.ts

import express, { Request, Response, request } from "express";
import cors from "cors";
import configureCors from "./configs/corsConfig";
import loadEnv from "./configs/dotenvConfig";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import addressTracker from "./middlewares/addressTracker";
import { Auth{ httpServer, io } } from "./routes/auth.routes";
import Feature1Routes from "./routes/feature1.routes";
import Feature3Routes from "./routes/feature3.routes";
import Feature4Routes from "./routes/feature4.routes";
import Feature5Routes from "./routes/feature5.routes";
import Feature6Routes from "./routes/feature6.routes";
import Feature7Routes from "./routes/feature7.routes";
import Feature8Routes from "./routes/feature8.routes";
import Feature9Routes from "./routes/feature9.routes";
import Feature10Routes from "./routes/feature10.routes";
import Feature11Routes from "./routes/feature11.routes";
import Feature12Routes from "./routes/feature12.routes";
import Feature13Routes from "./routes/feature13.routes";
import Feature14Routes from "./routes/feature14.socketio"; // Import the exported io and httpServer

loadEnv();

const app = express();

app.use(errorHandler);
app.use(cors(configureCors()));
app.use(express.json());
app.use(cookieParser());

const routes = new Routes(app);

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express with TypeScript!");
});

app.use("/auth", AuthRoutes);
app.use("/feature1", Feature1Routes);
app.use("/feature3", Feature3Routes);
app.use("/feature4", Feature4Routes);
app.use("/feature5", Feature5Routes);
app.use("/feature6", Feature6Routes);
app.use("/feature7", Feature7Routes);
app.use("/feature8", Feature8Routes);
app.use("/feature9", Feature9Routes);
app.use("/feature10", Feature10Routes);
app.use("/feature11", Feature11Routes);
app.use("/feature12", Feature12Routes);
app.use("/feature13", Feature13Routes);
app.use("/feature14", Feature14Routes);


// Use your routes as needed

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

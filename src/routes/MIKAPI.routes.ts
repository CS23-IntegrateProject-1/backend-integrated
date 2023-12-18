import { Router } from "express";
import { ApiConnection, ApiReserve } from "../controllers/MIKAPI.controller";
const MIKAPIRouter = Router();

MIKAPIRouter.get("/test", ApiConnection);
MIKAPIRouter.post("/reserve", ApiReserve);



export default MIKAPIRouter;
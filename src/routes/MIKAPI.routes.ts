import { Router } from "express";
import { ApiConfirmReserve, ApiConnection, ApiReserve } from "../controllers/MIKAPI.controller";
const MIKAPIRouter = Router();

MIKAPIRouter.get("/test", ApiConnection);
MIKAPIRouter.post("/reserve", ApiReserve);
MIKAPIRouter.patch("/confirm", ApiConfirmReserve);



export default MIKAPIRouter;

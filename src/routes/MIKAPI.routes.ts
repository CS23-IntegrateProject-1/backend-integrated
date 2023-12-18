import { Router } from "express";
import { ApiCheckOut, ApiConfirmReserve, ApiConnection, ApiReserve } from "../controllers/MIKAPI.controller";
const MIKAPIRouter = Router();

MIKAPIRouter.get("/test", ApiConnection);
MIKAPIRouter.post("/reserve", ApiReserve);
MIKAPIRouter.patch("/confirm", ApiConfirmReserve);
MIKAPIRouter.patch("/checkout", ApiCheckOut);



export default MIKAPIRouter;

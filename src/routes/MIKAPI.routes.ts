import { Router } from "express";
import { ApiCheckOut, ApiConfirmReserve, ApiConnection, ApiReserve, checkInStatus_MIK } from "../controllers/MIKAPI.controller";
const MIKAPIRouter = Router();

MIKAPIRouter.get("/test", ApiConnection);
MIKAPIRouter.post("/reserve", ApiReserve);
MIKAPIRouter.patch("/confirm", ApiConfirmReserve);
MIKAPIRouter.patch("/checkout", ApiCheckOut);
MIKAPIRouter.get("/checkInStatus/:reservationId", checkInStatus_MIK);



export default MIKAPIRouter;

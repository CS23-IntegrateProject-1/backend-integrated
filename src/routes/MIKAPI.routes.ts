import { Router } from "express";
import { ApiConnection } from "../controllers/MIKAPI.controller";
const MIKAPIRouter = Router();

MIKAPIRouter.get("/test", ApiConnection);

export default MIKAPIRouter;
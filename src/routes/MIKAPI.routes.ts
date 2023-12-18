import { Router } from "express";
import { TestApiConnection } from "../controllers/mikAPI.controller";

const MIKAPIRouter = Router();

MIKAPIRouter.get("/test",TestApiConnection);

export default MIKAPIRouter;
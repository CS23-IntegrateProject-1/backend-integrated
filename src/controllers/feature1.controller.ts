import { Response, Request } from "express";

import { PromptPayController } from "./feature1/PromptPayController";
import GroupController from "./feature1/GroupController";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export const getfeature1 = async (req: Request, res: Response) => {
  return res.json({});
};

export const promptPayHandler = async (req: Request, res: Response) => {
  switch (req.method) {
    case "PUT":
      return new PromptPayController().update(req, res);
    case "GET":
    default:
      return new PromptPayController().show(req, res);
  }
};

export const groupInfoHandler = async (req: Request, res: Response) => {
  return new GroupController().show(req, res);
};

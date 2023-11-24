import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";

import GroupRepository from "../../services/feature1/group.repository";
import GroupService, {
  IGroupService,
} from "../../services/feature1/group.service";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  makeGroupCreateWebResponse,
  makeGroupIndexWebResponse,
} from "./models/group.model";

export interface IGroupController {
  addGroup(req: Request, res: Response): unknown;

  index(req: Request, res: Response): unknown;

  create(req: Request, res: Response): unknown;
}

export default class GroupController implements IGroupController {
  private service: IGroupService = new GroupService(new GroupRepository());

  async create(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;
      const { group_name: groupName, members } = req.body;

      const groups = await this.service.createGroup(userId, groupName, members);

      const webResponse = makeGroupCreateWebResponse(groups);

      return res.status(200).json(webResponse);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }

      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }

  async index(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      const groups = await this.service.listGroupsOfUser(userId);

      const webResponse = makeGroupIndexWebResponse(groups);

      return res.status(200).json(webResponse);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }

      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }

  async addGroup(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    const { group_id } = req.body;

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      if (userId === group_id) {
        return res
          .status(409)
          .json(makeErrorResponse("Cannot add oneself as group"));
      }

      await this.service.addGroupById(userId, group_id);

      return res.status(200).send();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      } else if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res
            .status(409)
            .json(makeErrorResponse("Already group with user"))
            .send();
        }
      }

      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }
}

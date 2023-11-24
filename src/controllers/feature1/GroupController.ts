import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";

import GroupRepository from "../../services/feature1/group.repository";
import GroupService, {
  IGroupService,
} from "../../services/feature1/group.service";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import {
  makeGroupCreateWebResponse,
} from "./models/group.model";
import { PrismaClient } from "@prisma/client";

export interface IGroupController {
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

  // TODO @SoeThandarLwin: Refactor to follow proper structure later
  async index(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthrozied"));
    }

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;
      const client = new PrismaClient();
      const result = await client.group_user.findMany({
        where: {
          memberId: userId,
        },
        include: {
          group: true,
        },
      });

      client.$disconnect();

      const response = result.map((r) => {
        return {
          group_id: r.group.groupId,
          group_name: r.group.group_name,
        };
      });

      return res.status(200).json(response);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      }

      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }
}

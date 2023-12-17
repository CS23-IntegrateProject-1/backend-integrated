import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";

import GroupRepository from "../../services/feature1/group.repository";
import GroupService, {
  IGroupService,
} from "../../services/feature1/group.service";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import { makeGroupCreateWebResponse } from "./models/group.model";
import { prismaClient } from "../feature1.controller";

export interface IGroupController {
  index(req: Request, res: Response): unknown;

  create(req: Request, res: Response): unknown;
}

export default class GroupController implements IGroupController {
  private service: IGroupService = new GroupService(new GroupRepository());

  async create(req: Request, res: Response) {
    try {
      const { group_name: groupName, members } = req.body;
      let fileName: string|null;

      if (req['file']) {
        fileName = req['file'].filename;
      } else {
        fileName = null;
      }

      const groups = await this.service.createGroup(Number(req.params.userId), groupName, members.map((m: string) => Number(m)), fileName);

      const webResponse = makeGroupCreateWebResponse(groups);

      return res.status(200).json(webResponse);
    } catch (e) {
      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }

  // TODO @SoeThandarLwin: Refactor to follow proper structure later
  // TODO @SoeThandarLwin: Refactor to follow proper error checking and formatting later
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const groupId = Number(id);

    try {
      const result = await prismaClient.group.findFirst({
        where: {
          groupId,
        },
        include: {
          Group_user: {
            include: {
              member: {
                select: {
                  userId: true,
                  username: true,
                  profile_picture: true,
                },
              },
            },
          },
        },
      });

      if (!result) {
        return res.status(404).json(makeErrorResponse("Group does not exist"));
      }

      const response = {
        group_id: result.groupId,
        group_name: result.group_name,
        group_avatar: result.group_profile,
        members: result.Group_user.map((user) => ({
          user_id: user.member.userId,
          username: user.member.username,
          avatar: user.member.profile_picture,
        })),
      };

      return res.status(200).send(response);
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
    try {
      const result = await prismaClient.group_user.findMany({
        where: {
          memberId: Number(req.params.userId),
        },
        include: {
          group: true,
        },
      });

      const response = result.map((r) => {
        return {
          group_id: r.group.groupId,
          group_name: r.group.group_name,
          group_avatar: r.group.group_profile,
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

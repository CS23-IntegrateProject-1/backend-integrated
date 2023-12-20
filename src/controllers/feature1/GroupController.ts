import { Request, Response } from "express";

import { prismaClient } from "../feature1.controller";
import {
  MulterRequest,
  makeErrorResponse,
  makeGroupCreateWebResponse,
} from "./models";
import {
  GroupRepository,
  GroupService,
  IGroupService,
} from "../../services/feature1";
import { SECRET_IDENTIFIER } from "../../services/feature1/group.repository";

export interface IGroupController {
  index(req: Request, res: Response): unknown;

  create(req: Request, res: Response): unknown;
}

export default class GroupController implements IGroupController {
  private service: IGroupService = new GroupService(new GroupRepository());

  async create(req: Request, res: Response) {
    try {
      const { group_name: groupName, members, secret } = req.body;

      const filename = (req as MulterRequest)?.file?.filename ?? null;

      const groups = await this.service.createGroup(
        Number(req.params.userId),
        groupName,
        members.map((m: string) => Number(m)),
        filename,
        Boolean(secret),
      );

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
              User: {
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

      const isSecretGroup = result.group_name.endsWith(SECRET_IDENTIFIER);

      const response = {
        group_id: result.groupId,
        group_name: isSecretGroup
          ? result.group_name.replace(SECRET_IDENTIFIER, "")
          : result.group_name,
        group_avatar: result.group_profile,
        is_seceret_group: isSecretGroup,
        members: result.Group_user.map((user) => ({
          user_id: user.User.userId,
          username: user.User.username,
          avatar: user.User.profile_picture,
        })),
      };

      return res.status(200).send(response);
    } catch (e) {
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
          Group: true,
        },
      });

      const response = result.map((r) => {
        const isSecretGroup = r.Group.group_name.endsWith(SECRET_IDENTIFIER);

        return {
          group_id: r.Group.groupId,
          group_name: isSecretGroup
            ? r.Group.group_name.replace(SECRET_IDENTIFIER, "")
            : r.Group.group_name,
          group_avatar: r.Group.group_profile,
          is_secret_group: isSecretGroup,
        };
      });

      return res.status(200).json(response);
    } catch (e) {
      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }
}

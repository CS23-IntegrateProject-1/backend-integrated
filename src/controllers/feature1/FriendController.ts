import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";

import FriendRepository from "../../services/feature1/friend.repository";
import FriendService, {
  IFriendService,
} from "../../services/feature1/friend.service";
import { extractToken } from "./utils";
import { makeErrorResponse } from "./models/payment_method.model";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { makeFriendIndexWebResponse } from "./models/friend.model";

export interface IFriendController {
  addFriend(req: Request, res: Response): unknown;

  index(req: Request, res: Response): unknown;
}

export default class FriendController implements IFriendController {
  private service: IFriendService = new FriendService(new FriendRepository());

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

      const friends = await this.service.listFriendsOfUser(userId);

      const webResponse = makeFriendIndexWebResponse(friends);

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

  async addFriend(req: Request, res: Response) {
    let token: string;

    try {
      token = extractToken(req);
    } catch (e) {
      return res.status(401).json(makeErrorResponse("Unauthorized"));
    }

    const { friend_id } = req.body;

    try {
      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      const userId = (decoded as jwt.JwtPayload).userId;

      if (userId === friend_id) {
        return res
          .status(409)
          .json(makeErrorResponse("Cannot add oneself as friend"));
      }

      await this.service.addFriendById(userId, friend_id);

      return res.status(200).send();
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return res.status(401).json(makeErrorResponse("Invalid token"));
      } else if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res
            .status(409)
            .json(makeErrorResponse("Already friend with user"))
            .send();
        }
      }

      return res
        .status(500)
        .json(makeErrorResponse("Unknown Error Encountered"));
    }
  }
}

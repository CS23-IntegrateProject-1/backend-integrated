// import { Request, Response } from "express";

// import FriendRepository from "../../services/feature1/friend.repository";
// import FriendService, {
//   IFriendService,
// } from "../../services/feature1/friend.service";
// import { makeErrorResponse } from "./models/payment_method.model";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import { makeFriendIndexWebResponse } from "./models/friend.model";

// export interface IFriendController {
//   addFriend(req: Request, res: Response): unknown;

//   index(req: Request, res: Response): unknown;
// }

// export default class FriendController implements IFriendController {
//   private service: IFriendService = new FriendService(new FriendRepository());

//   async index(req: Request, res: Response) {
//     try {
//       const friends = await this.service.listFriendsOfUser(
//         Number(req.params.userId),
//       );

//       const webResponse = makeFriendIndexWebResponse(friends);

//       return res.status(200).json(webResponse);
//     } catch (e) {
//       return res
//         .status(500)
//         .json(makeErrorResponse("Unknown Error Encountered"));
//     }
//   }

//   async addFriend(req: Request, res: Response) {
//     const { friend_id } = req.body;

//     try {
//       if (Number(req.params.userId) === friend_id) {
//         return res
//           .status(409)
//           .json(makeErrorResponse("Cannot add oneself as friend"));
//       }

//       await this.service.addFriendById(Number(req.params.userId), friend_id);

//       return res.status(200).send();
//     } catch (e) {
//       console.log(e);
//       if (e instanceof PrismaClientKnownRequestError) {
//         if (e.code === "P2002") {
//           return res
//             .status(409)
//             .json(makeErrorResponse("Already friend with user"))
//             .send();
//         }
//       }

//       return res
//         .status(500)
//         .json(makeErrorResponse("Unknown Error Encountered"));
//     }
//   }
// }

<<<<<<< HEAD
import { Request, Response } from "express";
import { ProfileRepository } from "../../services/feature1/profile.repository";
import ProfileService, {
  IProfileService,
} from "../../services/feature1/profile.service";
import { makeErrorResponse } from "./models/payment_method.model";
import { z } from "zod";
import { MulterRequest } from "./GroupController";
=======
// import { Request, Response } from "express";
// import { ProfileRepository } from "../../services/feature1/profile.repository";
// import ProfileService, {
//   IProfileService,
// } from "../../services/feature1/profile.service";
// import { makeErrorResponse } from "./models/payment_method.model";
// import { z } from "zod";
>>>>>>> e27e607501bd440ab4bea090216b9d69b2ba9a62

// export interface IProfileController {
//   show(req: Request, res: Response): unknown;

//   update(req: Request, res: Response): unknown;
// }

// const ProfilePayload = z.object({
//   phone: z.string(),
//   email: z.string().email(),
//   birthday: z.string().datetime(),
//   gender: z.enum(["Male", "Female", "Others"]),
// });

// export default class ProfileController implements IProfileController {
//   private service: IProfileService = new ProfileService(
//     new ProfileRepository(),
//   );

<<<<<<< HEAD
  async update(req: Request, res: Response) {
    const profile = req.body;
    const filename = (req as MulterRequest)?.file?.filename ?? null;
=======
//   async update(req: Request, res: Response) {
//     const profile = req.body;
>>>>>>> e27e607501bd440ab4bea090216b9d69b2ba9a62

//     const result = await ProfilePayload.safeParseAsync(profile);

//     if (!result.success) {
//       return res.status(400).json(makeErrorResponse("Invalid request"));
//     }

<<<<<<< HEAD
    try {
      const response = await this.service.updateUserProfile(
        Number(req.params.userId),
        result.data,
        filename,
      );
=======
//     try {
//       const response = await this.service.updateUserProfile(
//         Number(req.params.userId),
//         result.data,
//       );
>>>>>>> e27e607501bd440ab4bea090216b9d69b2ba9a62

//       return res.json(response);
//     } catch (e) {
//       return res.status(404).json(makeErrorResponse("User not found"));
//     }
//   }

//   async show(req: Request, res: Response) {
//     try {
//       const response = await this.service.getUserProfile(
//         Number(req.params.userId),
//       );

//       return res.json(response);
//     } catch (e) {
//       return res.status(404).json(makeErrorResponse("User not found"));
//     }
//   }
// }

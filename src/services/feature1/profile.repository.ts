import { PrismaClient, Prisma, Gender, User_bio } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import {
  ProfileShowDBResponse,
  ProfileUpdateDBResponse,
  ProfileUpdateRequest,
} from "../../controllers/feature1/models/profile.model";
import { omit, pick } from "ramda";

export interface IProfileRepository {
  getUserById(userId: number): Promise<ProfileShowDBResponse>;

  updateUserById(
    userId: number,
    data: ProfileUpdateRequest,
  ): Promise<ProfileUpdateDBResponse>;
}

type Profile = {
  userId: number;
  username: string;
  phone: string;
  email: string;
  User_bio: null | User_bio;
};

type ExpandedProfile = {
  userId: number;
  username: string;
  phone: string;
  email: string;
  birthday: Date | null;
  gender: Gender | null;
};

const makeProfile = pick(["userId", "username", "phone", "email", "User_bio"]);

const expandBio = (profile: Profile): ExpandedProfile => {
  if (!profile.User_bio) {
    profile["birthday"] = null;
    profile["gender"] = null;
  } else {
    profile["birthday"] = profile.User_bio!.birthday;
    profile["gender"] = profile.User_bio!.gender;
  }

  return omit(["User_bio"])(profile) as ExpandedProfile;
};

export class ProfileRepository implements IProfileRepository {
  private prismaClient: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    DefaultArgs
  >;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async updateUserById(
    userId: number,
    data: ProfileUpdateRequest,
  ): Promise<ProfileShowDBResponse> {
    const result = await this.prismaClient.user.update({
      include: { User_bio: true },
      where: {
        userId: userId,
      },
      data: {
        phone: data.phone,
        email: data.phone,
        userId,
        User_bio: {
          connectOrCreate: {
            create: {
              birthday: data.birthday,
              gender: data.gender,
            },
            where: {
              userId,
            },
          },
          update: {
            birthday: data.birthday,
            gender: data.gender,
          },
        },
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    const profile = makeProfile(result);

    const extendedProfile = expandBio(profile);

    return extendedProfile as ProfileUpdateDBResponse;
  }

  async getUserById(userId: number): Promise<ProfileShowDBResponse> {
    const result = await this.prismaClient.user.findFirst({
      where: {
        userId,
      },
      include: {
        User_bio: true,
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    const profile = makeProfile(result);

    const extendedProfile = expandBio(profile);

    return extendedProfile as ProfileShowDBResponse;
  }
}

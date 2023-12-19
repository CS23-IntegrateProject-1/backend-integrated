import { User_bio } from "@prisma/client";
import {
  ProfileShowDBResponse,
  ProfileUpdateDBResponse,
  ProfileUpdateRequest,
} from "../../controllers/feature1/models/profile.model";
import { omit, pick } from "ramda";
import { prismaClient } from "../../controllers/feature1.controller";

export interface IProfileRepository {
  getUserById(userId: number): Promise<ProfileShowDBResponse>;

  updateUserById(
    userId: number,
    data: ProfileUpdateRequest,
    filename: string,
  ): Promise<ProfileUpdateDBResponse>;
}

type Profile = {
  userId: number;
  username: string;
  phone: string;
  email: string;
  profile_picture: string | null;
  User_bio: null | User_bio;
};

type Gender = 'Male' | 'Female' | 'Others';

type ExpandedProfile = Profile & {
  avatar: string | null;
  birthday: Date | null;
  gender: Gender | null;
};

const makeProfile = pick([
  "userId",
  "username",
  "phone",
  "email",
  "User_bio",
  "profile_picture",
]);

const expandBio = (profile: Profile): ExpandedProfile => {
  profile["avatar"] = profile.profile_picture;

  if (!profile.User_bio) {
    profile["birthday"] = null;
    profile["gender"] = null;
  } else {
    profile["birthday"] = profile.User_bio!.birthday;
    profile["gender"] = profile.User_bio!.gender;
  }

  return omit(["User_bio", "profile_picture"])(profile) as ExpandedProfile;
};

export class ProfileRepository implements IProfileRepository {
  async updateUserById(
    userId: number,
    data: ProfileUpdateRequest,
    filename: string,
  ): Promise<ProfileShowDBResponse> {
    const result = await prismaClient.user.update({
      include: { User_bio: true },
      where: {
        userId: userId,
      },
      data: {
        phone: data.phone,
        email: data.email,
        profile_picture: filename,
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
    const result = await prismaClient.user.findFirst({
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

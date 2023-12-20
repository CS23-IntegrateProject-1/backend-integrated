import { Member_tier, Point, User_bio } from "@prisma/client";
import {
  ProfileShowDBResponse,
  ProfileUpdateDBResponse,
  ProfileUpdateRequest,
} from "../../controllers/feature1/models/profile.model";
import { isNil, omit, pick } from "ramda";
import { prismaClient } from "../../controllers/feature1.controller";

export interface IProfileRepository {
  getUserById(userId: number): Promise<ProfileShowDBResponse>;

  getUserByUserName(username: string): Promise<ProfileShowDBResponse>;

  updateUserById(
    userId: number,
    data: ProfileUpdateRequest,
    filename: string | null,
  ): Promise<ProfileUpdateDBResponse>;
}

type Profile = {
  Member_tier: null | Member_tier;
  Point: null | Array<Point>;
  User_bio: null | User_bio;
  email: string;
  phone: string;
  profile_picture: string | null;
  userId: number;
  username: string;
};

type Gender = "Male" | "Female" | "Others";

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
  "Member_tier",
  "Point",
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

  profile["member_tier"] = profile.Member_tier?.tier_name;

  if (!isNil(profile.Point) && profile.Point.length >= 1) {
    profile["member_point"] = profile.Point[0].amount;
    profile["member_point_used"] = profile.Point[0].amount_used;
  } else {
    profile["member_point"] = 0;
    profile["member_point_used"] = 0;
  }

  return omit(["User_bio", "profile_picture", "Member_tier", "Point"])(
    profile,
  ) as ExpandedProfile;
};

export class ProfileRepository implements IProfileRepository {
  async updateUserById(
    userId: number,
    data: ProfileUpdateRequest,
    filename: string | null,
  ): Promise<ProfileShowDBResponse> {
    const result = await prismaClient.user.update({
      where: {
        userId: userId,
      },
      data: {
        phone: data.phone,
        email: data.email,
        ...(!isNil(filename) && { profile_picture: `/uploads/${filename}` }),
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
      select: {
        Member_tier: true,
        Point: true,
        User_bio: true,
        email: true,
        phone: true,
        profile_picture: true,
        userId: true,
        username: true,
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
      select: {
        Member_tier: true,
        Point: true,
        User_bio: true,
        email: true,
        phone: true,
        profile_picture: true,
        userId: true,
        username: true,
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    const profile = makeProfile(result);

    const extendedProfile = expandBio(profile);

    return extendedProfile as ProfileShowDBResponse;
  }

  async getUserByUserName(username: string): Promise<ProfileShowDBResponse> {
    const result = await prismaClient.user.findFirst({
      where: {
        username,
      },
      select: {
        Member_tier: true,
        Point: true,
        User_bio: true,
        email: true,
        phone: true,
        profile_picture: true,
        userId: true,
        username: true,
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

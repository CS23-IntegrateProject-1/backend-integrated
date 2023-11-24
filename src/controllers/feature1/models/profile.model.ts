import { Gender } from "@prisma/client";

export type ProfileShowDBResponse = {
  userId: number;
  username: string;
  phone: string;
  email: string;
};

export type ProfileUpdateRequest = {
  phone: string;
  birthday: string;
  email: string;
  gender: Gender;
};

export type ProfileUpdateDBResponse = ProfileShowDBResponse;

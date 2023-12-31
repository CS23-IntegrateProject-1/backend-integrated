type Gender = "Male" | "Female" | "Others";

export type ProfileShowDBResponse = {
  userId: number;
  username: string;
  phone: string;
  email: string;
  gender: Gender | null;
  birthday: Date | null;
};

export type ProfileUpdateRequest = {
  phone: string;
  birthday: string;
  email: string;
  gender: Gender;
};

export type ProfileUpdateDBResponse = ProfileShowDBResponse;

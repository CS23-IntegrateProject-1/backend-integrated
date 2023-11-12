export type BioRequest = {
  userId: number;
  birthdate: Date;
  gender: Gender;
};

export type BioResponse = {
  userId: number;
  birthdate: Date;
  gender: Gender;
};

export type Gender = "male" | "female" | "other" | "empty" | null;

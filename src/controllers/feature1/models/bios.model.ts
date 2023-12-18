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

export type Gender = "Male" | "Female" | "Others";

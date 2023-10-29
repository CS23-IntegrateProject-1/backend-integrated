export type TOSResponse = {
  user_id: number;
  consented: boolean;
};

export type TOSRequest = {
  userId: number;
  consent: boolean;
};

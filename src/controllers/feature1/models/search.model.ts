export type SearchDBResponse = {
  username: string;
  fname: string;
  lname: string;
  userId: number;
  profile_picture: string;
};

type SearchWebResponse = {
  username: string;
  name: string;
  user_id: number;
  avatar: string;
};

export function makeSearchWebResponse(
  data: SearchDBResponse,
): SearchWebResponse {
  return {
    username: data.username,
    name: `${data.fname} ${data.lname}`,
    user_id: data.userId,
    avatar: data.profile_picture,
  };
}

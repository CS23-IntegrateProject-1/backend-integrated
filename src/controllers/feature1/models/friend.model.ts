import { map } from "ramda";

export type FriendIndexDBResponse = Array<FriendDBResponse>;

export type UserDBResponse = {
  username: string;
  fname: string;
  lname: string;
  userId: number;
  profile_picture: string | null;
};

type Status = "Friend" | "Pending";

export type FriendDBResponse = {
  since: Date;
  status: Status;
  userId: number;
  username: string;
  fname: string;
  lname: string;
  profile_picture: string | null;
};

export type FriendRawDBResponse = {
  since: Date;
  status: Status;
  friend: {
    userId: number;
    username: string;
    fname: string;
    lname: string;
    profile_picture: null | string;
  };
};

type FriendIndexWebResponse = Array<FriendWebResponse>;

type FriendWebResponse = {
  username: string;
  name: string;
  user_id: number;
  avatar: string | null;
  friend_since: Date;
  status: string;
};

function transform(data: FriendDBResponse): FriendWebResponse {
  return {
    user_id: data.userId,
    username: data.username,
    name: `${data.fname} ${data.lname}`,
    avatar: data.profile_picture,
    friend_since: data.since,
    status: data.status,
  };
}

export function makeFriendIndexWebResponse(
  data: FriendIndexDBResponse,
): FriendIndexWebResponse {
  return map(transform)(data);
}

import { map } from "ramda";
import { SECRET_IDENTIFIER } from "../../../services/feature1/group.repository";

type UserMinimalInfo = {
  userId: number;
  username: string;
  profile_picture: string | null;
};

export type GroupCreateDBResponse = {
  groupId: number;
  group_name: string;
  group_profile: string | null;
  Group_user: Array<{
    groupId: number;
    memberId: number;
    User: UserMinimalInfo;
  }>;
};

export type GroupIndexDBResponse = Array<GroupDBResponse>;

export type UserDBResponse = {
  username: string;
  fname: string;
  lname: string;
  userId: number;
  profile_picture: string | null;
};

type Status = "Group" | "Pending";

export type GroupCreateWebResponse = {
  group_name: string;
  group_id: number;
  group_avatar: string | null;
  is_secret_group: boolean;
  members: Array<{ user_id: number; username: string; avatar: string | null }>;
};

export type GroupDBResponse = {
  since: Date;
  status: Status;
  userId: number;
  username: string;
  fname: string;
  lname: string;
  profile_picture: string | null;
};

export type GroupRawDBResponse = {
  since: Date;
  status: Status;
  group: {
    userId: number;
    username: string;
    fname: string;
    lname: string;
    profile_picture: null | string;
  };
};

type GroupIndexWebResponse = Array<GroupWebResponse>;

type GroupWebResponse = {
  username: string;
  name: string;
  user_id: number;
  avatar: string | null;
  group_since: Date;
  status: string;
};

function transform(data: GroupDBResponse): GroupWebResponse {
  return {
    user_id: data.userId,
    username: data.username,
    name: `${data.fname} ${data.lname}`,
    avatar: data.profile_picture,
    group_since: data.since,
    status: data.status,
  };
}

export function makeGroupIndexWebResponse(
  data: GroupIndexDBResponse,
): GroupIndexWebResponse {
  return map(transform)(data);
}

export function makeGroupCreateWebResponse(
  data: GroupCreateDBResponse,
): GroupCreateWebResponse {
  const isSecretGroup = data.group_name.endsWith(SECRET_IDENTIFIER);

  return {
    group_name: isSecretGroup
      ? data.group_name.replace(SECRET_IDENTIFIER, "")
      : data.group_name,
    group_id: data.groupId,
    group_avatar: data.group_profile,
    is_secret_group: isSecretGroup,
    members: data.Group_user.map((user) => ({
      user_id: user.User.userId,
      username: user.User.username,
      avatar: user.User.profile_picture,
    })),
  };
}

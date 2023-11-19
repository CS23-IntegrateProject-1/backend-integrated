import { Request } from "express";

export function extractToken({ headers }: Request): string {
  let { cookie: token } = headers;

  if (!token) {
    throw new Error("Invalid token");
  }

  return token.replace("authToken=", "");
}

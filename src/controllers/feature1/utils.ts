import { Request } from "express";

export function extractToken({ headers }: Request): string {
  const { cookie: token } = headers;

  if (!token) {
    throw new Error("Invalid token");
  }

  return token.replace("authToken=", "");
}

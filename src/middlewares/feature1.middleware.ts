import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL || "";

enum AuthKind {
  user = 'user',
  business = 'business',
  admin = 'admin',
}

const makeAuthMiddleware = (kind: AuthKind) => {
  if (kind !== AuthKind.user && kind !== AuthKind.business && kind !== AuthKind.admin) {
    throw new Error("Invalid user type");
  }

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "No authentication token." });
    }

    try {
      const jwtPayload = jwt.verify(token, secretKey) as JwtPayload;

      if (!(`${kind}Id` in jwtPayload)) {
        throw new Error("Missing id in JWT payload");
      }

      req.params[`${kind}Id`] = jwtPayload[`${kind}Id`];

      next();
      return;
    } catch (error) {
      res.clearCookie("authToken", { domain: FRONTEND_URL });

      return res.status(401).json({ message: "Invalid authentication token." });
    }
  }
}
  
  export const userAuthMiddleware = makeAuthMiddleware(AuthKind.user);
  export const businessAuthMiddleware = makeAuthMiddleware(AuthKind.business);
  export const adminAuthMiddleware = makeAuthMiddleware(AuthKind.admin);
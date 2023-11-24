import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL || "";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No authentication token." });
  }

  try {
    const { userId } = jwt.verify(token, secretKey) as JwtPayload;
    req.params.userId = userId;

    next();
  } catch (error) {
    res.clearCookie("authToken", { domain: FRONTEND_URL });

    return res.status(401).json({ message: "Invalid authentication token." });
  }
};

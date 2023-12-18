import { Response, NextFunction, response } from "express";
import authService from "../services/auth/auth.service";

// import jwt, { JwtPayload } from "jsonwebtoken";
const FRONTEND_URL = process.env.FRONTEND_URL || "";

export const customVerifyCookie = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken; // token stored in authToken

  if (!token) {
    response.write('not verify');
  }
  const decodetoken = authService.decodeToken(token);
  const userId = decodetoken.userId;

  try {
    req.userId = userId; // Pass a demo userId
    next();
  } catch (error) {
    // Handle when token verification fails
    res.clearCookie("authToken", { domain: FRONTEND_URL }); // Clear the cookie
    return res.status(401).json({ message: "Invalid authentication token." });
  }
};

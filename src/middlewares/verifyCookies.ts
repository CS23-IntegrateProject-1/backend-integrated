// import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// const secretKey = process.env.JWT_SECRET as string;
// const FRONTEND_URL = process.env.FRONTEND_URL || "";

// export const customVerifyCookie = (req: any, res: Response, next: NextFunction) => {
//   const token = req.cookies.authToken; // token stored in authToken

//   if (!token) {
//     // Handle when no token is found
//     req.userId = userId; // Attach the userId to the request
//     next();
//   }

//   try {
//     // Verify using the jwt.verify
//     const decoded = jwt.verify(token, secretKey) as JwtPayload;
//     const { userId } = decoded;
//     req.userId = userId; // Attach the userId to the request
//     next();
//   } catch (error) {
//     // Handle when token verification fails
//     res.clearCookie("authToken", { domain: FRONTEND_URL }); // Clear the cookie
//     return res.status(401).json({ message: "Invalid authentication token." });
//   }
// };

<<<<<<< HEAD
import { Response, NextFunction, response } from "express";
import authService from "../services/auth.service";
=======
import { Response, NextFunction } from "express";
>>>>>>> Beta
// import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET as string;
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
  const userid = decodetoken.userId;

  try {
    // Verify using the jwt.verify
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    const { userId } = decoded;
    // For demo purposes, you can directly set a demo userId
    req.userId = userId; // Pass a demo userId
    next();
  } catch (error) {
    // Handle when token verification fails
    res.clearCookie("authToken", { domain: FRONTEND_URL }); // Clear the cookie
    return res.status(401).json({ message: "Invalid authentication token." });
  }
};

import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET as string;
const FRONTEND_URL = process.env.FRONTEND_URL || "";

export const businessVerifyCookie = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken; // token stored in authToken
    if (!token) {
        throw new Error("No auth token");
    }
    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        if (decoded.userType != "business") {
            throw new Error("Invalid auth token");
        }

        const businessId = decoded.businessId;
        req.businessId = businessId; // Pass a demo userId
        next();
    } catch (error) {
        // Handle when token verification fails
        res.clearCookie("authToken", { domain: FRONTEND_URL }); // Clear the cookie
        return res.status(401).json({ message: "Invalid authentication token." });
    }
}
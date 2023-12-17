import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const reservationMW = (req: any, res: Response, next: NextFunction) => {
    const reservationToken = req.cookies.reservationToken;
    const secretKey = process.env.JWT_SECRET as string;
    if (!reservationToken) {
        return res.status(401).json({ message: "Invalid reservation token." });
    }
    try {
        const decoded = jwt.verify(reservationToken, secretKey) as JwtPayload;
        const { reservationId } = decoded;
        req.reservationId = reservationId;
        next();
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};

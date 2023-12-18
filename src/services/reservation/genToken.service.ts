import jwt from "jsonwebtoken";

export const genToken = (reservationId: number): string => {
    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign({ reservationId }, secretKey, {
        expiresIn: "3h",
    });
    return token;
};

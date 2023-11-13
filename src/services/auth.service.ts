import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserType from "../interface/User.interface";

class AuthService {
	prisma = new PrismaClient();

	verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}

	hashPassword(password: string): Promise<string> {
        const salt = Number(process.env.salt) || 5;
        console.log(salt);
		if (!salt) throw new Error("Check your .env file for salt.");
		return bcrypt.hash(password, salt);
	}

	generateToken(userId: number): string {
		const secretKey = process.env.JWT_SECRET as string;
		const token = jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
		return token;
	}

	getUserByUsername(username: string): Promise<any> {
		return this.prisma.user.findUnique({
			where: {
				username: username
			}
		});
	}

	createUser(data: UserType): Promise<any> {
		return this.prisma.user.create({
			data: {
				fname: data.fname,
				lname: data.lname,
				username: data.username,
				phone: data.phone,
				email: data.email,
				hashed_password: data.password
			}
		});
	}
}

export default new AuthService();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SentUser } from "../../interface/Auth/User.interface";
import { SentAdminUser } from "../../interface/Auth/AdminUser.interface";
import IAuthService from "../../interface/Auth/IAuthService.interface";

class AuthService implements IAuthService {
	prisma = new PrismaClient();

	verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}

	hashPassword(password: string): string {
		const salt = Number(process.env.salt) || 5;
		if (!salt) throw new Error("Check your .env file for salt.");
		const hashedPassword = bcrypt.hashSync(password, salt);
		return hashedPassword;
	}

	generateToken(userId: number, userType: string): string {
		const secretKey = process.env.JWT_SECRET as string;
		const token = jwt.sign({ userId, userType }, secretKey, {
			expiresIn: "7d"
		});
		return token;
	}

	decodeToken(token: string): JwtPayload {
		const secretKey = process.env.JWT_SECRET as string;
		const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
		return decoded;
	}

	getUserByUsername(username: string) {
		const user = this.prisma.user.findUnique({
			where: {
				username: username
			}
		});
		if (!user) throw new Error("User not found.");
		return user;
	}

	getAdminUserByUsername(username: string) {
		const user = this.prisma.admin_user.findFirst({
			where: {
				username: username
			}
		});
		if (!user) throw new Error("Admin not found.");
		return user;
	}

	getUserById(userId: number) {
		const user = this.prisma.user.findUnique({
			where: {
				userId: userId
			}
		});
		if (!user) throw new Error("User not found.");
		return user;
	}

	getAdminUserById(adminId: number) {
		const user = this.prisma.admin_user.findFirst({
			where: {
				adminId: adminId
			}
		});
		if (!user) throw new Error("Admin not found.");
		return user;
	}

	createUser(data: SentUser) {
		return this.prisma.user.create({
			data: {
				lname: data.lname,
				fname: data.fname,
				username: data.username,
				phone: data.phone,
				email: data.email,
				hashed_password: data.password
			}
		});
	}
	createAdminUser(data: SentAdminUser) {
		return this.prisma.admin_user.create({
			data: {
				username: data.username,
				hashed_password: data.hashed_password
			}
		});
	}
}

export default new AuthService();
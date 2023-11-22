import { JwtPayload } from "jsonwebtoken";
import { SentUser } from "./User.interface";
import { SentAdminUser } from "./AdminUser.interface";

export default interface IAuthService {
	verifyPassword: (
		password: string,
		hashedPassword: string
	) => Promise<boolean>;
	hashPassword: (password: string) => string;
	generateToken: (data: any, userType: string) => string;
	decodeToken: (token: string) => JwtPayload;
	getUserByUsername: (username: string) => Promise<any>;
	getAdminUserByUsername: (username: string) => Promise<any>;
	getUserById: (userId: number) => Promise<any> | null;
	getAdminUserById: (userId: number) => Promise<any>;
	createUser: (user: SentUser) => Promise<any>;
	createAdminUser: (user: SentAdminUser) => Promise<any>;
}

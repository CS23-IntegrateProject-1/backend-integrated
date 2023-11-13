import { Request, Response } from "express";
import authService from "../services/auth.service";
import UserType from "../interface/User.interface";

interface IAuthController {}

class AuthController implements IAuthController {
	async signup(req: Request, res: Response): Promise<void> {
		const { firstName, lastName, username, phone, email, password } =
			req.body;
		try {
			const user = await authService.getUserByUsername(username);
			if (user) {
				res.status(409).send({ message: "Username already exists." });
			} else {
				const hashedPassword = await authService.hashPassword(password);
				const newUser: UserType = {
					fname: firstName,
					lname: lastName,
					username: username,
					phone: phone,
					email: email,
					password: hashedPassword
				};
				await authService.createUser(newUser);

				const userId = await authService.getUserByUsername(username);
				const token = authService.generateToken(userId!.userId);
				res.cookie("authToken", token, {
					httpOnly: true,
					sameSite: "none",
					secure: true
				});
				res.status(201).send({ message: "User created." });
			}
		} catch (e) {
			console.log(e);
			res.status(500).send({ message: "Internal server error." });
		}
	}

	async login(req: Request, res: Response) {
		const { username, password } = req.body;
		try {
			const user = await authService.getUserByUsername(username);
			if (!user) {
				return res.status(404).send({ message: "User not found." });
			} else {
				const hashed_password = user.hashed_password;
				if (!hashed_password) throw new Error("Password not found.");
				const passwordMatch = await authService.verifyPassword(
					password,
					hashed_password
				);
				if (!passwordMatch) {
					return res
						.status(401)
						.send({ message: "Incorrect password." });
				} else {
					const token = authService.generateToken(user.userId);
					res.cookie("authToken", token, {
						httpOnly: true,
						sameSite: "none",
						secure: true
					});
					return res.status(200).send({
						message: "Login successful."
					});
				}
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: "Internal server error." });
		}
	}
}

export default new AuthController();

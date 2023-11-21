import { Request, Response } from "express";
import authService from "../services/auth/auth.service";
import { SentUser } from "../interface/Auth/User.interface";
import { SentAdminUser } from "../interface/Auth/AdminUser.interface";
import IAuthController from "../interface/Auth/IAuthController.interface";

class AuthController implements IAuthController {
	async signup(req: Request, res: Response) {
		const { firstname, lastname, username, phone, email, password } =
			req.body;
		try {
			const user = await authService.getUserByUsername(username);
			if (user) {
				return res
					.status(409)
					.send({ message: "Username already exists." });
			} else {
				const hashedPassword = await authService.hashPassword(password);
				const newUser: SentUser = {
					fname: firstname,
					lname: lastname,
					username: username,
					phone: phone,
					email: email,
					password: hashedPassword
				};
				await authService.createUser(newUser);

				return res.status(201).send({ message: "User created." });
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: "Internal server error." });
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
					const token = authService.generateToken(
						user.userId,
						"user"
					);
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

	async logout(req: Request, res: Response) {
		try {
			res.clearCookie("authToken");
			return res.status(200).send({ message: "Logout successful." });
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: "Internal server error." });
		}
	}

	async verify(req: Request, res: Response) {
		try {
			const token = req.cookies.authToken;
			if (!token) {
				return res.status(401).send({ message: "No token provided." });
			} else {
				const decoded = authService.decodeToken(token);
				const { userId, userType } = decoded;
				switch (userType) {
					case "user": {
						const user = await authService.getUserById(userId);
						if (!user) {
							return res
								.status(404)
								.send({ message: "User not found." });
						} else {
							return res
								.status(200)
								.send({ message: "User verified." });
						}
					}
					case "admin": {
						const user = await authService.getAdminUserById(userId);
						if (!user) {
							return res
								.status(404)
								.send({ message: "Admin not found." });
						} else {
							return res
								.status(200)
								.send({ message: "Admin verified." });
						}
					}
				}
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: "Internal server error." });
		}
	}
	async getUser(req: Request, res: Response) {
		try {
			const token = req.cookies.authToken;
			if (!token) {
				return res.json({ error: "No auth token" });
			}
			const decodedToken = authService.decodeToken(token);
			const userId = decodedToken.userId;

			res.json({ userId: userId });
		} catch (e) {
			console.error(e);
			res.json({ error: "error getting user" });
		}
	}

	async adminSignup(req: Request, res: Response) {
		const { username, password } = req.body;
		try {
			const user = await authService.getAdminUserByUsername(username);
			if (user) {
				return res
					.status(409)
					.send({ message: "Username already exists." });
			} else {
				const hashedPassword = await authService.hashPassword(password);
				const newUser: SentAdminUser = {
					username: username,
					hashed_password: hashedPassword
				};
				await authService.createAdminUser(newUser);

				return res.status(201).send({ message: "Admin created." });
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: "Internal server error." });
		}
	}

	async adminLogin(req: Request, res: Response) {
		const { username, password } = req.body;
		try {
			const user = await authService.getAdminUserByUsername(username);
			if (!user) {
				return res.status(404).send({ message: "Admin not found." });
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
					const token = authService.generateToken(
						user.adminId,
						"admin"
					);
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

	async adminGetUser(req: Request, res: Response) {
		try {
			const token = req.cookies.authToken;
			if (!token) {
				return res.json({ error: "No auth token" });
			}
			const decodedToken = authService.decodeToken(token);
			const adminId = decodedToken.adminId;

			res.json({ adminId: adminId });
		} catch (e) {
			console.error(e);
			res.json({ error: "error getting admin" });
		}
	}
}

export default new AuthController();

export default interface IAuthController {
	logout: (req: any, res: any) => Promise<any>;
	verify: (req: any, res: any) => Promise<any>;

	signup: (req: any, res: any) => Promise<any>;
	login: (req: any, res: any) => Promise<any>;

	adminSignup: (req: any, res: any) => Promise<any>;
	adminLogin: (req: any, res: any) => Promise<any>;

	businessSignup: (req: any, res: any) => Promise<any>;
	businessLogin: (req: any, res: any) => Promise<any>;

	getUser: (req: any, res: any) => Promise<any>;
	getAdminUser: (req: any, res: any) => Promise<any>;
	getBusinessUser: (req: any, res: any) => Promise<any>;
}

export default interface IAuthController {
    logout: (req: any, res: any) => Promise<any>;
    
	signup: (req: any, res: any) => Promise<any>;
	login: (req: any, res: any) => Promise<any>;
	verify: (req: any, res: any) => Promise<any>;
	getUser: (req: any, res: any) => Promise<any>;

	adminSignup: (req: any, res: any) => Promise<any>;
	adminLogin: (req: any, res: any) => Promise<any>;
	adminVerify: (req: any, res: any) => Promise<any>;
	adminGetUser: (req: any, res: any) => Promise<any>;
}

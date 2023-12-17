import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import DashboardService from "../services/admin/dashboard.service";

const feature14Client = new PrismaClient();
<<<<<<< HEAD
=======
//=====================================ADMIN======================================
export const createAdminUser = async (req: Request, res: Response) => {
	const { username, hashed_password } = req.body;
	try {
		const admin_user = await feature14Client.admin_user.create({
			data: {
				username: username,
				hashed_password: hashed_password,
			},
		});
		return res.status(201).json({ admin_user });
	} catch (error) {
		return res.sendStatus(500).json({ error });
	}
};

export const getAdminUser = async (req: Request, res: Response) => {
	try {
		const admin_user = await feature14Client.admin_user.findMany();
		return res.status(200).json({ admin_user });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const updateAdminUser = async (req: Request, res: Response) => {
	const { adminId } = req.params;
	const { username, hashed_password } = req.body;
	try {
		const admin_user = await feature14Client.admin_user.update({
			where: {
				adminId: parseInt(adminId),
			},
			data: {
				username: username,
				hashed_password: hashed_password,
			},
		});
		return res.status(201).json({ admin_user });
	} catch (error) {
		return res.sendStatus(500).json({ error });
	}
};
//===============================BusinessUser==============================
// export const createBusinessUser = async (req: Request, res: Response) => {
// 	const { username, hashed_password } = req.body;
// 	try {
// 		const business_user = await feature14Client.business_user.create({
// 			data: {
// 				username: username,
// 				hashed_password: hashed_password,
// 			},
// 		});
// 		return res.status(201).json({ business_user });
// 	} catch (error) {
// 		return res.sendStatus(500).json({ error });
// 	}
// };

// export const getBusinessUser = async (req: Request, res: Response) => {
// 	try {
// 		const business_user = await feature14Client.business_user.findMany();
// 		return res.status(200).json({ business_user });
// 	} catch (error) {
// 		return res.status(500).json({ error });
// 	}
// };

// export const updateBusinessUser = async (req: Request, res: Response) => {
// 	const { businessId } = req.params;
// 	const { username, hashed_password } = req.body;
// 	try {
// 		const business_user = await feature14Client.business_user.update({
// 			where: {
// 				businessId: parseInt(businessId),
// 			},
// 			data: {
// 				username: username,
// 				hashed_password: hashed_password,
// 			},
// 		});
// 		return res.status(201).json({ business_user });
// 	} catch (error) {
// 		return res.sendStatus(500).json({ error });
// 	}
// };
>>>>>>> origin/Beta
//===============================Dashboard==============================
export const getDashboardChart = async (req: Request, res: Response) => {
	try {
		const userTiers = await DashboardService.getAllUsersTier();
		const venueTypes = await DashboardService.getVenueTypes();
		const businessCount = await DashboardService.getBusinessCount();
		const numberOfReciept = await DashboardService.getNumberOfReciept();

		return res.status(200).json({
			userTiers: userTiers,
			venueTypes: venueTypes,
			businessCount: businessCount.businessCount,
			numberOfReciept: numberOfReciept,
		});
	} catch (e) {
		console.log(e);
		return res.status(500);
	}
};

<<<<<<< HEAD
//===============================Report Ticket==============================
export const createReportTicket =async (req:Request, res: Response) => {
	const { title , Status, description, bussinessId } = req.body;
	try {
		const report_ticket = await feature14Client.report_ticket.create({
			data: {
				title: title, 
				Status: Status, 
				description:description,
				Business_user: {
					connect: {
					businessId: bussinessId
					}
					}
			},
		});
		return res.json({ report_ticket });
	}catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
	
};

export const getAllReportTicket = async (req: Request, res:Response) => {
	try {
			const report_ticket = await feature14Client.report_ticket.findMany();
			return res.status(200).json({ report_ticket });
			} catch (error) {
				return res.status(500).json({ error });
			}
}
//===============================Help Desk==============================
export const createHelpDesk = async( req:Request, res:Response) => {
	const { assign_to, description, isApprove, reportTicketId} = req.body;
	try {
		const help_desk = await feature14Client.help_desk.create({
			data: {
				assign_to: assign_to,
				description: description,
				isApprove: isApprove,
				Report_ticket: {
					connect: {
						reportTicketId: reportTicketId
					}
				}
			},
		});
		if (isApprove) {
			return res.json({ result: 'accept', help_desk });
			} else {
			return res.json({ result: 'reject', help_desk });
			}
	}catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
//===============================Promotion Approval==============================

//=====================================ADMIN======================================
// export const createAdminUser = async (req: Request, res: Response) => {
// 	const { username, hashed_password } = req.body;
// 	try {
// 		const admin_user = await feature14Client.admin_user.create({
// 			data: {
// 				username: username,
// 				hashed_password: hashed_password,
// 			},
// 		});
// 		return res.status(201).json({ admin_user });
// 	} catch (error) {
// 		return res.sendStatus(500).json({ error });
// 	}
// };

// export const getAdminUser = async (req: Request, res: Response) => {
// 	try {
// 		const admin_user = await feature14Client.admin_user.findMany();
// 		return res.status(200).json({ admin_user });
// 	} catch (error) {
// 		return res.status(500).json({ error });
// 	}
// };

// export const updateAdminUser = async (req: Request, res: Response) => {
// 	const { adminId } = req.params;
// 	const { username, hashed_password } = req.body;
// 	try {
// 		const admin_user = await feature14Client.admin_user.update({
// 			where: {
// 				adminId: parseInt(adminId),
// 			},
// 			data: {
// 				username: username,
// 				hashed_password: hashed_password,
// 			},
// 		});
// 		return res.status(201).json({ admin_user });
// 	} catch (error) {
// 		return res.sendStatus(500).json({ error });
// 	}
// };
//===============================BusinessUser==============================
// export const createBusinessUser = async (req: Request, res: Response) => {
// 	const { username, hashed_password } = req.body;
// 	try {
// 		const business_user = await feature14Client.business_user.create({
// 			data: {
// 				username: username,
// 				hashed_password: hashed_password,
// 			},
// 		});
// 		return res.status(201).json({ business_user });
// 	} catch (error) {
// 		return res.sendStatus(500).json({ error });
// 	}
// };

// export const getBusinessUser = async (req: Request, res: Response) => {
// 	try {
// 		const business_user = await feature14Client.business_user.findMany();
// 		return res.status(200).json({ business_user });
// 	} catch (error) {
// 		return res.status(500).json({ error });
// 	}
// };

// export const updateBusinessUser = async (req: Request, res: Response) => {
// 	const { businessId } = req.params;
// 	const { username, hashed_password } = req.body;
// 	try {
// 		const business_user = await feature14Client.business_user.update({
// 			where: {
// 				businessId: parseInt(businessId),
// 			},
// 			data: {
// 				username: username,
// 				hashed_password: hashed_password,
// 			},
// 		});
// 		return res.status(201).json({ business_user });
// 	} catch (error) {
// 		return res.sendStatus(500).json({ error });
// 	}
// };


=======
//===============================Dashboard==============================
>>>>>>> origin/Beta

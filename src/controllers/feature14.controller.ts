import { PrismaClient, Status } from "@prisma/client";
import { Response, Request } from "express";
import DashboardService from "../services/admin/dashboard.service";

const feature14Client = new PrismaClient();

//===============================Dashboard==============================
export const getDashboardChart = async (req: Request, res: Response) => {
	try {
		const userTiers = await DashboardService.getAllUsersTier();
		const venueTypes = await DashboardService.getVenueTypes();
		const businessCount = await DashboardService.getBusinessCount();
		const revenue = await DashboardService.getAllTransaction();
		const numberOfReciept = await DashboardService.getNumberOfReciept();

		return res.status(200).json({
			userTiers: userTiers,
			venueTypes: venueTypes,
			businessCount: businessCount.businessCount,
			numberOfReciept: numberOfReciept,
			revenue: revenue,
		});
	} catch (e) {
		console.log(e);
		return res.status(500);
	}
};

export const getBusinessDashboard = async (req: Request, res: Response) => {
	try {
				const business = await feature14Client.venue.findMany({
					select: {
						name: true,
						category: true,
					}
				});
				return res.status(200).json({ business });
			} catch (error) {
				return res.status(500).json({ error });
			}
};

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

export const getReportTicketByNew = async (req: Request, res: Response) => {
	try{
		const newStatus = await feature14Client.report_ticket.findMany({
			where: {
				Status: {
					contains: 'New',
				},
			  },
		  });
		  return res.status(200).json({ newStatus });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

export const getReportTicketByAssigned = async (req: Request, res: Response) => {
	try{
		const assignStatus = await feature14Client.report_ticket.findMany({
			where: {
				Status: {
					contains: 'Assigned',
				},
			  },
		  });
		  return res.status(200).json({ assignStatus });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

export const getReportTicketByComplete = async (req: Request, res: Response) => {
	try{
		const completeStatus = await feature14Client.report_ticket.findMany({
			where: {
				Status: {
					contains: 'Complete',
				},
			  },
		  });
		  return res.status(200).json({ completeStatus });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
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
export const updatePromotionApproval = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { isApprove } = req.body;
	try {
				const promotion_approval = await feature14Client.promotion.update({
					where: {
						promotionId: parseInt(id),
					},
					data: {
						isApprove: isApprove,
					},
				});
				return res.status(201).json({ promotion_approval });
			} catch (error) {
				console.log(error);
				return res.status(500).json({ error });
			}
};
 export const getInProgressPromotion = async (req: Request, res: Response) => {
	try{
		const inProgressPromotion = await feature14Client.promotion.findMany({
			where: {
				isApprove: {
					equals: 'In_progress',
				},
			  },
		  });
		  return res.status(200).json({ inProgressPromotion });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
 };

 //===============================Voucher Approval==============================
 export const updateVoucherApproval = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { isApprove } = req.body;
	try {
				const voucher_approval = await feature14Client.voucher.update({
					where: {
						voucherId: parseInt(id),
					},
					data: {
						isApprove: isApprove,
					},
				});
				return res.status(201).json({ voucher_approval });
			} catch (error) {
				console.log(error);
				return res.status(500).json({ error });
			}
};
export const getInProgressVoucher = async (req: Request, res: Response) => {
	try{
		const voucher_approval = await feature14Client.voucher.findMany({
			where: {
				isApprove: {
					equals: 'In_progress',
				},
			  },
		  });
		  return res.status(200).json({ voucher_approval });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
 };
//===============================BusinessUser==============================
export const getBusinessUser = async (req: Request, res: Response) => {
		try {
			const business_user = await feature14Client.business_user.findMany({
				select: {
					email: true,
					profile_picture: true,
				}
			});
			return res.status(200).json({ business_user });
		} catch (error) {
			return res.status(500).json({ error });
		}
	};
	
	export const updateBusinessUser = async (req: Request, res: Response) => {
		const { businessId } = req.params;
		const { phone_num, email, profile_picture } = req.body;
		try {
			const business_user = await feature14Client.business_user.update({
				where: {
					businessId: parseInt(businessId),
				},
				data: {
					phone_num:phone_num,
					email: email,
					profile_picture: profile_picture,
				},
			});
			return res.status(201).json({ business_user });
		} catch (error) {
			return res.sendStatus(500).json({ error });
		}
	};

	export const updateBusinessVenue = async (req: Request, res: Response) => {
		const { venueId } = req.params;
		const { name, description,Opening_day, location, capacity, Venue_credit_card, Venue_promptpay } = req.body;
		try{
			const venue = await feature14Client.venue.update({
				where: {
					venueId: parseInt(venueId),
				},
				data: {
					name: name,
					description:description,
					Opening_day: Opening_day,
					location: location,
					capacity: capacity,
					Venue_credit_card:Venue_credit_card,
					Venue_promptpay,
				},
			})
		}catch (error) {
			return res.sendStatus(500).json({ error });
		}
	};
	
	
	

 ////////////////////////////////////////////////////////////////////////////////
// export const createPromotionApproval = async(req:Request, res:Response) => {
// 	const { isApprove ,promotionId} = req.body;
// 	try {
// 		const promotion_approval = await feature14Client.promotion_approval.create({
// 			data: {
// 				promotionId:promotionId,
// 				isApprove: isApprove,
// 			}
// 		});
// 		if (isApprove) {
// 			return res.json({ result: 'accept', promotion_approval });
// 			} else {
// 			return res.json({ result: 'reject', promotion_approval });
// 			}
// 	}catch (error) {
// 		console.log(error);
// 		return res.status(500).json({ error });
// 	}
// };

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



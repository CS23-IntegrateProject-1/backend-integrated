import { PrismaClient } from "@prisma/client";
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
			},
		});
		const profile = await feature14Client.business_user.findMany({
			select: {
				profile_picture: true,
			},
		});
		return res.status(200).json({ profile, business });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

export const statistic = async (req: Request, res: Response) => {
	try {
		const receipt = await feature14Client.transaction.count();
		const revenue = await feature14Client.transaction_detail.aggregate({
			_sum: {
				total_amount: true,
			},
		});
		const toPartners = revenue._sum.total_amount?.times(0.9);
		const netProfit = revenue._sum.total_amount?.times(0.1);

		const statistic = {
			receipt: receipt,
			revenue: revenue._sum.total_amount,
			toPartners: toPartners,
			netProfit: netProfit,
		};

		return res.status(200).json(statistic);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

export const getAllVenue = async (req: Request, res: Response) => {
	try {
		const venue = await feature14Client.venue.findMany({
			select: {
				name: true,
				category: true,
				score: true,
				venueId: true,
				website_url: true,
				venue_picture: true,
			},
		});

		const venueRevenue = await Promise.all(
			venue.map(async (venue) => {
				const tracsactionIds =
					await feature14Client.transaction.findMany({
						where: {
							venueId: venue.venueId,
						},
						select: {
							transactionId: true,
						},
					});

				const transactionIdsArray = tracsactionIds.map(
					(transaction) => transaction.transactionId
				);

				const revenue =
					await feature14Client.transaction_detail.aggregate({
						where: {
							transactionId: {
								in: transactionIdsArray,
							},
						},
						_sum: {
							total_amount: true,
						},
					});

				const commission = revenue._sum.total_amount?.times(0.1);
				return {
					...venue,
					revenue: revenue._sum.total_amount,
					commission: commission,
				};
			})
		);

		return res.status(200).json(venueRevenue);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

//===============================Report Ticket==============================
export const getAllComplainTicket = async (req: Request, res: Response) => {
	try {
		const report_ticket = await feature14Client.complain_ticket.findMany({
			where: {
				status: "Pending",
			},
		});
		return res.status(200).json({ report_ticket });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const fixComplainTicket = async (req: Request, res: Response) => {
	try {
		const fixed = await feature14Client.complain_ticket.update({
			where: {
				ComplainTicketId: parseInt(req.params.complainTicketId),
			},
			data: {
				status: "Completed",
			},
		});

		res.status(200).json(fixed);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

//===============================Help Desk==============================
export const createTicketResponse = async (req: Request, res: Response) => {
	const { response, complainTicketId } = req.body;
	try {
		const ticket_response = await feature14Client.ticket_responses.create({
			data: {
				response: response,
				Complain_ticket: {
					connect: {
						ComplainTicketId: complainTicketId,
					},
				},
			},
		});
		return res.status(200).json({ ticket_response });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};
// export const createHelpDesk = async( req:Request, res:Response) => {
// 	const { assign_to, description, isApprove, reportTicketId} = req.body;
// 	try {
// 		const help_desk = await feature14Client.help_desk.create({
// 			data: {
// 				assign_to: assign_to,
// 				description: description,
// 				isApprove: isApprove,
// 				Report_ticket: {
// 					connect: {
// 						reportTicketId: reportTicketId
// 					}
// 				}
// 			},
// 		});
// 		if (isApprove) {
// 			return res.json({ result: 'accept', help_desk });
// 		} else {
// 			return res.json({ result: 'reject', help_desk });
// 		}
// 	}catch (error) {
// 		console.log(error);
// 		return res.status(500).json({ error });
// 	}
// };

//===============================Promotion Approval==============================
export const getAllPromotion = async (req: Request, res: Response) => {
	try {
		const promotion = await feature14Client.promotion.findMany({
			where: {
				isApprove: "In_progress",
			},
		});

		return res.status(200).json(promotion);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Internal server error" });
	}
};

export const rejectPromotion = async (req: Request, res: Response) => {
	try {
		const { feedback } = req.body;

		const feedbackVoucher = await feature14Client.promotion_response.create(
			{
				data: {
					promotionId: parseInt(req.params.promotionId),
					response: feedback,
				},
			}
		);

		const promotion = await feature14Client.promotion.update({
			where: {
				promotionId: parseInt(req.params.promotionId),
			},
			data: {
				isApprove: "Rejected",
			},
		});

		const PromotionFeedback = {
			...promotion,
			feedback: feedbackVoucher,
		};

		return res.json(PromotionFeedback);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Internal server error" });
	}
};

export const ApprovePromotion = async (req: Request, res: Response) => {
	try {
		const promotion = await feature14Client.promotion.update({
			where: {
				promotionId: parseInt(req.params.promotionId),
			},
			data: {
				isApprove: "Completed",
			},
		});

		return res.json(promotion);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Internal server error" });
	}
};

//===============================Voucher Approval==============================
export const getAllVoucher = async (req: Request, res: Response) => {
	try {
		const voucher = await feature14Client.voucher.findMany({
			where: {
				isApprove: "In_progress",
			},
		});

		return res.status(200).json(voucher);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Internal server error" });
	}
};

export const rejectVoucher = async (req: Request, res: Response) => {
	try {
		const { feedback } = req.body;

		const feedbackVoucher = await feature14Client.voucher_response.create({
			data: {
				voucherId: parseInt(req.params.voucherId),
				response: feedback,
			},
		});

		const voucher = await feature14Client.voucher.update({
			where: {
				voucherId: parseInt(req.params.voucherId),
			},
			data: {
				isApprove: "Rejected",
			},
		});

		const VoucherFeedback = {
			...voucher,
			feedback: feedbackVoucher,
		};

		return res.json(VoucherFeedback);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Internal server error" });
	}
};

export const ApproveVoucher = async (req: Request, res: Response) => {
	try {
		const voucher = await feature14Client.voucher.update({
			where: {
				voucherId: parseInt(req.params.voucherId),
			},
			data: {
				isApprove: "Completed",
			},
		});

		return res.json(voucher);
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Internal server error" });
	}
};

//===============================BusinessUser==============================
export const getAccount = async (req: Request, res: Response) => {
	try {
		const business_user = await feature14Client.business_user.findMany({
			select: {
				phone_num: true,
				email: true,
				profile_picture: true,
			},
		});
		const venue = await feature14Client.venue.findMany({
			select: {
				name: true,
				description: true,
				capacity: true,
				Venue_credit_card: true,
				Venue_promptpay: true,
				venue_picture: true,
			},
		});
		const time = await feature14Client.opening_day.findMany({
			select: {
				closing_hours: true,
				opening_hours: true,
			},
		});
		const address = await feature14Client.location.findMany({
			select: {
				address: true,
			},
		});
		return res.status(200).json({ venue, business_user, time, address });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

export const updateAccount = async (req: Request, res: Response) => {
	const { businessId, venueId, openingDayId, locationId } = req.params;
	const {
		phone_num,
		email,
		profile_picture,
		name,
		description,
		capacity,
		Venue_credit_card,
		Venue_promptpay,
		venue_picture,
		address,
		closing_hours,
		opening_hours,
	} = req.body;
	try {
		const business_user = await feature14Client.business_user.update({
			where: {
				businessId: parseInt(businessId),
			},
			data: {
				phone_num: phone_num,
				email: email,
				profile_picture: profile_picture,
			},
		});
		const venue = await feature14Client.venue.update({
			where: {
				venueId: parseInt(venueId),
			},
			data: {
				name: name,
				description: description,
				capacity: capacity,
				Venue_credit_card: Venue_credit_card,
				Venue_promptpay: Venue_promptpay,
				venue_picture: venue_picture,
			},
		});
		const time = await feature14Client.opening_day.update({
			where: {
				openingDayId: parseInt(openingDayId),
			},
			data: {
				closing_hours: closing_hours,
				opening_hours: opening_hours,
			},
		});
		const location = await feature14Client.location.update({
			where: {
				locationId: parseInt(locationId),
			},
			data: {
				address: address,
			},
		});
		return res.status(201).json({ business_user, venue, time, location });
	} catch (error) {
		return res.sendStatus(500).json({ error });
	}
};

export const createVenue = async (req: Request, res: Response) => {
	function getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function getRandomIntNotInArray(usedChatRoom: number[]): number {
		let randomInt: number;
		do {
			randomInt = getRandomInt(1, 100); // Adjust range as needed
		} while (usedChatRoom.includes(randomInt));

		return randomInt;
	}
	try {
		const {
			name,
			description,
			phone_num,
			email,
			opening_hours,
			closing_hours,
			category,
			address,
			capacity,
			website_url,
		} = req.body;

		const location = await feature14Client.location.create({
			data: {
				name,
				address,
			},
		});

		const chatRoomId = await feature14Client.venue.findMany({
			select: {
				chatRoomId: true,
			},
		});
		const usedChatRoom = chatRoomId.map((id) => id.chatRoomId);
		const randomChatRoomId: number = getRandomIntNotInArray(usedChatRoom);

		let venue_picture;
		if (req.file.path.includes("/"))
			venue_picture =
				"/uploads/" +
				req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
		else if (req.file.path.includes("\\"))
			venue_picture =
				"/uploads/" +
				req.file.path.substring(req.file.path.lastIndexOf("\\") + 1);
		const venue = await feature14Client.venue.create({
			data: {
				name,
				description,
				category,
				capacity: parseInt(capacity),
				website_url,
				venue_picture,
				locationId: location.locationId,
				chatRoomId: randomChatRoomId,
				score: 5,
			},
		});

		await feature14Client.venue_contacts.create({
			data: {
				venueId: venue.venueId,
				type: "Phone",
				contact: phone_num,
			},
		});
		await feature14Client.venue_contacts.create({
			data: {
				venueId: venue.venueId,
				type: "Email",
				contact: email,
			},
		});

		await feature14Client.opening_day.create({
			data: {
				venueId: venue.venueId,
				day: "Mon",
				opening_hours,
				closing_hours,
			},
		});
		await feature14Client.opening_day.create({
			data: {
				venueId: venue.venueId,
				day: "Tue",
				opening_hours,
				closing_hours,
			},
		});
		await feature14Client.opening_day.create({
			data: {
				venueId: venue.venueId,
				day: "Wed",
				opening_hours,
				closing_hours,
			},
		});
		await feature14Client.opening_day.create({
			data: {
				venueId: venue.venueId,
				day: "Thu",
				opening_hours,
				closing_hours,
			},
		});
		await feature14Client.opening_day.create({
			data: {
				venueId: venue.venueId,
				day: "Fri",
				opening_hours,
				closing_hours,
			},
		});

		return res.status(200).json({ venue });
	} catch (error) {
		return res.sendStatus(500).json({ error });
	}
};

export const updateVenue = async (req: Request, res: Response) => {
	function getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function getRandomIntNotInArray(usedChatRoom: number[]): number {
		let randomInt: number;
		do {
			randomInt = getRandomInt(1, 100); // Adjust range as needed
		} while (usedChatRoom.includes(randomInt));

		return randomInt;
	}
	try {
		const {
			name,
			description,
			phone_num,
			email,
			opening_hours,
			closing_hours,
			category,
			address,
			capacity,
			website_url,
		} = req.body;
		const { venueId } = req.params;

		const noChange = await feature14Client.venue.findUnique({
			where: {
				venueId: parseInt(venueId),
			},
			select: {
				locationId: true,
				chatRoomId: true,
				score: true,
			},
		});

		const location = await feature14Client.location.update({
			where: {
				locationId: noChange?.locationId,
			},
			data: {
				name,
				address,
			},
		});

		let venue_picture;
		if (req.file.path.includes("/"))
			venue_picture =
				"/uploads/" +
				req.file.path.substring(req.file.path.lastIndexOf("/") + 1);
		else if (req.file.path.includes("\\"))
			venue_picture =
				"/uploads/" +
				req.file.path.substring(req.file.path.lastIndexOf("\\") + 1);

		const chatRoomId = await feature14Client.venue.findMany({
			select: {
				chatRoomId: true,
			},
		});
		const usedChatRoom = chatRoomId.map((id) => id.chatRoomId);
		const randomChatRoomId: number = getRandomIntNotInArray(usedChatRoom);

		const chatRoomIdToUse: number =
			noChange?.chatRoomId ?? randomChatRoomId;
		const venue = await feature14Client.venue.update({
			where: {
				venueId: parseInt(venueId),
			},
			data: {
				name,
				description,
				category,
				capacity: parseInt(capacity),
				website_url,
				venue_picture,
				locationId: location.locationId,
				chatRoomId: chatRoomIdToUse,
				score: noChange?.score ?? 5,
			},
		});

		const phone = await feature14Client.venue_contacts.findFirst({
			where: {
				venueId: parseInt(venueId),
				type: "Phone",
			},
		});
		await feature14Client.venue_contacts.update({
			where: {
				contactId: phone?.contactId,
			},
			data: {
				contact: phone_num,
			},
		});
		const emailId = await feature14Client.venue_contacts.findFirst({
			where: {
				venueId: parseInt(venueId),
				type: "Email",
			},
		});
		await feature14Client.venue_contacts.update({
			where: {
				contactId: emailId?.contactId,
			},
			data: {
				contact: email,
			},
		});

		await feature14Client.opening_day.updateMany({
			where: {
				venueId: parseInt(venueId),
			},
			data: {
				opening_hours,
				closing_hours,
			},
		});

		return res.status(200).json({ venue });
	} catch (error) {
		return res.sendStatus(500).json({ error });
	}
};
export const F14getBusinessId = async (req: Request) => {
	const venueId = req.body.venueId;
	const property = await feature14Client.property.findMany({
		where: {
			venueId: venueId,
		},
	});
	const businessId = property[0].businessId;
	return businessId;
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

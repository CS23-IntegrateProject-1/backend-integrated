import { Router } from "express";

// here import your controllers(function)
import {
	getDashboardChart,
	getBusinessDashboard,
	//createReportTicket,
	getAllComplainTicket,
	//createHelpDesk,
	//createPromotionApproval,
	//getComplainTicketByPending,
	//getComplainTicketByComplete,
	createTicketResponse,
	getAccount,
	updateAccount,
	getAllVoucher,
	rejectVoucher,
	ApproveVoucher,
	getAllPromotion,
	rejectPromotion,
	ApprovePromotion,
	fixComplainTicket,
	statistic,
	getAllVenue,
	createVenue,
	updateVenue,
	getVenueDataByVenueId,
	setVenueDataByVenueId,
} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/getDashboard", getDashboardChart);
feature14Router.get("/getBusinessDashboard", getBusinessDashboard);

//feature14Router.post("/createReportTicket", createReportTicket);

feature14Router.post("/createTicketResponse", createTicketResponse);

// ! ========================= New =========================
feature14Router.get("/getAllReportTicket", getAllComplainTicket);
feature14Router.patch(
	"/fixedComplainTicket/:complainTicketId",
	fixComplainTicket
);
//feature14Router.get("/getComplainTicketByPending",getComplainTicketByPending);
//feature14Router.get("/getComplainTicketByComplete", getComplainTicketByComplete);

//=====================promotion=======================
feature14Router.get("/getInProgressPromotion", getAllPromotion);
//reject promoton = get promotionId by param and send feedback in body
feature14Router.post("/rejectPromotion/:promotionId", rejectPromotion);
//reject promotion = get promotionId by param and send feedback in body
feature14Router.patch("/approvePromotion/:promotionId", ApprovePromotion);

//=====================voucher=======================
feature14Router.get("/getInProgressVoucher", getAllVoucher);
//reject voucher = get voucherId by param and send feedback in body
feature14Router.post("/rejectVoucher/:voucherId", rejectVoucher);
//approve voucher = get voucherId by param
feature14Router.patch("/approveVoucher/:voucherId", ApproveVoucher);
// ! =======================================================

feature14Router.get("/account", getAccount);
feature14Router.put("/accountUpdate/:id", updateAccount);

//feature14Router.post("/createPromotionApproval",createPromotionApproval);

// ! NEW2 ==================================================
feature14Router.get("/getStatistic", statistic);
feature14Router.get("/getAllVenue", getAllVenue);

feature14Router.post("/createVenue", createVenue);
feature14Router.post("/updateVenue/:id", updateVenue);

feature14Router.get("/getVenueName/:venueId", getVenueDataByVenueId);
feature14Router.post("/setVenueName/:venueId/:locationId", setVenueDataByVenueId);

export default feature14Router;

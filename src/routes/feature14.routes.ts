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
	updatePromotionApproval,
	getInProgressPromotion,
	updateVoucherApproval,
	getInProgressVoucher,
	getAccount,
	updateAccount,

} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/getDashboard", getDashboardChart);
feature14Router.get("/getBusinessDashboard",getBusinessDashboard)

//feature14Router.post("/createReportTicket", createReportTicket);

feature14Router.post("/createTicketResponse",createTicketResponse);

feature14Router.get("/getAllReportTicket",getAllComplainTicket);
//feature14Router.get("/getComplainTicketByPending",getComplainTicketByPending);
//feature14Router.get("/getComplainTicketByComplete", getComplainTicketByComplete);

feature14Router.put("/updatePromotionApproval/:id",updatePromotionApproval);
feature14Router.get("/getInProgressPromotion",getInProgressPromotion);

feature14Router.put("/updateVoucherApproval/:id",updateVoucherApproval);
feature14Router.get("/getInProgressVoucher",getInProgressVoucher);

feature14Router.get("/account",getAccount);
feature14Router.put("/accountUpdate/:id",updateAccount);

//feature14Router.post("/createPromotionApproval",createPromotionApproval);



export default feature14Router;

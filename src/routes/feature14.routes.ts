import { Router } from "express";

// here import your controllers(function)
import {

	getDashboardChart,
	createReportTicket,
	getAllReportTicket,
	createHelpDesk,

} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/getDashboard", getDashboardChart);
feature14Router.post("/createReportTicket", createReportTicket);
feature14Router.post("/createHelpDesk",createHelpDesk);
feature14Router.get("/getAllReportTicket",getAllReportTicket);

export default feature14Router;

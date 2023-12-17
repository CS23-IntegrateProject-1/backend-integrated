import { Router } from "express";

// here import your controllers(function)
import {
	// getAdminUser,
	// createAdminUser,
	// updateAdminUser,
	// createBusinessUser,
	// getBusinessUser,
	// updateBusinessUser,
	getDashboardChart,
	ticketResponse,
} from "../controllers/feature14.controller";

const feature14Router = Router();

// here define your routes
feature14Router.get("/getDashboard", getDashboardChart);
// feature14Router.get("/getAdmin", getAdminUser);
// feature14Router.post("/Admin", createAdminUser);
// feature14Router.put("/Admin/:id", updateAdminUser);
// feature14Router.post("/", createBusinessUser);
// feature14Router.get("/", getBusinessUser);
// feature14Router.put("/:id", updateBusinessUser);
export default feature14Router;

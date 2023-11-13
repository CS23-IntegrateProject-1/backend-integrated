import { Application } from "express";
import MockRoutes from "./mock.routes";
import Feature1Routes from "./feature1.routes";
import AuthRoutes from "./auth.routes";
import Feature3Routes from "./feature3.routes";
import Feature4Routes from "./feature4.routes";
import Feature5Routes from "./feature5.routes";
import Feature6Routes from "./feature6.routes";
import Feature7Routes from "./feature7.routes";
import Feature8Routes from "./feature8.routes";
import Feature9Routes from "./feature9.routes";
import Feature10Routes from "./feature10.routes";
import Feature11Routes from "./feature11.routes";
import Feature12Routes from "./feature12.routes";
import Feature13Routes from "./feature13.routes";
import Feature14Routes from "./feature14.routes";
import { customVerifyCookie } from "../middlewares/verifyCookies";

class Routes {
	constructor(app: Application) {
		// app.use("/api/mock", MockRoutes);
		// specify your path here

		// You can specify your path name with your feature name instead of 'feature1'
		// as example https://harmoni.social/api/business/revenue
		app.use("/api/auth", AuthRoutes);
		app.use(customVerifyCookie);
		app.use("/feature1", Feature1Routes);
		app.use("/feature3", Feature3Routes);
		app.use("/feature4", Feature4Routes);
		app.use("/feature5", Feature5Routes);
		app.use("/feature6", Feature6Routes);
		app.use("/feature7", Feature7Routes);
		app.use("/feature8", Feature8Routes);
		app.use("/feature9", Feature9Routes);
		app.use("/feature10", Feature10Routes);
		app.use("/feature11", Feature11Routes);
		app.use("/feature12", Feature12Routes);
		app.use("/feature13", Feature13Routes);
		app.use("/feature14", Feature14Routes);
	}
}
export default Routes;

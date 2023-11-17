import { Router } from "express";
import { getAllTable } from "../controllers/feature6.controller";
import { getAllReservation } from "../controllers/feature6.controller";
import { getAllReservationByStatus } from "../controllers/feature6.controller";
import { getVenueById } from "../controllers/feature6.controller";
import { getVenueAndReservationsById } from "../controllers/feature6.controller";
import { getReservationById } from "../controllers/feature6.controller";
import { createReservation } from "../controllers/feature6.controller";
import { checkAvailability } from "../controllers/feature6.controller";
import { getAvailableTables } from "../controllers/feature6.controller";
import { findSuitableTable } from "../controllers/feature6.controller";

//IMPORT FOR BUSINESS SIDE
// import { getAllTableTypeByVenueId } from "../controllers/feature6.controller";
// import { getTableByTableId } from "../controllers/feature6.controller";
// import { createTable } from "../controllers/feature6.controller";
// import { createTableType } from "../controllers/feature6.controller";

const feature6Router = Router();

//GET METHOD
feature6Router.get("/allTable", getAllTable);
feature6Router.get("/allReservation", getAllReservation);
feature6Router.get("/venue/:venueId", getVenueById);
feature6Router.get("/MyReservation/:reservationId", getReservationById);

//Finished, Wait for Integration
feature6Router.post("/MyReservation", getAllReservationByStatus);
feature6Router.get("/MyReservation/:venueId/:reservationId", getVenueAndReservationsById);

//Not Finished
feature6Router.get("/checkAvailability", checkAvailability);
feature6Router.get("/getAvailableTables", getAvailableTables);
feature6Router.get("/findSuitableTable", findSuitableTable);


//Business Side Part

//GET METHOD
// feature6Router.get("/AllTableType/:venueId",getAllTableTypeByVenueId);
// feature6Router.get("/MyTable/:tableId", getTableByTableId);

//POST METHOD
feature6Router.post("/createReservation", createReservation);
// feature6Router.post("/createTable", createTable);
// feature6Router.post("/createTableType", createTableType)
export default feature6Router;

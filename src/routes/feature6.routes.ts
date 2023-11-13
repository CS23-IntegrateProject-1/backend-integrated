import { Router } from "express";
import { getAllTable } from "../controllers/feature6.controller";
import { getAllReservation } from "../controllers/feature6.controller";
import { getAllReservationByStatus } from "../controllers/feature6.controller";
// import { getVenueById } from "../controllers/feature6.controller";
// import { getReservationById } from "../controllers/feature6.controller";
// import { createReservation } from "../controllers/feature6.controller";
import { checkAvailability } from "../controllers/feature6.controller";
// import { getAvailableTables } from "../controllers/feature6.controller";
import { findSuitableTable } from "../controllers/feature6.controller";
// import { createTable } from "../controllers/feature6.controller";
import { getVenueAndReservationsById } from "../controllers/feature6.controller";

const feature6Router = Router();

//GET METHOD
feature6Router.get("/allTable", getAllTable);
feature6Router.get("/allReservation", getAllReservation);
// feature6Router.get("/venue/:venueId", getVenueById);
// feature6Router.get("/MyReservation/:reservationId", getReservationById);

//Finished, Wait for Integration
feature6Router.get("/MyReservation", getAllReservationByStatus);
feature6Router.get("/MyReservation/:venueId/:reservationId", getVenueAndReservationsById);

//Not Finished
feature6Router.get("/checkAvailability", checkAvailability);
// feature6Router.get("/getAvailableTables", getAvailableTables);
feature6Router.get("/findSuitableTable", findSuitableTable);

//POST METHOD
// feature6Router.post("/createReservation", createReservation);
// feature6Router.post("/createTable", createTable);
export default feature6Router;
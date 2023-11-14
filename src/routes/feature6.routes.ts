import { Router } from "express";
import { getAllTable } from "../controllers/feature6.controller";
import { getAllReservation } from "../controllers/feature6.controller";
import { getAllReservationByStatus } from "../controllers/feature6.controller";
import { getVenueById } from "../controllers/feature6.controller";
import { getVenueAndReservationsById } from "../controllers/feature6.controller";
import { getReservationById } from "../controllers/feature6.controller";
const feature6Router = Router();

//GET METHOD
feature6Router.get("/allTable", getAllTable);
feature6Router.get("/allReservation", getAllReservation);
feature6Router.get("/venue/:venueId", getVenueById);
feature6Router.get("/MyReservation/:reservationId", getReservationById);

//Finished, Wait for Integration
feature6Router.get("/MyReservation", getAllReservationByStatus);
feature6Router.get("/MyReservation/:venueId/:reservationId", getVenueAndReservationsById);

export default feature6Router;
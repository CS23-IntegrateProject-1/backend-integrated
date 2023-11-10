import { Router } from "express";
import { getAllTable } from "../controllers/feature6.controller";
import { getAllReservation } from "../controllers/feature6.controller";
import { getAllReservationByStatus } from "../controllers/feature6.controller";
import { getVenueById } from "../controllers/feature6.controller";
import { getReservationById } from "../controllers/feature6.controller";
// import { createReservation } from "../controllers/feature6.controller";
// here import your controllers(function)
// import {
//     getfeature6,
// } from "../controllers/feature6.controller";

const feature6Router = Router();

// here define your routes
// feature6Router.get("/", getfeature6);

//GET METHOD
feature6Router.get("/allTable", getAllTable);
feature6Router.get("/allReservation", getAllReservation);
feature6Router.get("/MyReservation", getAllReservationByStatus);
feature6Router.get("/venue/:venueId", getVenueById);
feature6Router.get("/MyReservation/:reservationId", getReservationById);

//POST METHOD
// feature6Router.post("/createReservation", createReservation);
// feature6Router.post("/createTable", createTable);
export default feature6Router;
import { Router } from "express";
import { getAllTable } from "../controllers/feature6.controller";
import { getAllReservation } from "../controllers/feature6.controller";
import { getVenueById } from "../controllers/feature6.controller";
import { getReservationById } from "../controllers/feature6.controller";
import { getMyReservationByStatus } from "../controllers/feature6.controller";
import { getVenueAndReservationsById } from "../controllers/feature6.controller";
import { createReservation } from "../controllers/feature6.controller";
// import { checkAvailability } from "../controllers/feature6.controller";
import { getAvailableTables } from "../controllers/feature6.controller";
import { findSuitableTable } from "../controllers/feature6.controller";

//IMPORT FOR BUSINESS SIDE
import { getAllTableTypeByVenueId } from "../controllers/feature6.controller";
import { getAllTableByVenueId } from "../controllers/feature6.controller";
import { getTableByTableId } from "../controllers/feature6.controller";
import { getCountPerDay } from "../controllers/feature6.controller";
import { createTable } from "../controllers/feature6.controller";
import { createTableType } from "../controllers/feature6.controller";
import { deleteTable } from "../controllers/feature6.controller";

import { createOfflineReservation } from "../controllers/feature6.controller";
// import { checkOfflineAvailability } from "../controllers/feature6.controller";
import { getOfflineAvailableTables } from "../controllers/feature6.controller";

const feature6Router = Router();

// Custimer side part
//GET METHOD
feature6Router.get("/allTable", getAllTable);
feature6Router.get("/allReservation", getAllReservation);
feature6Router.get("/venue/:venueId", getVenueById);
feature6Router.get("/MyReservation/:reservationId", getReservationById);

//Finished
feature6Router.post("/MyReservation", getMyReservationByStatus);
feature6Router.get("/MyReservation/:venueId/:reservationId", getVenueAndReservationsById);
// feature6Router.get("/checkAvailability", checkAvailability);
feature6Router.get("/getAvailableTables", getAvailableTables);
feature6Router.get("/findSuitableTable", findSuitableTable);

//POST METHOD
feature6Router.post("/createReservation", createReservation);

//Business Side Part

//GET METHOD
//Finished
// GET METHOD
feature6Router.get("/allTableType",getAllTableTypeByVenueId);
feature6Router.get("/allTableByVenueId", getAllTableByVenueId);
feature6Router.get("/MyTable/:tableId", getTableByTableId);
feature6Router.get("/Dashboard/", getCountPerDay);

//POST METHOD
feature6Router.post("/createTable", createTable);
feature6Router.post("/createTableType", createTableType);

//DELETE METHOD
feature6Router.delete("/deleteTable/:tableId", deleteTable);

// Not finished
// GET METHOD
// feature6Router.get("/checkOfflineAvailability", checkOfflineAvailability);
//POST METHOD
feature6Router.post("/createOfflineReservation", createOfflineReservation);
feature6Router.get("/getOfflineAvailableTables", getOfflineAvailableTables);

// import { checkIn } from "../controllers/feature6.controller";
// import { qrCode } from "../controllers/feature6.controller";

//Check In
// feature6Router.post("/checkIn/:reservationId", checkIn);
// feature6Router.get("/qrcode/:reservationId", qrCode);

export default feature6Router;

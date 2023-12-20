import { Router } from "express";
import { getAllTable } from "../controllers/feature6.controller";
import { getAllReservation } from "../controllers/feature6.controller";
import { getMyReservationByStatus } from "../controllers/feature6.controller";
import { getVenueById } from "../controllers/feature6.controller";
import { getVenueAndReservationsById } from "../controllers/feature6.controller";
import { getReservationById } from "../controllers/feature6.controller";
import { createReservation } from "../controllers/feature6.controller";
import { checkInStatus } from "../controllers/feature6.controller";

//IMPORT FOR BUSINESS SIDE
// import { getAllTableTypeByVenueId } from "../controllers/feature6.controller";
import { getTableByTableId } from "../controllers/feature6.controller";
import { getCountPerDay } from "../controllers/feature6.controller";
import { getAllReservationOfVenue } from "../controllers/feature6.controller";
import { createTable } from "../controllers/feature6.controller";
import { createTableType } from "../controllers/feature6.controller";
import { deleteTable } from "../controllers/feature6.controller";
import { uploadTableTypeImage } from "../controllers/feature6.controller";
import { createOfflineReservation } from "../controllers/feature6.controller";

const feature6Router = Router();

// Customer side part
//GET METHOD
feature6Router.get("/allTable", getAllTable);
feature6Router.get("/allReservation", getAllReservation);
feature6Router.get("/venue/:venueId/:branchId", getVenueById);
feature6Router.get("/MyReservation/:reservationId", getReservationById);

//Finished, Wait for Integration
feature6Router.post("/MyReservation", getMyReservationByStatus);
feature6Router.get(
    "/MyReservation/:venueId/:reservationId",
    getVenueAndReservationsById
);
feature6Router.get("/checkin/status/:reservationId", checkInStatus);


//Business Side Part
// GET METHOD
//Finished

feature6Router.get("/MyTable/:tableId", getTableByTableId);
feature6Router.get("/Dashboard/", getCountPerDay);
feature6Router.get("/allReservationOfVenue", getAllReservationOfVenue);

//POST METHOD
feature6Router.post("/createReservation", createReservation);
feature6Router.post("/createTable", createTable);
feature6Router.post("/createTableType", createTableType);
feature6Router.post("/createOfflineReservation", createOfflineReservation);

//DELETE METHOD
feature6Router.delete("/deleteTable/:tableId", deleteTable);

import { cancelReservation } from "../controllers/feature6.controller";
import { checkIn } from "../controllers/feature6.controller";
import { qrCode } from "../controllers/feature6.controller";
import { checkOut } from "../controllers/feature6.controller";
import multerConfig from "../multerConfig";
// import { reservationMW } from "../middlewares/reservationMW";

// Check In
feature6Router.post("/cancel/:reservationId", cancelReservation);
feature6Router.post("/checkIn/:reservationId", checkIn);
feature6Router.post("/checkOut/:reservationId", checkOut);
feature6Router.get("/qrcode/:reservationId", qrCode);
export default feature6Router;

//Upload Image
feature6Router.post("/uploadTableTypeImage", multerConfig.array("file"), uploadTableTypeImage);


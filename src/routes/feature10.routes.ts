import { Router } from "express";

// here import your controllers(function)
import {
    getNowShowingFilms,
    getUpcomingFilms,
    getShowingFilms,
    getFilmsById,
    getAllFilms,
    getShowsByFilmId,
    getSeatsTypeByScreenId,
    getShowsByTheaterId,
    getFilmsByTheaterId,
    getTheaterById,
    getSeatByScreenId,
    getTotalPriceByReservationId,
    bookSeatAndSendCookie,
    getReservationById,

    
} from "../controllers/feature10.controller";

const feature10Router = Router();

// here define your routes
feature10Router.get("/getNowshowingFilms", getNowShowingFilms);
feature10Router.get("/getUpcomingFilms", getUpcomingFilms);
feature10Router.get("/getShowingFilms", getShowingFilms);
feature10Router.get("/getFilmsById/:id", getFilmsById);
feature10Router.get("/getAllFilms", getAllFilms);
feature10Router.get("/getShowsByFilmId/:id/:date", getShowsByFilmId);
feature10Router.get("/getSeatsTypeByScreenId/:id", getSeatsTypeByScreenId);
feature10Router.post("/getShowsByTheaterId", getShowsByTheaterId);
feature10Router.post("/getFilmsByTheaterId", getFilmsByTheaterId);
feature10Router.get("/getTheaterById/:id", getTheaterById);
feature10Router.post("/getSeatByScreenId", getSeatByScreenId);
feature10Router.post("/getTotalPriceByReservationId", getTotalPriceByReservationId);
feature10Router.post("/bookMovieSeat", bookSeatAndSendCookie);
feature10Router.post("/getReservationById", getReservationById);



export default feature10Router;


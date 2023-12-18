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


    getTestTest,
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
feature10Router.get("/getShowsByTheaterId/:id/:date", getShowsByTheaterId);
feature10Router.post("/getFilmsByTheaterId", getFilmsByTheaterId);
feature10Router.get("/getTheaterById/:id", getTheaterById);
feature10Router.post("/getSeatByScreenId", getSeatByScreenId);

feature10Router.get("/getTestTest", getTestTest);

export default feature10Router;


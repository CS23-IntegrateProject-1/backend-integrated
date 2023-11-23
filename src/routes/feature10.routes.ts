import { Router } from "express";

// here import your controllers(function)
import {
    getfeature10,
    getNowShowingFilms,
    getUpcomingFilms,
    getShowingFilms,
    getFilmsById,
    getAllFilms,
    getShowsByFilmId,
    getSeatsTypeByScreenId,
    getShowsByTheaterId,
    getFilmsByTheaterId,
    getTheaterById
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
feature10Router.get("/getFilmsByTheaterId/:id/:date", getFilmsByTheaterId);
feature10Router.get("/getTheaterById/:id", getTheaterById);

export default feature10Router;


import { Router } from "express";

// here import your controllers(function)
import {
    getfeature10,
    getNowShowingFilms,
    getUpcomingFilms,
    getShowingFilms,
    getFilmsById,
    getAllFilms,
    getShowsByFilmsId,
    getSeatsTypeByScreenId,
    getFilmsInfoPage3,
    getShowsByTheaterId
} from "../controllers/feature10.controller";

const feature10Router = Router();

// here define your routes
feature10Router.get("/getNowshowingFilms", getNowShowingFilms);
feature10Router.get("/getUpcomingFilms", getUpcomingFilms);
feature10Router.get("/getShowingFilms", getShowingFilms);
feature10Router.get("/getFilmsById/:id", getFilmsById);
feature10Router.get("/getAllFilms", getAllFilms);
feature10Router.get("/getShowsByFilmsId/:id/:date", getShowsByFilmsId);
feature10Router.get("/getSeatsTypeByScreenId/:id", getSeatsTypeByScreenId);
feature10Router.get("/getFilmsInfoPage3/:id", getFilmsInfoPage3);
feature10Router.get("/getShowsByTheaterId/:id/:date", getShowsByTheaterId);

export default feature10Router;


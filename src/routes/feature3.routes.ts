import { Router } from "express";

// here import your controllers(function)
import {
    getVenues,
    getVenueReviews,
    getVenueOverviews,
    getVenuePhotos,
    getSearchHistory,
    getAdvertisements,
} from "../controllers/feature3.controller";

const feature3Router = Router();

// here define your routes
feature3Router.get("/", getVenues);
feature3Router.get("/reviews/:id", getVenueReviews);
feature3Router.get("/overviews/:id", getVenueOverviews);
feature3Router.get("/photos/:id", getVenuePhotos);
feature3Router.get("/advertisement", getAdvertisements);

feature3Router.get("/history/:user_id", getSearchHistory);

export default feature3Router;

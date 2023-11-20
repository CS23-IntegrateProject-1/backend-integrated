import { Router } from "express";

// here import your controllers(function)
import {
    mapsLocation,
    GetAllMapsLocation,
    saveUserLocation,
    GetAllsaveUserLocation,
    updateSavedLocation,
    deleteSavedLocation,
    deleteLocation,
    getAllRestaurant,
    getAllBars,
    getAllCinema,

    getMenuById,
    getMenusByVenueId,
    getSetById,
    getSetsByVenueId
} from "../controllers/feature4.controller";

const feature4Router = Router();

// here define your routes
feature4Router.post("/map-data", mapsLocation);
feature4Router.get("/map-data", GetAllMapsLocation);
feature4Router.delete("/map-data/:locationId", deleteLocation);

feature4Router.post("/saved-location", saveUserLocation);
feature4Router.get("/saved-location", GetAllsaveUserLocation);
feature4Router.put("/saved-location", updateSavedLocation);
feature4Router.delete("/saved-location/:locationId/:userId", deleteSavedLocation);

feature4Router.get("/restaurants",getAllRestaurant );
feature4Router.get("/bars",getAllBars );
feature4Router.get("/cinemas",getAllCinema );

feature4Router.get("/menu/:id", getMenuById);
feature4Router.get("/menus/:venueId", getMenusByVenueId);
feature4Router.get("/set/:id", getSetById);
feature4Router.get("/sets/:venueId", getSetsByVenueId);

export default feature4Router;
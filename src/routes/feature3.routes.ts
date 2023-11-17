import { Router } from "express";

// here import your controllers(function)
import {
    getAdvertisements,
    getVenues,
    getVenueBranch,
    getVenueContacts,
    getVenueReviews,
    getVenueKeywords,
    getVenuePhotos,
    getOpeningDay,
    getSearchHistory,
    addVenueReview,
    editVenueReview,
    deleteVenueReview,
    getAllFoodVouchers,
    getAllDiscountVouchers,
    getAllMenusByVenueId,
    getVenuesRatings,
} from "../controllers/feature3.controller";

const feature3Router = Router();

// // here define your routes
feature3Router.get("/advertisements", getAdvertisements);
feature3Router.get("/venues", getVenues);
feature3Router.get("/venue-branch/:branchId", getVenueBranch);
feature3Router.get("/menus/:venueId", getAllMenusByVenueId);
feature3Router.get("/venue-contacts/:venueId", getVenueContacts);
feature3Router.get("/venue-reviews/:id", getVenueReviews);
feature3Router.get("/venue-ratings", getVenuesRatings);
feature3Router.get("/venue-keywords/:venueId", getVenueKeywords);
feature3Router.get("/venue-photos/:venueId", getVenuePhotos);
feature3Router.get("/opening-day/:venueId/:openingDayId", getOpeningDay);
feature3Router.get("/search-history/:user_id", getSearchHistory);
feature3Router.get("/food-vouchers", getAllFoodVouchers);
feature3Router.get("/discount-vouchers", getAllDiscountVouchers);

feature3Router.post("/venue-reviews", addVenueReview);
feature3Router.patch("/venue-reviews/:venueReviewId", editVenueReview);
feature3Router.delete("/venue-reviews/:venueReviewId", deleteVenueReview);

export default feature3Router;

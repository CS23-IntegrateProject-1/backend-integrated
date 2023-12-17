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
    getVenuesByCategory,
    getPhotos,
    getRecommendedVenues,
    addFoodReview,
    editFoodReview,
    deleteFoodReview,
    getFoodReviews,
    // getSentimentAnalysis,












    getReviewsBranch,
    postReviewDelivery,
    postReviewReservation,
    getVenBranchPage,
    getMyReviews,
    getReviewsBranchOverAll,
    getRecommendedPlaces,
    getVenuesPage,
    getVenDetail,
    getStarGraph,

    




} from "../controllers/feature3.controller";
import { get } from "http";

const feature3Router = Router();

// Routes
feature3Router.get("/advertisements", getAdvertisements);
feature3Router.get("/venues", getVenues);
feature3Router.get("/venues/:category", getVenuesByCategory);
feature3Router.get("/venue-branch/:branchId", getVenueBranch);
feature3Router.get("/menus/:venueId", getAllMenusByVenueId);
feature3Router.get("/venue-contacts/:venueId", getVenueContacts);
feature3Router.get("/recommended-venues", getRecommendedVenues);
feature3Router.get("/venue-ratings", getVenuesRatings);
feature3Router.get("/venue-keywords/:venueId", getVenueKeywords);
feature3Router.get("/venue-keywords", getPhotos);
feature3Router.get("/venue-photos/:venueId", getVenuePhotos);
feature3Router.get("/opening-day/:venueId/:openingDayId", getOpeningDay);
feature3Router.get("/search-history/:user_id", getSearchHistory);
feature3Router.get("/food-vouchers", getAllFoodVouchers);
feature3Router.get("/discount-vouchers", getAllDiscountVouchers);

// Sentiment analysis
// feature3Router.get("/sentiment-analysis/:id", getSentimentAnalysis);

// Venue reviews
feature3Router.get("/venue-reviews/:id", getVenueReviews);
feature3Router.post("/venue-reviews", addVenueReview);
feature3Router.patch("/venue-reviews/:venueReviewId", editVenueReview);
feature3Router.delete("/venue-reviews/:venueReviewId", deleteVenueReview);

// Food reviews
feature3Router.get("/food-reviews/:id", getFoodReviews);
feature3Router.post("/food-reviews", addFoodReview);
feature3Router.patch("/food-reviews/:foodReviewId", editFoodReview);
feature3Router.delete("/food-reviews/:foodReviewId", deleteFoodReview);








//***************************************************************************













//////////////////////////////////////////////////////////////////////////

feature3Router.get("/VenuesPage", getVenuesPage) // Venue details with branchId

feature3Router.get("/RecommendedPlaces", getRecommendedPlaces) // Venue details with branchId that rate > 4

feature3Router.get("/VenBranchPage/:venueId", getVenBranchPage) // Branch with venue details

feature3Router.get("/VenDetail/:branchId", getVenDetail) // Reviews of that branch

feature3Router.get("/Reviews/:branchId", getReviewsBranch) // Reviews of that branch
feature3Router.get("/ReviewsBranchOverAll/:branchId", getReviewsBranchOverAll) // Overall rating of that branch
feature3Router.get("/StarGraph/:branchId", getStarGraph) // Star graph of that branch

feature3Router.get("/MyReviews", getMyReviews); // Get my reviews of the user who login right now

feature3Router.post("/ReviewDelivery/:branchId", postReviewDelivery); // Post from Delivery review
feature3Router.post("/ReviewReservation/:branchId", postReviewReservation); // Post from Reservation review

feature3Router.post("/VenuesFavourites/:venueId", )


export default feature3Router;

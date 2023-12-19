import { Router } from "express";

// here import your controllers(function)
import {
    getReviewsBranch,
    postReviewDelivery,
    postReviewReservation,
    getVenBranchPage,
    getMyReviews,
    getReviewsBranchOverAll,
    getRecommendedPlaces,
    getVenuesPage,
    getVenDetail,
    getVenDetailMenu,
    getStarGraph,
    getPromotionHomePage,
    getVoucherVenueDetail,
    getVoucherVenueDetailOfUser,
    




} from "../controllers/feature3.controller";
import { get } from "http";

const feature3Router = Router();

feature3Router.get("/VenuesPage", getVenuesPage) // Venue details with branchId

feature3Router.get("/RecommendedPlaces", getRecommendedPlaces) // Venue details with branchId that rate > 4

feature3Router.get("/VenBranchPage/:venueId", getVenBranchPage) // Branch with venue details

feature3Router.get("/VenDetail/:branchId", getVenDetail) // Reviews of that branch
feature3Router.get("/VenDetailMenu/:branchId", getVenDetailMenu) // Reviews of that branch

feature3Router.get("/Reviews/:branchId", getReviewsBranch) // Reviews of that branch
feature3Router.get("/ReviewsBranchOverAll/:branchId", getReviewsBranchOverAll) // Overall rating of that branch
feature3Router.get("/StarGraph/:branchId", getStarGraph) // Star graph of that branch

feature3Router.get("/MyReviews", getMyReviews); // Get my reviews of the user who login right now

feature3Router.post("/ReviewDelivery/:branchId", postReviewDelivery); // Post from Delivery review
feature3Router.post("/ReviewReservation/:branchId", postReviewReservation); // Post from Reservation review

feature3Router.post("/VenuesFavourites/:venueId", )


// Integrated with feature 5
feature3Router.get("/PromotionHomePage", getPromotionHomePage) // Get promotion for home page

feature3Router.get("/VoucherVenueDetail/:branchId", getVoucherVenueDetail) // Get voucher for venue detail page
feature3Router.get("/VoucherVenueDetailOfUser", getVoucherVenueDetailOfUser)


export default feature3Router;

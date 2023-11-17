import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature3Client = new PrismaClient();

export const getfeature3 = async (req: Request, res: Response) => {};

export const getAdvertisements = async (req: Request, res: Response) => {
    try {
        const advertisement = await feature3Client.ad_business.findMany();
        return res.json(advertisement);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getVenues = async (req: Request, res: Response) => {
    try {
        const venue = await feature3Client.venue.findMany();
        return res.json(venue);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getVenuesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;

        const venues = await feature3Client.venue.findMany({
            where: {
                category: category,
            },
        });

        return res.json(venues);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getVenueBranch = async (req: Request, res: Response) => {
    const { branchId } = req.params;

    try {
        const venueBranch = await feature3Client.venue_branch.findUnique({
            where: {
                branchId: parseInt(branchId),
            },
            include: {
                venue: true,
                Orders: true,
                Stocks: true,
            },
        });

        if (!venueBranch) {
            return res.status(404).json({ error: "Venue branch not found" });
        }

        return res.json(venueBranch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllMenusByVenueId = async (req: Request, res: Response) => {
    const { venueId } = req.params;

    try {
        const menus = await feature3Client.menu.findMany({
            where: {
                venueId: parseInt(venueId),
            },
        });

        return res.json(menus);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getVenueContacts = async (req: Request, res: Response) => {
    const { venueId } = req.params;

    try {
        const venueContacts = await feature3Client.venue_contacts.findMany({
            where: {
                venueId: parseInt(venueId),
            },
        });

        return res.json(venueContacts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getVenueReviews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reviews = await feature3Client.venue_reviews.findMany({
            where: {
                venuId: parseInt(id),
            },
        });
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getVenuesRatings = async (req: Request, res: Response) => {
    try {
        const ratings = await feature3Client.$queryRaw`
            SELECT venuId, AVG(rating) as rating
            FROM Venue_reviews
            GROUP BY venuId
        `;

        return res.json(ratings);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getVenueKeywords = async (req: Request, res: Response) => {
    const { venueId } = req.params;

    try {
        const venueKeywords = await feature3Client.venue_keywords.findMany({
            where: {
                venueId: parseInt(venueId),
            },
            include: {
                venue: true,
            },
        });

        return res.json(venueKeywords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getVenuePhotos = async (req: Request, res: Response) => {
    const { venueId } = req.params;

    try {
        const venuePhotos = await feature3Client.venue_photo.findMany({
            where: {
                venueId: parseInt(venueId),
            },
        });

        return res.json(venuePhotos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getOpeningDay = async (req: Request, res: Response) => {
    const { venueId, openingDayId } = req.params;

    try {
        const openingDay = await feature3Client.opening_day.findUnique({
            where: {
                openingDayId: parseInt(openingDayId),
                venueId: parseInt(venueId),
            },
            include: {
                venue: true,
            },
        });

        if (!openingDay) {
            return res.status(404).json({ error: "Opening day not found" });
        }

        return res.json(openingDay);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getSearchHistory = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const history = await feature3Client.search_history.findMany({
            where: {
                userId: parseInt(user_id),
            },
        });

        return res.json(history);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const addVenueReview = async (req: Request, res: Response) => {
    const { venuId, userId, rating, review } = req.body;

    try {
        // Check if the user and venue exist (you may need additional validations)
        const userExists = await feature3Client.user.findUnique({
            where: { userId },
        });

        const venueExists = await feature3Client.venue.findUnique({
            where: { venueId: venuId },
        });

        if (!userExists || !venueExists) {
            return res.status(404).json({ error: "User or Venue not found" });
        }

        // Create a new VenueReview
        const newReview = await feature3Client.venue_reviews.create({
            data: {
                venuId,
                userId,
                rating,
                review,
            },
        });

        return res.json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const editVenueReview = async (req: Request, res: Response) => {
    const { venueReviewId } = req.params;
    const { rating, review } = req.body;

    try {
        // Check if the review exists
        const existingReview = await feature3Client.venue_reviews.findUnique({
            where: { venueReviewId: parseInt(venueReviewId) },
        });

        if (!existingReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Update the existing review with the provided fields
        const updatedReview = await feature3Client.venue_reviews.update({
            where: { venueReviewId: parseInt(venueReviewId) },
            data: {
                rating: rating !== undefined ? rating : existingReview.rating,
                review: review !== undefined ? review : existingReview.review,
            },
        });

        return res.json(updatedReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteVenueReview = async (req: Request, res: Response) => {
    const { venueReviewId } = req.params;

    try {
        // Check if the review exists
        const existingReview = await feature3Client.venue_reviews.findUnique({
            where: { venueReviewId: parseInt(venueReviewId) },
        });

        if (!existingReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Delete the existing review
        await feature3Client.venue_reviews.delete({
            where: { venueReviewId: parseInt(venueReviewId) },
        });

        return res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllDiscountVouchers = async (req: Request, res: Response) => {
    try {
        const discountVouchers =
            await feature3Client.discount_voucher.findMany();
        return res.json(discountVouchers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllFoodVouchers = async (req: Request, res: Response) => {
    try {
        const foodVouchers = await feature3Client.food_voucher.findMany();
        return res.json(foodVouchers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

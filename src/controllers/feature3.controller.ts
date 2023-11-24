import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import * as fs from "fs";
import { type } from "os";
import * as path from "path";

const feature3Client = new PrismaClient();

export const getfeature3 = async (req: Request, res: Response) => {};

const executePythonFile = async (pythonScriptPath: string, arg: string) => {
    return new Promise((resolve, reject) => {
        const { exec } = require("child_process");
        console.log(pythonScriptPath);
        exec(
            `python ${"../backend-integrated/src/services/sentimentAnalysis/func.py"} --review "${arg}"`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(
                        `Error executing Python script: ${error.message}`
                    );
                    reject(error);
                } else {
                    try {
                        const resultObject = JSON.parse(stdout);
                        resolve(resultObject);
                    } catch (parseError) {
                        console.error(`Error parsing JSON: ${parseError}`);
                        reject(parseError);
                    }
                }
            }
        );
    });
};

export const getSentimentAnalysis = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const review = await feature3Client.venue_reviews.findMany({
            where: {
                venueReviewId: parseInt(id),
            } as any,
        });

        if (review && review.length > 0) {
            const review_txt = review[0].review;

            // Check if review_txt is not null before proceeding
            if (review_txt !== null) {
                const pythonPath = "../services/sentimentAnalysis/func.py";

                if (fs.existsSync(path.resolve(__dirname, pythonPath))) {
                    try {
                        const sentiment_analysis = await executePythonFile(
                            pythonPath,
                            review_txt
                        );
                        return res.json(sentiment_analysis);
                    } catch (error) {
                        console.error("Error in executePythonFile:", error);
                        return res
                            .status(500)
                            .json({ error: "Error executing Python file" });
                    }
                } else {
                    console.error(
                        `Python file not found at path: ${pythonPath}`
                    );
                    return res
                        .status(500)
                        .json({ error: "Python file not found" });
                }
            } else {
                console.error(`Review is null for venueReviewId: ${id}`);
                return res.status(404).json({ error: "Review is null" });
            }
        } else {
            console.error(`Review not found for venueReviewId: ${id}`);
            return res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

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
                branchId: parseInt(id),
            },
        });
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getRecommendedVenues = async (req: Request, res: Response) => {
    try {
        const ratings = await feature3Client.$queryRaw`
            SELECT venuId, AVG(rating) as rating
            FROM Venue_reviews
            GROUP BY venuId
            HAVING AVG(rating) >= 4.0
        `;

        return res.json(ratings);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getVenuesRatings = async (req: Request, res: Response) => {
    try {
        const ratings = await feature3Client.$queryRaw`
            SELECT branchId, AVG(rating) as rating
            FROM Venue_reviews
            GROUP BY branchId
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

export const getPhotos = async (req: Request, res: Response) => {
    try {
        const photos = await feature3Client.venue_photo.findMany();
        return res.json(photos);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
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
    const { venueId,branchId, userId, rating, review } = req.body;

    try {
        // Check if the user and venue exist (you may need additional validations)
        const userExists = await feature3Client.user.findUnique({
            where: { userId },
        });

        const venueExists = await feature3Client.venue.findUnique({
            where: { venueId: venueId },
        });

        if (!userExists || !venueExists) {
            return res.status(404).json({ error: "User or Venue not found" });
        }

        // Create a new VenueReview
        const newReview = await feature3Client.venue_reviews.create({
            data: {
                branchId,
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

export const getFoodReviews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reviews = await feature3Client.food_reviews.findMany({
            where: {
                menuId: parseInt(id),
            } as any,
        });
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const addFoodReview = async (req: Request, res: Response) => {
    const { menuId, userId, rating, review } = req.body;

    // Get time now
    const date_added = new Date();

    try {
        // Check if the user and venue exist (you may need additional validations)
        const userExists = await feature3Client.user.findUnique({
            where: { userId },
        });

        const foodExists = await feature3Client.menu.findUnique({
            where: { menuId },
        });

        if (!userExists || !foodExists) {
            return res.status(404).json({ error: "User or Food not found" });
        }

        // Create a new FoodReview
        const newReview = await feature3Client.food_reviews.create({
            data: {
                menuId,
                userId,
                rating,
                review,
                date_added,
            } as any,
        });

        return res.json(newReview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const editFoodReview = async (req: Request, res: Response) => {
    const { foodReviewId } = req.params;
    const { rating, review } = req.body;

    try {
        // Check if the review exists
        const existingReview = await feature3Client.food_reviews.findUnique({
            where: { foodReviewId: parseInt(foodReviewId) },
        });

        if (!existingReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Update the existing review with the provided fields
        const updatedReview = await feature3Client.food_reviews.update({
            where: { foodReviewId: parseInt(foodReviewId) },
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

export const deleteFoodReview = async (req: Request, res: Response) => {
    const { foodReviewId } = req.params;

    try {
        // Check if the review exists
        const existingReview = await feature3Client.food_reviews.findUnique({
            where: { foodReviewId: parseInt(foodReviewId) },
        });

        if (!existingReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        // Delete the existing review
        await feature3Client.food_reviews.delete({
            where: { foodReviewId: parseInt(foodReviewId) },
        });

        return res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


























/////////////////////////////////////////////////////////////////////////////
export const getVen = async (req: Request, res: Response) => {
    try {
        const Ven = await feature3Client.$queryRaw`
            SELECT venueId, name, description, category, capacity, 
            chatRoomId, locationId, website_url
            FROM Venue
            Order by venueId;
        `;

        return res.json(Ven);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getBranch = async (req: Request, res: Response) => {
    try {
        const Branch = await feature3Client.$queryRaw`
            SELECT venueId, branchId, branch_name
            FROM Venue_branch
            Order by branchId;
        `;

        return res.json(Branch);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getBranchVenue = async (req: Request, res: Response) => {
    try {
        const BranchVenue = await feature3Client.$queryRaw`
            SELECT VB.venueId, branchId, branch_name, name, description, category, capacity, 
            chatRoomId, locationId, website_url
            FROM Venue_branch VB, Venue V
            WHERE VB.venueId = V.venueId
        `;

        return res.json(BranchVenue);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getBranchRate = async (req: Request, res: Response) => {
    try {
        const BranchRate = await feature3Client.$queryRaw`
            SELECT VB.branchId, VR.rating
            FROM Venue_branch VB, Venue_reviews VR
            WHERE VB.branchId = VR.branchId
            ORDER BY branchId;
        `;

        return res.json(BranchRate);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getVenRate = async (req: Request, res: Response) => {
    try {
        const VenRate = await feature3Client.$queryRaw`
            SELECT V.venueId, VB.branchId, name, description, category, capacity,
            chatRoomId, locationId, website_url, AVG(VR.rating) as rating
            FROM Venue V, Venue_branch VB, Venue_reviews VR
            WHERE V.venueId = VB.venueId AND VB.branchId = VR.branchId
            GROUP BY V.venueId, VB.branchId
            ORDER BY V.venueId;
        `;

        return res.json(VenRate);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getVenRate4 = async (req: Request, res: Response) => {
    try {
        const VenRate4 = await feature3Client.$queryRaw`
            SELECT V.venueId, VB.branchId, name, description, category, capacity,
            chatRoomId, locationId, website_url, AVG(VR.rating) as rating
            FROM Venue V, Venue_branch VB, Venue_reviews VR
            WHERE V.venueId = VB.venueId AND VB.branchId = VR.branchId
            GROUP BY V.venueId, VB.branchId
            HAVING AVG(VR.rating) >= 4
            ORDER BY V.venueId;
        `;

        return res.json(VenRate4);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};


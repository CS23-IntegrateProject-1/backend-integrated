import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature3Client = new PrismaClient();

export const getfeature3 = async (req: Request, res: Response) => {};

// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getAdvertisements = async (req: Request, res: Response) => {
    try {
        const advertisement = await feature3Client.advertisement.findMany();
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

export const getVenueOverviews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const overviews = await feature3Client.venue_overviews.findMany({
            where: {
                venueId: parseInt(id),
            },
        });
        return res.json(overviews);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getVenuePhotos = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const photos = await feature3Client.venue_photo.findMany({
            where: {
                venueId: parseInt(id),
            },
        });
        return res.json(photos);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getSearchHistory = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const history = await feature3Client.search_history.findMany({
            where: {
                id: parseInt(user_id),
            },
        });
        return res.json(history);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

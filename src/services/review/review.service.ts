import { PrismaClient } from "@prisma/client";

class ReviewService {
    prisma = new PrismaClient();

    getReviewByUserId(userId: number) {
        try
        {const review = this.prisma.venue_reviews.findMany({
            where: {
                userId: userId
            }
        })

        return review;}
        catch(e) {
            console.log(e);
            throw new Error("Prisma Error")
        }
    }
}

export default new ReviewService();
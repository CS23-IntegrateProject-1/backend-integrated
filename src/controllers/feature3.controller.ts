import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import authService from "../services/auth/auth.service";

const feature3Client = new PrismaClient();

interface VenueInfo {
  venueId: number;
  branchId: number;
  name: string;
  description: string;
  category: string;
  capacity: number;
  chatRoomId: number;
  locationId: number;
  website_url: string;
  rating: string;
  venue_picture: string;
}

export const getVenuesPage = async (req: Request, res: Response) => {
  const decoded = authService.decodeToken(req.cookies.authToken);
  const userId = decoded ? decoded.userId : null;

  const search = String(req.query.search || "");
  const priceMin = Number(req.query.priceMin || 0);
  const priceMax = Number(req.query.priceMax || 1000);
  const capacity = String(req.query.capacity || "")
    .split(",")
    .filter((v) => v !== "");
  const category = String(req.query.category || "")
    .split(",")
    .filter((v) => v !== "");
  // console.log(category)
  try {
    const [VenuesPage, menus, tables, venues] = await Promise.all([
      feature3Client.$queryRaw<VenueInfo[]>`
    SELECT
      V.venueId,
      VB.branchId,
      name,
      description,
      category,
      capacity,
      chatRoomId,
      locationId,
      website_url,
      COALESCE(AVG(VR.rating), 0) AS rating,
      venue_picture
    FROM
      Venue V
      JOIN Venue_branch VB ON V.venueId = VB.venueId
      LEFT JOIN Venue_reviews VR ON VB.branchId = VR.branchId
    GROUP BY
      V.venueId
    ORDER BY
      V.venueId;
  `,
      feature3Client.menu.findMany({}),
      feature3Client.table_type_detail.findMany({}),
      feature3Client.venue.findMany({}),
    ]);

    const filteredVenues = VenuesPage.filter((v) =>
      String(v.name)
        .trim()
        .toLowerCase()
        .includes(String(search).trim().toLowerCase())
    )
      .filter((v) => {
        const venueCategoryMatch = venues.filter(
          (vs) => vs.venueId === v.venueId
        );
        const statements: boolean[] = [];

        if (category.length === 0) {
          return true;
        }

        if (category.includes("Restaurant")) {
          statements.push(
            venueCategoryMatch.some((vs) => vs.category == "Restaurant")
          );
        }

        if (category.includes("Club")) {
          statements.push(
            venueCategoryMatch.some((vs) => vs.category == "Club")
          );
        }

        if (category.includes("Bar")) {
          statements.push(
            venueCategoryMatch.some((vs) => vs.category == "Bar")
          );
        }

        return statements.some((v) => v === true);
      })
      .filter((v) => {
        const venueMenus = menus.filter((m) => m.venueId === v.venueId);
        const statements: boolean[] = [];
        if (priceMin === 0 && priceMax === 1000) {
          return true;
        }
        statements.push(
          venueMenus.some(
            (m) =>
              m.price.greaterThanOrEqualTo(priceMin) &&
              m.price.lessThanOrEqualTo(priceMax)
          )
        );
        return statements.some((v) => v === true);
      })
      .filter((v) => {
        const venueTables = tables.filter((t) => t.venueId === v.venueId);
        const statements: boolean[] = [];

        if (capacity.length === 0) {
          return true;
        }

        if (capacity.includes("1TO4")) {
          statements.push(
            venueTables.some((t) => t.capacity >= 1 && t.capacity <= 4)
          );
        }

        if (capacity.includes("5TO6")) {
          statements.push(
            venueTables.some((t) => t.capacity >= 5 && t.capacity <= 6)
          );
        }

        if (capacity.includes("7TO10")) {
          statements.push(
            venueTables.some((t) => t.capacity >= 7 && t.capacity <= 10)
          );
        }

        if (capacity.includes("11M")) {
          statements.push(venueTables.some((t) => t.capacity >= 11));
        }
        return statements.some((v) => v === true);
      });

    const filteredVenuesWithFavourite = await Promise.all(
      filteredVenues.map(async (venue) => {
        const foundVenue = await feature3Client.saved_place.findFirst({
          where: {
            userId,
            venueId: venue.venueId,
          },
        });
        return {
          ...venue,
          isFavourite: foundVenue ? true : false,
        };
      })
    );

    console.log(filteredVenuesWithFavourite)
    return res.json(filteredVenuesWithFavourite);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

interface RPVenueInfo {
  venueId: number;
  branchId: number;
  name: string;
  description: string;
  category: string;
  capacity: number;
  chatRoomId: number;
  locationId: number;
  website_url: string;
  rating: string;
  venue_picture: string;
}

export const getRecommendedPlaces = async (req: Request, res: Response) => {
  const decoded = authService.decodeToken(req.cookies.authToken);
  const userId = decoded ? decoded.userId : null;

  const search = String(req.query.search || "");
  const priceMin = Number(req.query.priceMin || 0);
  const priceMax = Number(req.query.priceMax || 1000);
  const capacity = String(req.query.capacity || "")
    .split(",")
    .filter((v) => v !== "");
  const category = String(req.query.category || "")
    .split(",")
    .filter((v) => v !== "");
  // console.log(category)
  try {
    const [RecommendedPlaces, menus, tables, venues] = await Promise.all([
      feature3Client.$queryRaw<RPVenueInfo[]>`
            SELECT V.venueId, VB.branchId, name, description, category, capacity,
            chatRoomId, locationId, website_url, COALESCE(AVG(VR.rating) , 0) as rating, venue_picture
            FROM Venue V, Venue_branch VB, Venue_reviews VR
            WHERE V.venueId = VB.venueId AND VB.branchId = VR.branchId
            GROUP BY V.venueId
            HAVING AVG(VR.rating) >= 4
            ORDER BY V.venueId;
          `,
      feature3Client.menu.findMany({}),
      feature3Client.table_type_detail.findMany({}),
      feature3Client.venue.findMany({}),
    ]);

    const filteredVenues = RecommendedPlaces.filter((v) =>
      String(v.name)
        .trim()
        .toLowerCase()
        .includes(String(search).trim().toLowerCase())
    )
      .filter((v) => {
        const venueCategoryMatch = venues.filter(
          (vs) => vs.venueId === v.venueId
        );
        const statements: boolean[] = [];

        if (category.length === 0) {
          return true;
        }

        if (category.includes("Restaurant")) {
          statements.push(
            venueCategoryMatch.some((vs) => vs.category == "Restaurant")
          );
        }

        if (category.includes("Club")) {
          statements.push(
            venueCategoryMatch.some((vs) => vs.category == "Club")
          );
        }

        if (category.includes("Bar")) {
          statements.push(
            venueCategoryMatch.some((vs) => vs.category == "Bar")
          );
        }

        return statements.some((v) => v === true);
      })
      .filter((v) => {
        const venueMenus = menus.filter((m) => m.venueId === v.venueId);
        const statements: boolean[] = [];
        if (priceMin === 0 && priceMax === 1000) {
          return true;
        }
        statements.push(
          venueMenus.some(
            (m) =>
              m.price.greaterThanOrEqualTo(priceMin) &&
              m.price.lessThanOrEqualTo(priceMax)
          )
        );
        return statements.some((v) => v === true);
      })
      .filter((v) => {
        const venueTables = tables.filter((t) => t.venueId === v.venueId);
        const statements: boolean[] = [];

        if (capacity.length === 0) {
          return true;
        }

        if (capacity.includes("1TO4")) {
          statements.push(
            venueTables.some((t) => t.capacity >= 1 && t.capacity <= 4)
          );
        }

        if (capacity.includes("5TO6")) {
          statements.push(
            venueTables.some((t) => t.capacity >= 5 && t.capacity <= 6)
          );
        }

        if (capacity.includes("7TO10")) {
          statements.push(
            venueTables.some((t) => t.capacity >= 7 && t.capacity <= 10)
          );
        }

        if (capacity.includes("11M")) {
          statements.push(venueTables.some((t) => t.capacity >= 11));
        }
        return statements.some((v) => v === true);
      });

      const filteredVenuesWithFavourite_RP = await Promise.all(
        filteredVenues.map(async (venue) => {
          const foundVenue = await feature3Client.saved_place.findFirst({
            where: {
              userId,
              venueId: venue.venueId,
            },
          });
          return {
            ...venue,
            isFavourite: foundVenue ? true : false,
          };
        })
      );

    return res.json(filteredVenuesWithFavourite_RP);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getVenBranchPage = async (req: Request, res: Response) => {
  const { venueId } = req.params;
  const venueIdInt = parseInt(venueId);

  try {
    const VenBranchPage = await feature3Client.$queryRaw`
  SELECT
    VB.branchId,
    V.venueId,
    VB.venueId,
    VB.branch_name,
    V.name,
    COALESCE(AVG(VR.rating), 0) AS rating
  FROM
    Venue_branch VB
    LEFT JOIN Venue_reviews VR ON VB.branchId = VR.branchId
    JOIN Venue V ON V.venueId = VB.venueId
  WHERE
    VB.venueId = ${venueIdInt}
  GROUP BY
    VR.branchId;
`;
    console.log(VenBranchPage);
    return res.json(VenBranchPage);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getVenDetail = async (req: Request, res: Response) => {
  const { branchId } = req.params;
  const branchIdInt = parseInt(branchId);

  try {
    const VenDetail = await feature3Client.$queryRaw`
      SELECT V.venueId, VB.branchId, name, VB.branch_name, description, category, capacity,
        chatRoomId, locationId, website_url, COALESCE(AVG(VR.rating), 0) as rating, venue_picture
      FROM Venue V
      JOIN Venue_branch VB ON V.venueId = VB.venueId
      LEFT JOIN Venue_reviews VR ON VB.branchId = VR.branchId
      WHERE VB.branchId = ${branchIdInt}
      GROUP BY V.venueId, VB.branchId
      ORDER BY V.venueId;
    `;

    return res.json(VenDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getVenDetailMenu = async (req: Request, res: Response) => {
  const { branchId } = req.params;
  const branchIdInt = parseInt(branchId);

  try {
    const VenDetailMenu = await feature3Client.$queryRaw`
      SELECT DISTINCT M.venueId, M.menuId, M.name, M.description, M.price, M.image
      FROM Venue V
      JOIN Venue_branch VB ON V.venueId = VB.venueId
      LEFT JOIN Menu M ON V.venueId = M.venueId
      WHERE VB.branchId = ${branchIdInt}
      ORDER BY V.venueId;
    `;

    return res.json(VenDetailMenu);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getReviewsBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const branchIdInt = parseInt(branchId);
    const reviewStars = String(req.query.reviewStars || "")
      .split(",")
      .filter((v) => v !== "");
    const reviewTypes = String(req.query.reviewTypes || "")
      .split(",")
      .filter((v) => v !== "");

    const reviewsBranch: { review_type: string; rating: number }[] =
      await feature3Client.$queryRaw`
    SELECT U.userId, U.username, VR.branchId, VR.venueReviewId, VR.rating, VR.review, VR.date_added, VR.review_type
    FROM Venue_reviews VR, User U
    WHERE VR.branchId = ${branchIdInt} AND VR.userId = U.userId
    ORDER BY VR.date_added DESC;
    `;

    const filteredReviews = reviewsBranch.filter((review) => {
      // console.log(reviewTypes, reviewStars);
      const reviewTypeMatch =
        reviewTypes.length === 0
          ? true
          : reviewTypes.includes(review.review_type);
      const reviewStarMatch =
        reviewStars.length === 0
          ? true
          : reviewStars.includes(String(review.rating));
      return reviewTypeMatch && reviewStarMatch;
    });

    res.status(200).json(filteredReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json(error);
  }
};

interface ReviewsBranchOverAll_Interface {
  branchId: number;
  venueReviewId: number;
  rating: number;
  total_reviews: number;
}

export const getReviewsBranchOverAll = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const branchIdInt = Number(branchId);

    const ReviewsBranchOverAll: ReviewsBranchOverAll_Interface[] =
      await feature3Client.$queryRaw`
      SELECT V.name, VR.branchId, venueReviewId, AVG(VR.rating) as rating, count(review) as total_reviews
      FROM Venue_reviews VR, Venue_branch VB, Venue V
      WHERE VR.branchId = ${branchIdInt} AND VB.branchId = VR.branchId AND VB.venueId = V.venueId
      GROUP BY branchId;
`;

    ReviewsBranchOverAll.forEach(
      (RBOAObject: ReviewsBranchOverAll_Interface) => {
        RBOAObject.rating = Number(RBOAObject.rating);
        RBOAObject.total_reviews = Number(RBOAObject.total_reviews);
      }
    );

    return res.json(ReviewsBranchOverAll);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json(error);
  }
};

interface StarGraph_Interface {
  branchId: number;
  rating: number;
  total_per_rating: number;
  total_ratings_per_branch: number;
}

export const getStarGraph = async (req: Request, res: Response) => {
  const { branchId } = req.params;
  const branchIdInt = Number(branchId);

  try {
    const StarGraph: StarGraph_Interface[] = await feature3Client.$queryRaw`
      SELECT B.branchId, R.rating, COALESCE(COUNT(VR.rating), 0) AS total_per_rating,
        SUM(COALESCE(COUNT(VR.rating), 0)) OVER (PARTITION BY B.branchId) AS total_ratings_per_branch
      FROM ( SELECT DISTINCT branchId FROM Venue_reviews ) B
        CROSS JOIN ( SELECT DISTINCT rating FROM Venue_reviews ) R
        LEFT JOIN Venue_reviews VR ON B.branchId = VR.branchId AND R.rating = VR.rating
      WHERE B.branchId = ${branchIdInt}
      GROUP BY B.branchId, R.rating
      ORDER BY B.branchId, R.rating;
      `;

    StarGraph.forEach((SGObject: StarGraph_Interface) => {
      SGObject.total_per_rating = Number(SGObject.total_per_rating);
      SGObject.total_ratings_per_branch = Number(
        SGObject.total_ratings_per_branch
      );
    });

    return res.json(StarGraph);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json(error);
  }
};

export const getMyReviews = async (req: Request, res: Response) => {
  try {
    const userId = authService.decodeToken(req.cookies.authToken).userId;

    const reviewStars = String(req.query.reviewStars || "")
      .split(",")
      .filter((v) => v !== "");
    const reviewTypes = String(req.query.reviewTypes || "")
      .split(",")
      .filter((v) => v !== "");

    // const myReviews = await feature3Client.venue.findMany({
    //   where: {
    //     Venue_branch: {
    //       some: {
    //         Venue_reviews: {
    //           some: {
    //             userId: userId,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     Venue_branch: {
    //       where: {
    //         Venue_reviews: {
    //           some: {
    //             userId: userId,
    //           },
    //         },
    //       },
    //       include: {
    //         Venue_reviews: {
    //           where: {
    //             userId: userId,
    //           },
    //           orderBy: {
    //             date_added: "desc",
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const myReviews: { review_type: string; rating: number }[] =
      await feature3Client.$queryRaw`
    SELECT V.name, V.description, V.category, V.venueId, VB.branchId, VB.branch_name, VR.rating, VR.review, VR.date_added, VR.venueReviewId, VR.review_type
    FROM Venue V, Venue_branch VB, Venue_reviews VR
    WHERE V.venueId = VB.venueId AND VB.branchId = VR.branchId AND userId = ${userId}
    ORDER BY VR.date_added DESC;
    `;

    const filteredReviews = myReviews.filter((review) => {
      // console.log(reviewTypes, reviewStars)
      const reviewTypeMatch =
        reviewTypes.length === 0
          ? true
          : reviewTypes.includes(review.review_type);
      const reviewStarMatch =
        reviewStars.length === 0
          ? true
          : reviewStars.includes(String(review.rating));
      return reviewTypeMatch && reviewStarMatch;
    });

    res.status(200).json(filteredReviews);
  } catch (error) {
    console.error("Error from getMyReviews Backend: ", error);
    return res.status(500).json(error);
  }
};

export const postReviewDelivery = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body;
    const userId = authService.decodeToken(req.cookies.authToken).userId;
    const { branchId } = req.params;
    const branchIdInt = Number(branchId);

    const newReview = await feature3Client.venue_reviews.create({
      data: {
        userId,
        rating,
        review,
        branchId: branchIdInt,
        review_type: "Delivery",
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json(error);
  }
};

export const postReviewReservation = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body;
    const userId = authService.decodeToken(req.cookies.authToken).userId;
    const { branchId } = req.params;
    const branchIdInt = Number(branchId);

    const newReview = await feature3Client.venue_reviews.create({
      data: {
        userId,
        rating,
        review,
        branchId: branchIdInt,
        review_type: "Reservation",
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json(error);
  }
};

export const postVenuesFavourites = async (req: Request, res: Response) => {
  try {
    const userId = Number(
      authService.decodeToken(req.cookies.authToken).userId
    );
    const { venueId } = req.params;
    const venueIdInt = Number(venueId);

    const foundVenue = await feature3Client.saved_place.findFirst({
      where: {
        userId,
        venueId: venueIdInt,
      },
    });

    if (foundVenue) {
      await feature3Client.saved_place.deleteMany({
        where: {
          userId,
          venueId: venueIdInt,
        },
      });
      const toggledFavourite = await feature3Client.saved_place.findFirst({
        where: {
          userId,
          venueId: venueIdInt,
        },
      });

      return res.status(200).json(toggledFavourite);
    } else {
      const newFavourite = await feature3Client.saved_place.create({
        data: {
          userId,
          venueId: venueIdInt,
        },
        // Saved_place: {
        //   create: {
        //     venueId: venueIdInt
        //   }
        // }
      });
      return res.status(201).json(newFavourite);
    }
  } catch (error) {
    console.error("Error creating favourite:", error);
    res.status(500).json(error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPromotionHomePage = async (req: Request, res: Response) => {
  try {
    const PromotionHomePage = await feature3Client.$queryRaw`
      SELECT P.promotionId, P.name, P.description, P.image_url, P.isApprove, P.venueId, P.menuId, P.branchId
      FROM Promotion P
      WHERE P.isApprove = "Completed"
      ORDER BY P.promotionId;
    `;

    return res.json(PromotionHomePage);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const getVoucherVenueDetail = async (req: Request, res: Response) => {
  const { branchId } = req.params;
  const branchIdInt = parseInt(branchId);

  try {
    const VoucherVenueDetail = await feature3Client.$queryRaw`
      SELECT Vou.voucherId, Vou.venueId, VB.branchId, Vou.voucher_name, Vou.description, Vou.voucher_image, Vou.isApprove
      FROM Voucher Vou, Venue V, Venue_branch VB
      WHERE Vou.venueId = V.venueId AND Vou.isApprove = "Completed" AND VB.branchId = ${branchIdInt} AND VB.venueId = V.venueId
    `;

    return res.json(VoucherVenueDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

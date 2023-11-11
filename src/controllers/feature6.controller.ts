import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
// import { addMinutes } from 'date-fns';

const feature6Client = new PrismaClient();

// export const getfeature6 = async (req: Request, res: Response) => {

// };

//GET METHOD
export const getAllTable = async (req: Request, res: Response) => {
    try {
        const tables = await feature6Client.tables.findMany();
        return res.json(tables);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

export const getAllReservation = async (req: Request, res: Response) => {
    try {
        const reservations = await feature6Client.reservation.findMany();
        return res.json(reservations);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

//My Reservation
export const getAllReservationByStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const { status, userId } = req.body;
        const Reservation = await feature6Client.reservation.findMany({
            where: {
                status: status,
                userId: userId,
            },
            include: {
                Venue: {
                    include: {
                        Venue_photo: true,
                        Menu: {
                            select: {
                                price: true,
                            },
                            orderBy: {
                                price: "asc",
                            },
                            take: 1,
                        },
                    },
                },
                User: {
                    select: {
                        userId: true,
                        username: true,
                    },
                },
            },
        });

        return res.json(Reservation);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};

export const getVenueById = async (req: Request, res: Response) => {
    try {
        const { venueId } = req.params;
        const venue = await feature6Client.venue.findUnique({
            where: {
                venueId: parseInt(venueId),
            },
            include: {
                // location: true,
                Venue_photo: true,
            },
        });
        return res.json(venue);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};


export const getReservationById = async (req: Request, res: Response) => {
    try {
        const reservations = await feature6Client.reservation.findMany({
            where: {
                userId: parseInt(req.body.userId),
                reservationId: parseInt(req.params.reservationId),
            },
            include: {
                User: true,
                Deposit: {
                    select: {
                        deposit_amount: true,
                        status: true,
                        depositId: true,
                    },
                },
            },
        });
        return res.json(reservations);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

// export const createReservation = async (req: Request, res: Response) => {
//     try {
//         const { guest_amount, reserved_time } = req.body;
//         //Change when merge branch 
//         // const entry_time = addMinutes(new Date(reserved_time), -30);
//         const entry_time = new Date(reserved_time.getTime() - 30 * 60000);
//         const reservation = await feature6Client.reservation.create({
//             data:  {
//                 guest_amount: guest_amount,
//                 reserved_time: reserved_time,
//                 status: "Pending",
//                 // Don't have entry time to fetch in the front end
//                 // entry_time: entry_time,
//             },
//         });
//         return res.json(reservation);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json(e);
//     }
// };

//POST METHOD

// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature6Client.users.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

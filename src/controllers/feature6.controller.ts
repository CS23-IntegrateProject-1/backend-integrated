import { PrismaClient, Table_type_detail } from "@prisma/client";
import { Response, Request } from "express";
import { addMinutes, addHours } from "date-fns";

const feature6Client = new PrismaClient();

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

export const getVenueById = async (req: Request, res: Response) => {
    try {
        const { venueId } = req.params;
        const venue = await feature6Client.venue.findUnique({
            where: {
                venueId: parseInt(venueId),
            },
            include: {
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
                user: true,
                deposit: true,
            },
        });
        return res.json(reservations);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

//Start from here
//My Reservation Page (4 status)
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
                venue: {
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
            },
        });

        return res.json(Reservation);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
};

//My Reservation Detail Page
// get address from location table
export const getVenueAndReservationsById = async (
    req: Request,
    res: Response
) => {
    try {
        const { venueId, reservationId } = req.params;
        const venue = await feature6Client.venue.findUnique({
            where: {
                venueId: parseInt(venueId),
            },
            include: {
                Venue_photo: true,
            },
        });

        const reservations = await feature6Client.reservation.findMany({
            where: {
                userId: parseInt(req.body.userId),
                venueId: parseInt(venueId),
                reservationId: parseInt(reservationId),
            },
            include: {
                user: {
                    include: {
                        User_bio: true,
                    },
                },
                deposit: true,
            },
        });

        return res.json({ venue, reservations });
    } catch (e) {
        return res.status(500).json(e);
    }
};

//POST METHOD

// Not finish yet เหลือเก็บทุก table ที่จองไว้ใน Reserve_Table
// มันยังเป็นแบบที่ 1 การจอง จองได้ 1 โต๊ะ
// export const createReservation = async (req: Request, res: Response) => {
//     try {
//     const { venueId, userId, guest_amount, reserved_time } = req.body;
//     // // Use the previous functions to check availability and find a suitable table
//     // const reservedTimeStart = reserved_time;
//     // const reservedTimeEnd = reservedTimeStart.add({ hours: 3 }); // Assuming a reservation lasts for 3 hours
//     // const entry_time = addMinutes(new Date(reserved_time), -30);

//     // const availableTables = await getAvailableTables(reservedTimeStart, reservedTimeEnd);
//     // const selectedTable = findSuitableTable(availableTables, guest_amount);

//     // if (!selectedTable) {
//     //   throw new Error('No suitable tables available.');
//     // }

//     // Create the reservation
//     const newReservation = await feature6Client.reservation.create({
//       data: {
//         userId,
//         venueId,
//         guest_amount: guest_amount,
//         reserved_time: reservedTimeStart,
//         entry_time: entry_time,
//         status: 'Pending',
//         tables: {
//           connect: [{ tableId: selectedTable.tableId }],
//         },
//       },
//       include: {
//         tables: true,
//       },
//     });

//     // Create the reservation table entries for multiple tables
//     const reservationTableEntries = await Promise.all(
//         selectedTables.map(async (table) => {
//           return feature6Client.reservation_table.create({
//             data: {
//               amount: guest_amount,
//               reserveId: newReservation.reservationId,
//               tableId: table.tableId,
//             },
//           });
//         })
//       );

//     res.status(200).json(newReservation);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json(e);
//   }

// function ที่หา reservation ในเวลาเดียวกับที่จะจองเพิ่ม
// Now work with some case, some case not work but I don't know why
export const checkAvailability = async (req: Request, res: Response) => {
    try {
        const { venueId, reservedTimeStart } = req.body;
        console.log("original: " , reservedTimeStart)
        const reservedTimeEnd = addHours(new Date(reservedTimeStart), 3); // Assuming a reservation lasts for 3 hours
        // console.log("add 3 hours",reservedTimeEnd)
        // Convert dates to ISO-8601 format
        const isoStartTime = new Date(reservedTimeStart).toISOString();
        const isoEndTime = reservedTimeEnd.toISOString();

        console.log("ISO")
        console.log("start",isoStartTime);

        console.log("stop",isoEndTime);

        // Query the database to find reservations within the specified time range
        const overlappingReservations =
            await feature6Client.reservation.findMany({
                where: {
                    // venueId,
                    reserved_time: {
                        // gte: isoStartTime,
                        // equals: isoStartTime
                        // gte: reservedTimeStart // Greater than or equal to reservedTimeStart
                    lte: isoEndTime, // Less than or equal to reservedTimeEnd
                    },
                    // status: {
                    //     not: "Cancel",
                    // },
                },
            });
            console.log(overlappingReservations)
        res.status(200).json({ overlappingReservations });
    } catch (e) {
        console.error("Error checking availability:", e);
        return res.status(500).json(e);
    }
};

// export const getAvailableTables = async (req: Request, res: Response) => {
//     try {
//         const { venueId, reservedTimeStart } = req.body;
//         // Calculate the preparation time start (3 hours before the reservation)
//         const preparationTimeStart = addHours(new Date(reservedTimeStart), -3);
//         const reservedTimeEnd = reservedTimeStart.add({ hours: 3 }); // Assuming a reservation lasts for 3 hours

//         // Use the checkAvailability function to get reserved tables during the specified time
//         const checkAvailabilityResponse = await checkAvailability(req, res);

//         // Check if overlappingReservations is defined before mapping
//         const overlappingReservations =
//             (checkAvailabilityResponse?.overlappingReservations || []) as Reservation[];

//         // Query all tables and filter out the reserved tables
//         const allTables = await feature6Client.tables.findMany({
//             where: {
//                 venueId: venueId,
//             },
//         });

//         // Filter tables based on availability during preparation time
//         const reservedTableIds = overlappingReservations.map((reservation) => reservation.tableId);
//         const availableTables = allTables.filter((table) => !reservedTableIds.includes(table.tableId));

//         res.status(200).json({ availableTables });
//     } catch (e) {
//         return res.status(500).json(e);
//     }
// };


//Almost Finish
export const findSuitableTable = async (req: Request, res: Response) => {
    try {
        const { availableTables, guestAmount } = req.body;
        console.log("Received request with guest amount:", guestAmount);

        // Filter tables based on guest capacity
        const suitableTables = availableTables.filter(
            (table) => table.venue.capacity >= guestAmount
        );
        console.log(
            "Filtered tables based on guest capacity. Number of suitable tables:",
            suitableTables.length
        );

        // Sort suitable tables by capacity in ascending order
        suitableTables.sort((a, b) => a.venue.capacity - b.venue.capacity);

        // Find the first table that can accommodate the guest amount
        const selectedTable = suitableTables.find(
            (table) => table.venue.capacity >= guestAmount
        );
        console.log("Selected table:", selectedTable);

        return res.status(200).json({ selectedTable: selectedTable || null });
    } catch (e) {
        return res.status(500).json({ e });
    }
};

//Create table still error
export const createTable = async (req: Request, res: Response) => {
    try {
        const { information, image_url, venueId } = req.body;
        const newTableTypeDetail = (await createTableType(req, res)) as any;

        const newTable = await feature6Client.tables.create({
            data: {
                information: information,
                image_url: image_url,
                tableTypeDetailId: newTableTypeDetail.tableTypeDetailId,
                venueId: venueId,
            },
        });

        return res.json(newTable);
    } catch (e) {
        return res.status(500).json(e);
    }
};

export const createTableType = async (req: Request, res: Response) => {
    try {
        const { name, detail, capacity, venueId } = req.body;
        const newTabletype = await feature6Client.table_type_detail.create({
            data: {
                name: name,
                detail: detail,
                capacity: capacity,
                venueId: venueId,
            },
        });
        return res.json({ newTabletype });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

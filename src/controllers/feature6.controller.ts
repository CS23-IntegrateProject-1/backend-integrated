import { Day, PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { addMinutes, addHours, add } from "date-fns";
import { compareSync } from "bcrypt";

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
//Finished
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
//Finished only get, can't Create
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
        // console.log(venue)

        const location = await feature6Client.location.findUnique({
            where: {
                locationId: venue?.locationId,
            },
            select: {
                address: true,
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

        return res.json({ venue, location, reservations });
    } catch (e) {
        return res.status(500).json(e);
    }
};

//POST METHOD

// Not finish yet
export const createReservation = async (req: Request, res: Response) => {
    try {
        const { venueId, userId, guest_amount, reserved_time } = req.body;
        // Use the previous functions to check availability and find a suitable table
        const reservedTimeStart = reserved_time;
        const reservedTimeEnd = reservedTimeStart.add({ hours: 3 }); // Assuming a reservation lasts for 3 hours
        const entry_time = addMinutes(new Date(reserved_time), -30);

        // const availableTables = await getAvailableTables(reservedTimeStart, reservedTimeEnd);
        // const selectedTable = findSuitableTable(availableTables, guest_amount);

        // if (!selectedTable) {
        //   throw new Error('No suitable tables available.');
        // }

        const depositIds = await feature6Client.deposit.findMany({
            where: {
                venueId: venueId,
            },
            select: {
                depositId: true,
            },
        });

        const depositId = depositIds.length > 0 ? depositIds[0].depositId : -1;

        if (depositId === -1) {
            res.status(400).json({ error: "Insert deposit Id" });
        }
        // Create the reservation
        const newReservation = await feature6Client.reservation.create({
            data: {
                userId,
                venueId,
                guest_amount: guest_amount,
                reserved_time: reservedTimeStart,
                entry_time: entry_time,
                status: "Pending",
                isPaidDeposit: "Pending",
                isReview: false,
                depositId: depositId,
            },
        });

        // Create the reservation table entries for multiple tables
        // const reservationTableEntries = await Promise.all(
        //     selectedTables.map(async (table) => {
        //       return feature6Client.reservation_table.create({
        //         data: {
        //           reserveId: newReservation.reservationId,
        //           tableId: table.tableId,
        //         },
        //       });
        //     })
        //   );

        res.status(200).json(newReservation);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

// function ที่หา reservation ในเวลาเดียวกับที่จะจองเพิ่ม
export const checkAvailability = async (req: Request, res: Response) => {
    try {
        const { venueId, reservedTimeStart } = req.body;
        // console.log("original: ", reservedTimeStart);
        const PrepareReservedTimeStart = addHours(
            new Date(reservedTimeStart),
            5
        );
        // const DatereservedTimeStart = new Date(reservedTimeStart);

        // Extract the date part
        const DateTimeStart: Date = addHours(new Date(reservedTimeStart), 7);
        console.log("DateTimeStart", DateTimeStart);
        const dateOnly = DateTimeStart.toISOString().split('T')[0];
        const TodayDate = new Date(dateOnly)
        console.log("Date --> " + dateOnly);
        // console.log("Date --> " + Date(DateTimeSater))
        // console.log("original+7-2: ", PrepareReservedTimeStart);
        const reservedTimeEnd = addHours(new Date(reservedTimeStart), 10); // Assuming a reservation lasts for 3 hours
        // console.log("+7 && add 3 hours",reservedTimeEnd)
        // Convert dates to ISO-8601 format
        const isoStartTime = new Date(PrepareReservedTimeStart).toISOString();
        const isoEndTime = reservedTimeEnd.toISOString();

        console.log("ISO Time");
        console.log("start", isoStartTime);
        console.log("stop", isoEndTime);

        // Get the day of the week (0-6)
        const [year, month, d] = reservedTimeStart.split(/[- :]/);
        // const gregorianYear = parseInt(year, 10);

        
        const DateString = `${year}-${month}-${d}`;

        const myDate = new Date(DateString);
        const day = myDate.getDay();
        // console.log("day2", day);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        // Get the day name
        const dayName = daysOfWeek[day];

        console.log("day3", dayName);
        // Query the database to find reservations within the specified time range
        const opening = await feature6Client.opening_day.findMany({
            where: {
                venueId,
                day: dayName as Day,
            },
        });

        // console.log("opening array --> " + opening[0].venueId)
        // console.log("opening length --> " + opening.length)
        // console.log(opening);
        
        var notOpen = false;
        const dayBefore = daysOfWeek[day - 1];
        if (opening.length === 0) {
            const openBefore = await feature6Client.opening_day.findMany({
                where: {
                    venueId,
                    day: dayBefore as Day,
                }
            })
            const closeBefore = openBefore[0].closing_hours;
            const closeBeforeString = closeBefore.toISOString().split("T")[1].split(".")[0];

            if (closeBeforeString <= "02:00:00") {
                return res.status(400).json({ error: "Today venue is closed" });
            }
            else {
                notOpen = true;
            }
        }

        var open, close;
        if (notOpen) {
            const openBefore = await feature6Client.opening_day.findMany({
                where: {
                    venueId,
                    day: dayBefore as Day,
                }
            })
            open = openBefore[0].opening_hours;
            close = openBefore[0].closing_hours;
            TodayDate.setDate(TodayDate.getDate() - 1);
        }
        else { 
            open = opening[0].opening_hours; 
            close = opening[0].closing_hours;
        }
        // const openString = open.toISOString().split("T")[1].split(".")[1];
        // console.log("open var --> " + open)
        // const [hours, minutes, seconds] = open.split(':').map(Number);
        // const openDate = TodayDate.setHours(hours, minutes, seconds);
        // const close = opening[0].closing_hours;

        // console.log("close from db --> " + opening[0].closing_hours)

        // หาวิธ๊เปรียบเทียบ เฉพาะเวลา ว่าอยู่หลัง opening และก่อน close(2 ชม) รึเปล่า
        // const open1 = `${open.getUTCHours()}:${open.getUTCMinutes()}:${open.getUTCSeconds()}`;
        // const close1 = `${close.getUTCHours()}:${close.getUTCMinutes()}:${close.getUTCSeconds()}`;

        const RealReservedTimeStart = addHours(new Date(reservedTimeStart), 7);
        const RealisoStartTime = new Date(RealReservedTimeStart).toISOString();
        // Extract the time part from isoStartTime

        // Convert open, close, and two hours before close to string for comparison
        const openString = open.toISOString().split("T")[1].split(".")[0];
        const [hours, minutes, seconds] = openString.split(':').map(Number);
        // console.log("h m i", hours, minutes, seconds)
        const openMS = TodayDate.setHours(hours, minutes, seconds);
        const openDate = addHours(new Date(openMS), 7);
        console.log("openDate", openDate);

        const closeString = close.toISOString().split("T")[1].split(".")[0];
        const [closehours, closeminutes, closeseconds] = closeString.split(':').map(Number);
        // console.log("h m i", hours, minutes, seconds)
        console.log("openString", openString)
        console.log("closeString", closeString)
        if (closeString < openString) {
            // console.log("Hello")
            TodayDate.setDate(TodayDate.getDate() + 1);
        }
        console.log("TodayDate", TodayDate)
        const closeMS = TodayDate.setHours(closehours, closeminutes, closeseconds);
        const closeDate = addHours(new Date(closeMS), 7);
        console.log("closeDate", closeDate)

        const twoHoursBeforeClose = addHours(closeDate, -2);
        // console.log("OpeningString", openString);
        // console.log("ClosingString", closeString);
        // console.log("isoStartTimeTimePart", RealReservedTimeStart);
        // Check if the reservation time is within the opening and closing hours

        console.log("two hour before close", twoHoursBeforeClose);
        if (
            RealReservedTimeStart < openDate ||
            RealReservedTimeStart > twoHoursBeforeClose
        ) {
            return res
                .status(400)
                .json({ error: "Reservation time is not within valid hours." });
        }
        // sat,sun ปิดร้าน 22:00 ปิดรับจองถึง 20:00:00 01ไม่รับ
        // วันธรรมดา ปิดร้าน 21:00 ปิดรับจองถึง 19:00:00 01 ไม่รับ
        console.log("isoStartTime", isoStartTime)
        console.log("isoEndTime", isoEndTime)

        const overlappingReservations =
            await feature6Client.reservation.findMany({
                where: {
                    venueId,
                    reserved_time: {
                        gte: isoStartTime, // Greater than or equal to reservedTimeStart
                        lte: isoEndTime, // Less than or equal to reservedTimeEnd
                    },
                    status: {
                        not: "Cancel",
                    },
                },
            });
        console.log(overlappingReservations);
        res.status(200).json({ overlappingReservations });
    } catch (e) {
        console.error("Error checking availability:", e);
        return res.status(500).json(e);
    }
};

interface OverlapReservation {
    reservationId: number;
    venueId: number;
    userId: number;
    depositId: number;
    guest_amount: number;
    reserved_time: Date;
    status: string;
    entry_time: Date;
    isReview: boolean;
}

export const getAvailableTables = async (req: Request, res: Response) => {
    try {
        const { venueId, reservedTimeStart } = req.body;
        // Calculate the preparation time start (3 hours before the reservation)
        // const preparationTimeStart = addHours(new Date(reservedTimeStart), -3);
        // const reservedTimeEnd = reservedTimeStart.add({ hours: 3 }); // Assuming a reservation lasts for 3 hours

        // Use the checkAvailability function to get reserved tables during the specified time
        const checkAvailabilityResponse = checkAvailability(req, res);
        console.log("HEREEEEEE", checkAvailabilityResponse);

        const overlappingReservations: OverlapReservation[] = Array.isArray(
            checkAvailabilityResponse
        )
            ? checkAvailabilityResponse
            : [];
        console.log("Overlap => ", overlappingReservations);
        // Check if overlappingReservations is defined before mapping
        // let Reservations: OverlapReservation[] = [];
        // const overlappingReservations =
        //     (checkAvailabilityResponse ? Reservations = checkAvailability : Reservations);
        // Query all tables and filter out the reserved tables
        const allTables = await feature6Client.tables.findMany({
            where: {
                venueId: venueId,
            },
        });

        // Filter tables based on availability during preparation time
        const reservedTableIds: number[] = await Promise.all(
            overlappingReservations.map(async (reservation) => {
                const tables = await feature6Client.reservation_table.findMany({
                    where: { reserveId: reservation.reservationId },
                });

                //for (const table of tables) {
                //    reservedTableIds.push(table.tableId)
                //}
                return tables.map((table) => table.tableId);
            })
        ).then((nestedArrays) => nestedArrays.flat());
        console.log("TableIds", reservedTableIds);
        // const reservedTableIds: number[] = Reservations.map((reservation) => reservation.tableId);
        // const availableTables = allTables.filter((table) => !reservedTableIds.includes(table.tableId));

        // res.status(200).json({ availableTables });
    } catch (e) {
        return res.status(500).json(e);
    }
};

//Almost Finish
export const findSuitableTable = async (req: Request, res: Response) => {
    try {
        const { availableTables, guestAmount } = req.body;
        console.log("Received request with guest amount:", guestAmount);

        const totalCapacity = availableTables.reduce(
            (total, table) => total + table.capacity,
            0
        );
        if (guestAmount > totalCapacity) {
            // If guest amount exceeds total capacity, handle this case (e.g., return an error)
            return res
                .status(400)
                .json({ error: "Guest amount exceeds total capacity." });
        }

        const tableWithMaxCapacity = availableTables.reduce(
            (maxTable, currentTable) => {
                return currentTable.capacity > maxTable.capacity
                    ? currentTable
                    : maxTable;
            },
            availableTables[0]
        );
        console.log("max", tableWithMaxCapacity);

        if (guestAmount <= tableWithMaxCapacity.capacity) {
            const suitableTables = availableTables.filter(
                (table) => table.capacity >= guestAmount
            );
            console.log(suitableTables);
            // console.log(
            //     "Filtered tables based on guest capacity. Number of suitable tables:",
            //     suitableTables.length
            // );
            suitableTables.sort((table1, table2) => {
                const diff1 = Math.abs(table1.capacity - guestAmount);
                const diff2 = Math.abs(table2.capacity - guestAmount);
                return diff1 - diff2;
            });

            console.log("alone table", suitableTables);

            return res.status(200).json(suitableTables[0]);
        } else {
            //HEREEE
            const sortedTables = [...availableTables].sort(
                (a, b) => a.capacity - b.capacity
            );

            let reservedTables: any[] = [];
            let remainingGuests = guestAmount;

            // Iterate through sorted tables and try to use as few tables as possible
            for (const table of sortedTables) {
                if (remainingGuests > 0) {
                    const guestsToAssign = Math.min(
                        remainingGuests,
                        table.capacity
                    );
                    reservedTables.push({
                        tableId: table.tableId,
                    });
                    remainingGuests -= guestsToAssign;
                } else {
                    break; // No need to check further if all guests are assigned
                }
            }
            console.log("more than1 ", reservedTables);
            res.status(200).json(reservedTables);
        }

        // Filter tables based on guest capacity

        // // Sort suitable tables by capacity in ascending order
        // suitableTables.sort((a, b) => a.table.capacity - b.table.capacity);

        // // Find the first table that can accommodate the guest amount
        // const selectedTable = suitableTables.find(
        //     (table) => table.capacity >= guestAmount
        // );
        // console.log("Selected table:", selectedTable);

        // return res.status(200).json({ selectedTable: selectedTable || null });
    } catch (e) {
        return res.status(500).json(e);
    }
};

// BUSINESS SIDE PART

//GET METHOD
// export const getAllTableTypeByVenueId = async (req: Request, res: Response) => {
//     try {
//         const { venueId } = req.params;
//         const { userId } = req.body;

//         const tableTypeDetails =
//             await feature6Client.table_type_detail.findMany({
//                 where: {
//                     userId: parseInt(userId),
//                     venueId: parseInt(venueId),
//                 },
//                 include: {
//                     venue: true,
//                 },
//             });

//         return res.status(200).json(tableTypeDetails);
//     } catch (e) {
//         return res.status(500).json(e);
//     }
// };
//POST METHOD
export const createTable = async (req: Request, res: Response) => {
    try {
        const { venueId, image_url, information, tableTypeDetailId } = req.body;
        const newTable = await feature6Client.tables.create({
            data: {
                venueId: venueId,
                image_url: image_url,
                information: information,
                tableTypeDetailId: tableTypeDetailId,
            },
        });

        return res.json(newTable);
    } catch (e) {
        return res.status(500).json(e);
    }
};

export const createTableType = async (req: Request, res: Response) => {
    try {
        const { capacity, detail, name, venueId } = req.body;
        const newTableType = await feature6Client.table_type_detail.create({
            data: {
                capacity: capacity,
                detail: detail,
                name: name,
                venueId: venueId,
            },
        });

        return res.json(newTableType);
    } catch (e) {
        return res.status(500).json(e);
    }
};

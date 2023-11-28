import { Day, PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import {
    addMinutes,
    addHours,
    startOfDay,
    endOfDay,
    parse,
    format,
    sub,
} from "date-fns";
import authService from "../services/auth/auth.service";
import { Decimal } from "@prisma/client/runtime/library";

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
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        const { userId } = decodedToken;
        const reservations = await feature6Client.reservation.findMany({
            where: {
                userId: userId,
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
export const getMyReservationByStatus = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        const { userId } = decodedToken;
        const { status } = req.body;
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

//get My Reservation Detail Page
//Finished
export const getVenueAndReservationsById = async (
    req: Request,
    res: Response
) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        const { userId } = decodedToken;
        const { venueId, reservationId } = req.params;
        const venue = await feature6Client.venue.findUnique({
            where: {
                venueId: parseInt(venueId),
            },
            include: {
                Venue_photo: true,
            },
        });

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
                userId: parseInt(userId),
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
// create Reservation
// Finished
var isResponse = true;
export const createReservation = async (req: Request, res: Response) => {
    isResponse = true;

    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        const { userId } = decodedToken;

        if (decodedToken.userType != "user") {
            return res
                .status(401)
                .json({ error: "This user is not customer user" });
        }

        const { venueId, guest_amount, reserve_date, time, branchId } =
            req.body;

        const concatDatetime = `${reserve_date} ${time}`;
        const reserved_time = new Date(concatDatetime);

        if (reserved_time <= new Date()) {
            return res.status(400).json({ error: "Cannot reserve in the past." });
        }
        
        const newreserveTime = addHours(new Date(reserved_time), 7);
        // const entry_time = addMinutes(new Date(reserved_time), -30);
        await getAvailableTables(req, res);
        const selectedTable = await findSuitableTable(
            getAvailableTablesResponse,
            res
        );
        if (isResponse) {
            if (
                !selectedTable ||
                selectedTable === null ||
                selectedTable === undefined ||
                selectedTable.length === 0
            ) {
                isResponse = false;
                console.log("create reservation --> ", isResponse);
                return res
                    .status(400)
                    .json({ error: "No suitable tables available." });
            }
            const depositId = await feature6Client.deposit.findFirst({
                where: {
                    venueId: venueId,
                },
                select: {
                    depositId: true,
                },
            });

            console.log(depositId?.depositId);
            if (depositId === undefined || !depositId) {
                return res.status(400).json({ error: "No deposit found." });
            }

            // Create the reservation
            const newReservation = await feature6Client.reservation.create({
                data: {
                    venueId,
                    userId: userId,
                    guest_amount,
                    reserved_time: new Date(newreserveTime),
                    entry_time: new Date(newreserveTime),
                    status: "Pending",
                    isPaidDeposit: "Pending",
                    isReview: false,
                    depositId: depositId?.depositId,
                    branchId: branchId,
                },
            });

            // Create the reservation table entry for the selected table
            const reservationTableEntry =
                await feature6Client.reservation_table.create({
                    data: {
                        reserveId: newReservation.reservationId,
                        tableId: selectedTable[0].tableId,
                    },
                });

            const responseData = {
                newReservation,
                reservationTableEntry,
            };
            res.status(200).json(responseData);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let availabilityResponse: any;
let getAvailableTablesResponse: any;
let getSuitableTableResponse: any;

export const getAvailableTables = async (req: Request, res: Response) => {
    try {
        const { venueId, reserve_date, branchId, time } = req.body;
        try {
            const token = req.cookies.authToken;
            if (!token) {
                return res.status(401).json({ error: "No auth token" });
            }

            const concatDatetime = `${reserve_date} ${time}`;
            const reservedTimeStart = new Date(concatDatetime);
            const PrepareReservedTimeStart = addHours(
                new Date(reservedTimeStart),
                5
            );
            const tables = await feature6Client.tables.findMany({
                where: { venueId, branchId },
            });
            if (tables.length === 0) {
                isResponse = false;
                return res
                    .status(400)
                    .json({ error: "No table in this venue" });
            }
            const DateTimeStart: Date = addHours(
                new Date(reservedTimeStart),
                7
            );
            const dateOnly = DateTimeStart.toISOString().split("T")[0];
            const TodayDate = new Date(dateOnly);
            const reservedTimeEnd = addHours(new Date(reservedTimeStart), 9);
            const isoStartTime = new Date(
                PrepareReservedTimeStart
            ).toISOString();
            const isoEndTime = reservedTimeEnd.toISOString();
            const [year, month, d] = reserve_date.split(/[- :]/);
            const DateString = `${year}-${month}-${d}`;
            const myDate = new Date(DateString);
            const day = myDate.getDay();
            const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
            ];
            const isopen = await feature6Client.opening_day.findMany({
                where: { venueId },
                select: {
                    day: true,
                },
            });
            const openday: string[] = await Promise.all(
                isopen.map(async (open) => {
                    return open.day;
                })
            ).then((nestedArrays) => nestedArrays.flat());
            var pos;
            for (let index = 0; index < daysOfWeek.length; index++) {
                if (openday[openday.length - 1] == daysOfWeek[index])
                    pos = index;
            }
            openday.push(daysOfWeek[pos + 1]);
            var canreserve = 0;
            for (let index = 0; index < openday.length; index++) {
                if (daysOfWeek[day] == openday[index]) canreserve++;
            }
            if (canreserve === 0) {
                isResponse = false;
                return res.status(400).json({ error: "Today venue is closed" });
            }
            const dayName = daysOfWeek[day];
            const opening = await feature6Client.opening_day.findMany({
                where: {
                    venueId,
                    day: dayName as Day,
                },
            });
            var notOpen = false;
            const dayBefore = daysOfWeek[day - 1];
            if (opening.length === 0) {
                const openBefore = await feature6Client.opening_day.findMany({
                    where: {
                        venueId,
                        day: dayBefore as Day,
                    },
                });
                const closeBefore = openBefore[0].closing_hours;
                const closeBeforeString = closeBefore
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0];
                if (closeBeforeString <= "02:00:00") {
                    isResponse = false;
                    return res
                        .status(400)
                        .json({ error: "Today venue is closed" });
                } else {
                    notOpen = true;
                }
            }
            var open, close;
            if (notOpen) {
                const openBefore = await feature6Client.opening_day.findMany({
                    where: {
                        venueId,
                        day: dayBefore as Day,
                    },
                });
                open = openBefore[0].opening_hours;
                close = openBefore[0].closing_hours;
                TodayDate.setDate(TodayDate.getDate() - 1);
            } else {
                open = opening[0].opening_hours;
                close = opening[0].closing_hours;
            }
            const openString = open.toISOString().split("T")[1].split(".")[0];
            const [hours, minutes, seconds] = openString.split(":").map(Number);
            const openMS = TodayDate.setHours(hours, minutes, seconds);
            const openDate = addHours(new Date(openMS), 7);
            const closeString = close.toISOString().split("T")[1].split(".")[0];
            const [closehours, closeminutes, closeseconds] = closeString
                .split(":")
                .map(Number);
            if (closeString < openString) {
                TodayDate.setDate(TodayDate.getDate() + 1);
            }
            const closeMS = TodayDate.setHours(
                closehours,
                closeminutes,
                closeseconds
            );
            const closeDate = addHours(new Date(closeMS), 7);
            const twoHoursBeforeClose = addHours(closeDate, -2);
            if (
                DateTimeStart < openDate ||
                DateTimeStart > twoHoursBeforeClose
            ) {
                isResponse = false;
                return res.status(400).json({
                    error: "Reservation time is not within valid hours.",
                });
            }
            const overlappingReservations =
                await feature6Client.reservation.findMany({
                    where: {
                        venueId,
                        reserved_time: {
                            gte: isoStartTime,
                            lte: isoEndTime,
                        },
                        status: {
                            not: "Cancel",
                        },
                    },
                });
            availabilityResponse = overlappingReservations;
        } catch (e) {
            console.error("Error checking availability:", e);
            return res.status(500).json(e);
        }

        const allTables = await feature6Client.tables.findMany({
            where: {
                venueId: venueId,
                tableTypeDetailId: venueId.tableTypeDetailId,
            },
            include: {
                table_type: true,
            },
        });

        const reservedTableIds: number[] = await Promise.all(
            availabilityResponse.map(async (reservation) => {
                const tables = await feature6Client.reservation_table.findMany({
                    where: { reserveId: reservation.reservationId },
                });

                return tables.map((table) => table.tableId);
            })
        ).then((nestedArrays) => nestedArrays.flat());

        const availableTables = allTables
            .filter((table) => !reservedTableIds.includes(table.tableId))
            .map((table) => ({
                tableId: table.tableId,
                capacity: table.table_type.capacity,
            }));

        if (
            availableTables.length === 0 ||
            !availableTables ||
            availableTables === null ||
            availableTables === undefined
        ) {
            isResponse = false;
            return res.json({ error: "No more Available Table" });
        }
        const availableTables2 = {
            availableTables: availableTables,
            guestAmount: req.body.guest_amount,
        };
        getAvailableTablesResponse = availableTables2;
        // res.status(200).json({ availableTables });
    } catch (e) {
        return res.status(500).json(e);
    }
};

//Finished
export const findSuitableTable = async (
    getAvailableTablesResponse,
    res: Response
) => {
    try {
        if (isResponse) {
            const { availableTables, guestAmount } = getAvailableTablesResponse;

            const tableWithMaxCapacity = availableTables.reduce(
                (maxTable, currentTable) => {
                    return currentTable.capacity > maxTable.capacity
                        ? currentTable
                        : maxTable;
                },
                availableTables[0]
            );

            if (guestAmount <= tableWithMaxCapacity.capacity) {
                const suitableTables = availableTables.filter(
                    (table) => table.capacity >= guestAmount
                );

                suitableTables.sort((table1, table2) => {
                    const diff1 = Math.abs(table1.capacity - guestAmount);
                    const diff2 = Math.abs(table2.capacity - guestAmount);
                    return diff1 - diff2;
                });

                getSuitableTableResponse = suitableTables;
                return suitableTables;
            }
        } else {
            return [];
        }
    } catch (e) {
        return res.status(500).json(e);
    }
};

// BUSINESS SIDE PART
// GET METHOD

// Almost finish
// Handle tableId that is not own by businessId
export const getTableByTableId = async (req: Request, res: Response) => {
    try {
        const { tableId } = req.params;
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        if (venueId == undefined || !venueId) {
            return res.status(400).json({ error: "Venue is undefined" });
        }
        const table = await feature6Client.tables.findUnique({
            where: {
                tableId: parseInt(tableId),
                venueId: venueId,
            },
            include: {
                table_type: true,
            },
        });

        return res.status(200).json(table);
    } catch (e) {
        return res.status(500).json(e);
    }
};

// Finished
export const getAllTableTypeByVenueId = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        console.log(getVenueId);

        const venueId = getVenueId?.venueId;
        const table = await feature6Client.table_type_detail.findMany({
            where: {
                venueId: venueId,
            },
        });

        return res.status(200).json(table);
    } catch (e) {
        return res.status(500).json(e);
    }
};

// Finished
export const getAllTableByVenueId = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        const table = await feature6Client.tables.findMany({
            where: {
                venueId: venueId,
            },
            include: {
                table_type: true,
            },
        });

        return res.status(200).json(table);
    } catch (e) {
        return res.status(500).json(e);
    }
};

// POST METHOD
// Finished
export const createTable = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId || 0;
        const { information, tableTypeDetailId, tablenumber, branchId } =
            req.body;
        const newTable = await feature6Client.tables.create({
            data: {
                venueId: venueId,
                information: information,
                tableTypeDetailId: tableTypeDetailId,
                table_no: tablenumber,
                branchId: branchId,
                status: "Available",
            },
        });

        return res.json(newTable);
    } catch (e) {
        console.log(e);

        return res.status(500).json(e);
    }
};

// Finished
export const createTableType = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        // HEREEEEE ทำค้างไว้ branchId
        const getBranch = await feature6Client.venue_branch.findMany({
            where: {
                venueId: 1,
            },
        });
        const venueId = getVenueId?.venueId;
        if (venueId == undefined || !venueId) {
            return res.status(400).json({ error: "Venue is undefined" });
        }
        const { capacity, detail, name, image_url } = req.body;
        const newTableType = await feature6Client.table_type_detail.create({
            data: {
                capacity: capacity,
                detail: detail,
                name: name,
                venueId: venueId,
                image_url: image_url,
            },
        });

        return res.json(newTableType);
    } catch (e) {
        return res.status(500).json(e);
    }
};

// Dashboard
// In Progress
// Some problem about time
export const getCountPerDay = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;
        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        const today = new Date();
        // console.log(today);
        // console.log(startOfDay(today));
        // console.log(endOfDay(today));
        const startOfToday = addHours(startOfDay(today), 7);
        const endOfToday = addHours(endOfDay(today), 7);

        // console.log(startOfToday);
        // console.log(endOfToday);
        // const startOfToday = startOfDay(today);
        // const endOfToday = endOfDay(today);

        // const DateTimeStart: Date = addHours(new Date(reservedTimeStart), 7);
        // const dateOnly = DateTimeStart.toISOString().split("T")[0];
        // const TodayDate = new Date(dateOnly);
        // const reservedTimeEnd = addHours(new Date(reservedTimeStart), 10); // Assuming a reservation lasts for 3 hours
        // // Convert dates to ISO-8601 format
        // const isoStartTime = new Date(PrepareReservedTimeStart).toISOString();

        // console.log(today);
        // console.log(startOfToday);
        // console.log(endOfToday);

        const transactionsToday = await feature6Client.transaction.findMany({
            where: {
                AND: [
                    {
                        Transaction_detail: {
                            timestamp: {
                                gte: startOfToday,
                                lte: endOfToday,
                            },
                        },
                        venueId: venueId,
                    },
                ],
            },
            include: {
                Transaction_detail: true,
            },
        });

        let sumRevenue: Decimal = new Decimal(0.0);
        transactionsToday.forEach((reservation) => {
            if (
                reservation.Transaction_detail &&
                reservation.Transaction_detail.total_amount
            ) {
                sumRevenue = sumRevenue.add(
                    new Decimal(reservation.Transaction_detail.total_amount)
                );
            }
        });

        const reservationsToday = await feature6Client.reservation.findMany({
            where: {
                AND: [
                    {
                        reserved_time: {
                            gte: startOfToday,
                            lte: endOfToday,
                        },
                        venueId: venueId,
                    },
                ],
            },
            include: {
                Reservation_table: true,
            },
        });

        let ReservationCount = 0;
        reservationsToday.forEach((reservation) => {
            ReservationCount += reservation.Reservation_table.length;
        });
        let CustomerCount = 0;
        reservationsToday.forEach((reservation) => {
            CustomerCount += reservation.guest_amount;
        });

        res.json({ sumRevenue, ReservationCount, CustomerCount });
    } catch (e) {
        return res.status(500).json(e);
    }
};

// Finished
export const getAllReservationOfVenue = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        if (venueId == undefined || !venueId) {
            return res.status(400).json({ error: "Venue is undefined" });
        }
        const reservations = await feature6Client.reservation.findMany({
            where: {
                venueId: venueId,
            },
        });
        return res.json(reservations);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

// In-Progress
// fix about if condition when can't delete bc you are not owner of venue
export const deleteTable = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        const { tableId } = req.params;
        if (tableId == undefined) {
            return res.status(401).json({ error: "No selected table" });
        }

        const table = await feature6Client.tables.findUnique({
            where: {
                tableId: parseInt(tableId),
            },
            select: {
                venueId: true,
            },
        });

        if (!table) {
            return res.status(404).json({ error: "Table not found" });
        }
        if (table.venueId !== venueId) {
            return res
                .status(401)
                .json({ error: "This table does not belong to your venue" });
        }

        const deletedTable = await feature6Client.tables.delete({
            where: {
                tableId: parseInt(tableId),
                venueId: venueId,
            },
        });

        return res.json({
            message: "Table deleted successfully",
            deletedTable,
        });
    } catch (e) {
        return res.status(500).json(e);
    }
};

// OFFLINE RESERVATION
var isResponse = true;
export const createOfflineReservation = async (req: Request, res: Response) => {
    isResponse = true;
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const venueId = getVenueId?.venueId;
        if (venueId == undefined || !venueId) {
            return res.status(400).json({ error: "Venue is undefined" });
        }

        const { guest_amount, branchId } = req.body;

        const Reserve_date = new Date();
        const Time = Reserve_date.toLocaleTimeString();

        const reserve_date = new Date(Reserve_date).toISOString().split("T")[0];
        const parsedTime = parse(Time, "h:mm:ss a", new Date());
        const time = format(parsedTime, "HH:mm:ss");

        const concatDatetime = `${reserve_date} ${time}`;
        const reserved_time = new Date(concatDatetime);
        // Use the previous functions to check availability and find a suitable table
        const newreserveTime = addHours(new Date(reserved_time), 7);
        // const entry_time = addMinutes(new Date(reserved_time), -30);
        req.body.reserve_date = reserve_date;
        req.body.time = time;
        await getOfflineAvailableTables(req, res);
        // console.log("after call 1 --> ", isResponse)
        const selectedTable = await findSuitableTable(
            getOfflineAvailableTablesResponse,
            res
        );
        if (isResponse) {
            if (
                !selectedTable ||
                selectedTable === null ||
                selectedTable === undefined ||
                selectedTable.length === 0
            ) {
                isResponse = false;
                console.log("create reservation --> ", isResponse);
                return res
                    .status(400)
                    .json({ error: "No suitable tables available." });
            }
            const depositId = await feature6Client.deposit.findMany({
                where: {
                    venueId: venueId,
                },
                select: {
                    depositId: true,
                },
            });

            if (depositId.length === 0) {
                return res.status(400).json({ error: "No deposit found." });
            }
            // Create the reservation
            const newReservation = await feature6Client.reservation.create({
                data: {
                    venueId,
                    userId: -1,
                    guest_amount,
                    reserved_time: new Date(newreserveTime),
                    entry_time: new Date(newreserveTime),
                    status: "Check_in",
                    isPaidDeposit: "Pending",
                    isReview: false,
                    depositId: depositId[0].depositId,
                    branchId: branchId,
                },
            });

            // Create the reservation table entry for the selected table
            const reservationTableEntry =
                await feature6Client.reservation_table.create({
                    data: {
                        reserveId: newReservation.reservationId,
                        tableId: selectedTable[0].tableId,
                    },
                });
            // console.log("create reservation --> ", isResponse);

            const responseData = {
                newReservation,
                reservationTableEntry,
            };
            res.status(200).json(responseData);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

let offlineAvailabilityResponse: any;
let getOfflineAvailableTablesResponse: any;
let getOfflineSuitableTableResponse: any;

export const getOfflineAvailableTables = async (
    req: Request,
    res: Response
) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            return res
                .status(401)
                .json({ error: "This user is not business user" });
        }
        const businessId = decodedToken.businessId;

        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });

        const { venueId, reserve_date, time } = req.body;

        try {
            const concatDatetime = `${reserve_date} ${time}`;
            const reservedTimeStart = new Date(concatDatetime);
            const ReservedTimeStart = addHours(new Date(reservedTimeStart), 7);
            const tables = await feature6Client.tables.findMany({
                where: { venueId },
            });
            if (tables.length === 0) {
                isResponse = false;
                return res
                    .status(400)
                    .json({ error: "No table in this venue." });
            }
            const DateTimeStart: Date = addHours(
                new Date(reservedTimeStart),
                7
            );
            const dateOnly = DateTimeStart.toISOString().split("T")[0];
            const TodayDate = new Date(dateOnly);
            const reservedTimeEnd = addHours(new Date(reservedTimeStart), 9);
            const isoStartTime = new Date(ReservedTimeStart).toISOString();
            const isoEndTime = reservedTimeEnd.toISOString();
            const [year, month, d] = reserve_date.split(/[- :]/);
            const DateString = `${year}-${month}-${d}`;
            const myDate = new Date(DateString);
            const day = myDate.getDay();
            const daysOfWeek = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
            ];
            const isopen = await feature6Client.opening_day.findMany({
                where: { venueId },
                select: {
                    day: true,
                },
            });
            const openday: string[] = await Promise.all(
                isopen.map(async (open) => {
                    return open.day;
                })
            ).then((nestedArrays) => nestedArrays.flat());
            var pos;
            for (let index = 0; index < daysOfWeek.length; index++) {
                if (openday[openday.length - 1] == daysOfWeek[index])
                    pos = index;
            }
            openday.push(daysOfWeek[pos + 1]);
            var canreserve = 0;
            for (let index = 0; index < openday.length; index++) {
                if (daysOfWeek[day] == openday[index]) canreserve++;
            }
            if (canreserve === 0) {
                isResponse = false;
                return res.status(400).json({ error: "Today venue is closed" });
            }
            const dayName = daysOfWeek[day];
            const opening = await feature6Client.opening_day.findMany({
                where: {
                    venueId,
                    day: dayName as Day,
                },
            });

            var notOpen = false;
            const dayBefore = daysOfWeek[day - 1];
            if (opening.length === 0) {
                const openBefore = await feature6Client.opening_day.findMany({
                    where: {
                        venueId,
                        day: dayBefore as Day,
                    },
                });
                const closeBefore = openBefore[0].closing_hours;
                const closeBeforeString = closeBefore
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0];
                if (closeBeforeString <= "02:00:00") {
                    isResponse = false;
                    return res
                        .status(400)
                        .json({ error: "Today venue is closed" });
                } else {
                    notOpen = true;
                }
            }
            var open, close;
            if (notOpen) {
                const openBefore = await feature6Client.opening_day.findMany({
                    where: {
                        venueId,
                        day: dayBefore as Day,
                    },
                });
                open = openBefore[0].opening_hours;
                close = openBefore[0].closing_hours;
                TodayDate.setDate(TodayDate.getDate() - 1);
            } else {
                open = opening[0].opening_hours;
                close = opening[0].closing_hours;
            }
            const openString = open.toISOString().split("T")[1].split(".")[0];
            const [hours, minutes, seconds] = openString.split(":").map(Number);
            const openMS = TodayDate.setHours(hours, minutes, seconds);
            const openDate = addHours(new Date(openMS), 7);
            const closeString = close.toISOString().split("T")[1].split(".")[0];
            const [closehours, closeminutes, closeseconds] = closeString
                .split(":")
                .map(Number);
            if (closeString < openString) {
                TodayDate.setDate(TodayDate.getDate() + 1);
            }
            const closeMS = TodayDate.setHours(
                closehours,
                closeminutes,
                closeseconds
            );
            const closeDate = addHours(new Date(closeMS), 7);
            const twoHoursBeforeClose = addHours(closeDate, -2);
            if (
                DateTimeStart < openDate ||
                DateTimeStart > twoHoursBeforeClose
            ) {
                isResponse = false;
                return res.status(400).json({
                    error: "Reservation time is not within valid hours.",
                });
            }
            const overlappingReservations =
                await feature6Client.reservation.findMany({
                    where: {
                        venueId,
                        reserved_time: {
                            gte: isoStartTime,
                            lte: isoEndTime,
                        },
                        status: {
                            not: "Cancel",
                        },
                    },
                });
            offlineAvailabilityResponse = overlappingReservations;
            console.log(offlineAvailabilityResponse)
        } catch (e) {
            console.error("Error checking availability:", e);
            return res.status(500).json(e);
        }

        const allTables = await feature6Client.tables.findMany({
            where: {
                venueId: venueId,
                tableTypeDetailId: venueId.tableTypeDetailId,
            },
            include: {
                table_type: true,
            },
        });

        const reservedTableIds: number[] = await Promise.all(
            offlineAvailabilityResponse.map(async (reservation) => {
                const tables = await feature6Client.reservation_table.findMany({
                    where: { reserveId: reservation.reservationId },
                });

                return tables.map((table) => table.tableId);
            })
        ).then((nestedArrays) => nestedArrays.flat());

        const availableTables = allTables
            .filter((table) => !reservedTableIds.includes(table.tableId))
            .map((table) => ({
                tableId: table.tableId,
                capacity: table.table_type.capacity,
            }));

        if (
            availableTables.length === 0 ||
            !availableTables ||
            availableTables === null ||
            availableTables === undefined
        ) {
            isResponse = false;
            console.log("table --> ", isResponse);
            return res.json({ error: "No more Available Table" });
        }
        const availableTables2 = {
            availableTables: availableTables,
            guestAmount: req.body.guest_amount,
        };

        // console.log("avail table --> ", availableTables2)
        getOfflineAvailableTablesResponse = availableTables2;
        // res.status(200).json({ availableTables });
    } catch (e) {
        return res.status(500).json(e);
    }
};

export const findOfflineSuitableTable = async (
    getOfflineAvailableTablesResponse,
    res: Response
) => {
    try {
        if (isResponse) {
            const { availableTables, guestAmount } =
                getOfflineAvailableTablesResponse;

            const tableWithMaxCapacity = availableTables.reduce(
                (maxTable, currentTable) => {
                    return currentTable.capacity > maxTable.capacity
                        ? currentTable
                        : maxTable;
                },
                availableTables[0]
            );

            if (guestAmount <= tableWithMaxCapacity.capacity) {
                const suitableTables = availableTables.filter(
                    (table) => table.capacity >= guestAmount
                );

                suitableTables.sort((table1, table2) => {
                    const diff1 = Math.abs(table1.capacity - guestAmount);
                    const diff2 = Math.abs(table2.capacity - guestAmount);
                    return diff1 - diff2;
                });
                console.log("suitableTables", suitableTables);

                // console.log("Alone table Result ---->", suitableTables[0]);
                getOfflineSuitableTableResponse = suitableTables;
                return suitableTables;
                // return res.status(200).json(suitableTables[0]);
            }
        } else {
            return [];
        }
    } catch (e) {
        return res.status(500).json(e);
    }
};

import qr from "qr-image";

export const checkIn = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.reservationId);
        const checkInTime = addHours(new Date() ,7);
        const reservation = await feature6Client.reservation.findUnique({
            where: { reservationId },
        });

        // console.log("Reservation:", reservation);

        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }

        const defaultCheckoutTime = new Date();
        defaultCheckoutTime.setHours(7, 0, 0, 0);
        const checkInLog = await feature6Client.check_in_log.create({
            data: {
                reserveId: reservationId,
                check_in_time: checkInTime,
                check_out_time: defaultCheckoutTime,
            },
        });

        // console.log("Check-in Log:", checkInLog);

        const entry_time = addHours(new Date(), 7);
        await feature6Client.reservation.update({
            where: { reservationId },
            data: {
                status: "Check_in",
                entry_time: entry_time,
            },
        });
        const selectedTable = await feature6Client.reservation_table.findFirst({
            where: {
                reserveId: reservationId,
            },
            select: {
                tableId: true,
            },
        });

        console.log("eeee", selectedTable);

        await feature6Client.tables.update({
            where: {
                tableId: selectedTable?.tableId,
            },
            data: {
                status: "Unavailable",
            },
        });

        return res.json({ checkInLog });
    } catch (error) {
        return res.status(500).json({ error: "Check-In not success" });
    }
};

export const checkOut = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.reservationId);
        const checkOutTime = addHours(new Date(), 7);

        const checkOutLog = await feature6Client.check_in_log.update({
            where: {
                reserveId: reservationId,
            },
            data: {
                reserveId: reservationId,
                check_out_time: checkOutTime,
            },
        });

        // Update status reservation
        await feature6Client.reservation.update({
            where: { reservationId },
            data: {
                status: "Check_out"
            }
        });

        const selectedTable = await feature6Client.reservation_table.findFirst({
            where: {
                reserveId: reservationId,
            },
            select: {
                tableId: true,
            },
        });

        // Update status table
        await feature6Client.tables.update({
            where: {
                tableId: selectedTable?.tableId,
            },
            data: {
                status: "Available",
            },
        });

        return res.json({ checkOutLog });
    } catch (e) {
        return res.status(500).json({ e });
    }
};

// QR code route
export const qrCode = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.params;
        const qrCode = qr.image(`Reservation ID: ${reservationId}`, {
            type: "png",
        });
        res.type("png");
        return qrCode.pipe(res);
    } catch (e) {
        return res.status(500).json({ error: "QR code not success" });
    }
};
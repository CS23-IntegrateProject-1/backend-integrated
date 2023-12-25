import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { addHours, startOfDay, endOfDay, parse, format } from "date-fns";
import authService from "../services/auth/auth.service";
import { genToken } from "../services/reservation/genToken.service";
import { getAvailableTables } from "../services/reservation/getAvailableTables.service";
import { getOfflineAvailableTables } from "../services/reservation/getOfflineAvailableTables.service";
import { findSuitableTable } from "../services/reservation/findSuitable.service";
import qr from "qr-image";

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
        const { venueId, branchId } = req.params;
        const branchName = await feature6Client.venue_branch.findMany({
            where: {
                venueId: parseInt(venueId),
                branchId: parseInt(branchId),
            },
        });
        const venue = await feature6Client.venue.findUnique({
            where: {
                venueId: parseInt(venueId),
            },
            include: {
                Venue_photo: true,
                Location: true,
                Deposit: true,
            },
        });
        return res.json(venue), branchName;
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
                User: true,
                Deposit: true,
            },
        });
        return res.json(reservations);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

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
                        Venue_branch: true,
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
                User: {
                    include: {
                        User_bio: true,
                    },
                },
                Deposit: true,
            },
        });

        return res.json({ venue, location, reservations });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

//POST METHOD
// create Reservation
// Finished
export const createReservation = async (req: Request, res: Response) => {
    let isResponse = true;

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

        const {
            venueId,
            guest_amount,
            reserve_date,
            time,
            branchId,
            name,
            phone_num,
        } = req.body;

        const concatDatetime = `${reserve_date} ${time}`;
        const reserved_time = new Date(concatDatetime);

        if (reserved_time <= new Date()) {
            return res
                .status(400)
                .json({ error: "Cannot reserve in the past." });
        }

        const newreserveTime = addHours(new Date(reserved_time), 0);

        const getAvailableTablesResponse: any = await getAvailableTables(req);
        if (
            getAvailableTablesResponse.error == "No tables found in this venue"
        ) {
            return res
                .status(400)
                .json({ error: "No tables found in this venue" });
        } else if (
            getAvailableTablesResponse.error == "Venue is closed today"
        ) {
            return res.status(400).json({ error: "Venue is closed today" });
        } else if (
            getAvailableTablesResponse.error ==
            "Reservation time is not within valid hours"
        ) {
            return res
                .status(400)
                .json({ error: "Reservation time is not within valid hours" });
        } else if (
            getAvailableTablesResponse.error == "No more Available Table"
        ) {
            return res.status(400).json({ error: "No more Available Table" });
        }

        const selectedTable = await findSuitableTable(
            getAvailableTablesResponse
        );
        if (isResponse) {
            if (
                !selectedTable ||
                selectedTable === null ||
                selectedTable === undefined ||
                selectedTable.length === 0
            ) {
                isResponse = false;
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
                    name: name,
                    phone: phone_num,
                },
            });

            const checkChatRoomId = await feature6Client.venue.findFirst({
                where: {
                    venueId: newReservation.venueId,
                },
                select: {
                    chatRoomId: true,
                },
            });

            if (
                userId != undefined &&
                checkChatRoomId?.chatRoomId != undefined
            ) {
                await feature6Client.chat_Room_Logs.create({
                    data: {
                        chatRoomId: checkChatRoomId?.chatRoomId,
                        userId: userId,
                        access_status: true,
                        reservationId: newReservation.reservationId,
                    },
                });
            }

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

// BUSINESS SIDE PART
// GET METHOD
// Finished
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
                Table_type_detail: true,
            },
        });

        if (!table) {
            return res.status(403).json({
                error: "You do not have permission to access this table",
            });
        }
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
                isUsing: true,
            },
            include: {
                Table_type_detail: true,
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
                isUsing: true,
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

// Finished
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
        const startOfToday = addHours(startOfDay(today), 0);
        const endOfToday = addHours(endOfDay(today), 0);

        const transaction = await feature6Client.transaction.findMany({
            where: {
                Transaction_detail: {
                    timestamp: {
                        gte: startOfToday,
                        lte: endOfToday,
                    },
                },
                venueId: venueId,
            },
            include: {
                Transaction_detail: {
                    select: {
                        total_amount: true,
                    },
                },
            },
        });

        let reserveCount: number = 0;
        const transactionIdsArray = transaction.map(
            (transaction) => transaction.transactionId
        );

        const reservationIdsArray = transaction.map(
            (reserve) => reserve.reserveId
        );

        reservationIdsArray.forEach((reservationId) => {
            console.log(reservationId);
            reserveCount++;
        });

        const totalRevenue = await feature6Client.transaction_detail.aggregate({
            where: {
                transactionId: {
                    in: transactionIdsArray,
                },
            },
            _sum: {
                total_amount: true,
            },
        });

        const totalGuest = await feature6Client.reservation.aggregate({
            where: {
                reservationId: {
                    in: reservationIdsArray,
                },
            },
            _sum: {
                guest_amount: true,
            },
        });

        const response = {
            ReservationCount: reserveCount,
            sumRevenue: totalRevenue._sum.total_amount ?? 0,
            CustomerCount: totalGuest._sum.guest_amount ?? 0,
        };
        res.json({ response });
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
            include: {
                User: true,
            },
        });
        return res.json(reservations);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

// Finished
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

        const deletedTable = await feature6Client.tables.update({
            where: {
                tableId: parseInt(tableId),
                venueId: venueId,
            },
            data: {
                isUsing: false,
            },
        });

        return res.json({
            message: "Table deleted successfully",
            deletedTable,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

// Finished
export const cancelReservation = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const decodedToken = authService.decodeToken(token);
        const { userId } = decodedToken;

        const reservationId = parseInt(req.params.reservationId);
        const reservation = await feature6Client.reservation.findUnique({
            where: { reservationId },
        });

        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        if (reservation.userId !== userId) {
            return res
                .status(401)
                .json({ error: "This reservation does not belong to you" });
        }

        if (reservation.status !== "Pending") {
            return res.status(400).json({
                error: "Reservation is already canceled or checked out",
            });
        }
        await feature6Client.reservation.update({
            where: { reservationId },
            data: {
                status: "Cancel",
            },
        });

        return res.json({ message: "Reservation canceled successfully" });
    } catch (e) {
        return res.status(500).json(e);
    }
};

// OFFLINE RESERVATION
// Finished
export const createOfflineReservation = async (req: Request, res: Response) => {
    let isResponse = true;
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

        const { guest_amount, branchId, phone_num, name } = req.body;

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
        req.body.venueId = venueId;
        const offlineAvailabilityResponse: any =
            await getOfflineAvailableTables(req);
        if (offlineAvailabilityResponse.error == "Venue not found.") {
            return res.status(400).json({ error: "Venue not found." });
        } else if (
            offlineAvailabilityResponse.error == "No tables found in this venue"
        ) {
            return res
                .status(400)
                .json({ error: "No tables found in this venue" });
        } else if (
            offlineAvailabilityResponse.error == "Venue is closed today"
        ) {
            return res.status(400).json({ error: "Venue is closed today" });
        } else if (
            offlineAvailabilityResponse.error ==
            "Reservation time is not within valid hours."
        ) {
            return res
                .status(400)
                .json({ error: "Reservation time is not within valid hours." });
        } else if (
            offlineAvailabilityResponse.error == "No more Available Table"
        ) {
            return res.status(400).json({ error: "No more Available Table" });
        }

        const selectedTable = await findSuitableTable(
            offlineAvailabilityResponse
        );
        if (isResponse) {
            if (
                !selectedTable ||
                selectedTable === null ||
                selectedTable === undefined ||
                selectedTable.length === 0
            ) {
                isResponse = false;
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
                    userId: 0,
                    guest_amount,
                    reserved_time: new Date(newreserveTime),
                    entry_time: new Date(newreserveTime),
                    status: "Check_in",
                    isPaidDeposit: "Completed",
                    isReview: false,
                    depositId: depositId[0].depositId,
                    branchId: branchId,
                    phone: phone_num,
                    name: name,
                    isPaymentSuccess: "Completed",
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

            //  Checkin for offline reservation
            await feature6Client.tables.update({
                where: {
                    tableId: selectedTable[0].tableId,
                    isUsing: true,
                },
                data: {
                    status: "Unavailable",
                },
            });

            const reservationId = newReservation.reservationId;
            const checkInTime = addHours(new Date(), 7);

            const defaultCheckoutTime = new Date();
            defaultCheckoutTime.setHours(0, 0, 0, 0);
            await feature6Client.check_in_log.create({
                data: {
                    reserveId: reservationId,
                    check_in_time: checkInTime,
                    check_out_time: defaultCheckoutTime,
                },
            });
            const entry_time = addHours(new Date(), 7);
            await feature6Client.reservation.update({
                where: { reservationId },
                data: {
                    status: "Check_in",
                    entry_time: entry_time,
                },
            });

            const responseData = {
                newReservation,
                reservationTableEntry,
            };
            return res.status(200).json(responseData);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

// Finished
export const checkIn = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.reservationId);
        const authToken = req.cookies.authToken;
        const userType = authService.decodeToken(authToken);

        const checkInTime = addHours(new Date(), 7);
        const reservation = await feature6Client.reservation.findUnique({
            where: { reservationId },
        });

        const businessId = userType.businessId;
        const getVenueId = await feature6Client.property.findFirst({
            where: {
                businessId: businessId,
            },
            select: {
                venueId: true,
            },
        });
        let isOwner = false;
        if (getVenueId?.venueId === reservation?.venueId) isOwner = true;

        if (isOwner == false) {
            return res
                .status(400)
                .json({ error: "You are not owner of this venue" });
        }
        // const entry_time = reservation?.entry_time;
        // if(entry_time === undefined || !entry_time){
        //     return res.status(200).json("Entry time not found");
        // }
        // const Entry_time = subMinutes(entry_time, 15);
        // if(Entry_time < new Date()){
        //     return res.status(200).json("Please wait you can check-in 15 minutes before reserve time");
        // }
        // if (1 + 1 == 2) {
        //     console.log("You are the owner but not the one who take her heart")
        //     return res
        //         .status(400)
        //         .json({ error: "Please restart your computer" });
        // }
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        if (
            reservation.status === "Cancel" ||
            reservation.status === "Check_out"
        ) {
            return res.status(400).json({ error: "Check-In not success" });
            //   return res.status(200).send(400);
        }

        if (reservation.status === "Check_in") {
            return res
                .status(402)
                .json({ error: "You have already checked in" });
            //   return res.status(200).send(402);
        }

        const existingCheckInLog = await feature6Client.check_in_log.findFirst({
            where: {
                reserveId: reservationId,
            },
        });
        if (existingCheckInLog) {
            return res
                .status(400)
                .json({ error: "You have already checked in" });
            //   return res.status(200).send(400);
        }

        const defaultCheckoutTime = new Date();
        defaultCheckoutTime.setHours(0, 0, 0, 0);
        const isSuccess = true;
        if (isSuccess) {
            await feature6Client.check_in_log.create({
                data: {
                    reserveId: reservationId,
                    check_in_time: checkInTime,
                    check_out_time: defaultCheckoutTime,
                },
            });

            const entry_time = addHours(new Date(), 7);
            await feature6Client.reservation.update({
                where: { reservationId },
                data: {
                    status: "Check_in",
                    entry_time: entry_time,
                },
            });
            const selectedTable =
                await feature6Client.reservation_table.findFirst({
                    where: {
                        reserveId: reservationId,
                    },
                    select: {
                        tableId: true,
                    },
                });

            await feature6Client.tables.update({
                where: {
                    tableId: selectedTable?.tableId,
                    isUsing: true,
                },
                data: {
                    status: "Unavailable",
                },
            });

            const reservationToken = genToken(reservationId);
            res.cookie("reservationToken", reservationToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            return res.send(200);
        }
    } catch (e) {
        console.log("test", e);
        return res.status(500).json(e);
    }
};

// Finished
// Generate QR Code
export const qrCode = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.params;
        const authToken = req.cookies.authToken;

        const reservation = await feature6Client.reservation.findUnique({
            where: { reservationId: parseInt(reservationId) },
        });
        if (reservation === null || reservation === undefined) {
            return res.status(404).json({ error: "Reservation not found" });
        }

        if (reservation.isPaidDeposit === "Pending") {
            return res.status(200).send(402);
        }
        const qrCodeData = {
            reservationId: reservationId,
            authToken: authToken,
        };

        const qrCodeText = JSON.stringify(qrCodeData);

        const qrCode = qr.image(qrCodeText, {
            type: "png",
        });
        res.type("png");
        return qrCode.pipe(res);
    } catch (e) {
        return res.status(500).json({ error: "QR code not success" });
    }
};

// CHECKOUT FUNCTION
// Finished
export const checkOut = async (req: Request, res: Response) => {
    try {
        const reservationId = parseInt(req.params.reservationId);
        const checkOutTime = addHours(new Date(), 7);

        const reservation = await feature6Client.reservation.findUnique({
            where: { reservationId },
        });
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        if (reservation.status !== "Check_in") {
            return res.status(400).json({ error: "Check-Out not success" });
        }
        if (reservation.isPaymentSuccess === "Pending") {
            return res.status(200).json("Payment Require");
        }

        const checkOutLog = await feature6Client.check_in_log.update({
            where: {
                reserveId: reservationId,
            },
            data: {
                reserveId: reservationId,
                check_out_time: checkOutTime,
            },
        });
        await feature6Client.reservation.update({
            where: { reservationId },
            data: {
                status: "Check_out",
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
        await feature6Client.tables.update({
            where: {
                tableId: selectedTable?.tableId,
                isUsing: true,
            },
            data: {
                status: "Available",
            },
        });

        if (reservationId == undefined) {
            res.status(500).json({ error: "reservationId not found" });
        }
        const logId = await feature6Client.chat_Room_Logs.findFirst({
            where: {
                reservationId: reservationId,
            },
        });
        await feature6Client.chat_Room_Logs.update({
            where: {
                logId: logId?.logId,
            },
            data: {
                access_status: false,
            },
        });

        res.clearCookie("reservationToken");
        return res.json({ checkOutLog });
    } catch (e) {
        return res.status(500).json(e);
    }
};

export const checkInStatus = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.params;
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }
        const getstatus = await feature6Client.reservation.findUnique({
            where: {
                reservationId: parseInt(reservationId),
            },
            select: {
                status: true,
            },
        });

        const hasReservationToken = (req: Request): boolean => {
            const reservationToken = req.cookies.reservationToken;
            return !!reservationToken; // Returns true if reservationToken exists, false otherwise
        };

        if (getstatus?.status === "Check_in" && !hasReservationToken(req)) {
            // Generate and set reservationToken in response headers
            const reservationToken = genToken(parseInt(reservationId));
            res.cookie("reservationToken", reservationToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
        }

        res.json(getstatus?.status);
    } catch (e) {
        return res.status(500).json(e);
    }
};

//Upload Image
export const uploadTableTypeImage = async (req: Request, res: Response) => {
    try {
        const { tableTypeDetailId } = req.body;
        let image_url;
        if (req.file.path.includes("/"))
            image_url = "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf('/') + 1);
        else if (req.file.path.includes("\\"))
            image_url = "/uploads/" + req.file.path.substring(req.file.path.lastIndexOf('\\') + 1);

        const image = await feature6Client.table_type_detail.update({
            where: {
                tableTypeDetailId: parseInt(tableTypeDetailId),
            },
            data: {
                image_url: image_url,
            }
        })

        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ err: "sorry something wrong" });
    }
};

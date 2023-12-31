import { Request, Response } from "express";
import authService from "../services/auth/auth.service";
import { PrismaClient } from "@prisma/client";
import { addHours } from "date-fns";
import { genToken } from "../services/reservation/genToken.service";

const mikPrismaClient = new PrismaClient();

export const ApiConnection = async (req: Request, res: Response) => {
    const url =
        process.env.MIKSERVER_URL + "/harmoniReserve" ||
        "https://mikserver.harmoni.social";
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to fetch data from other website");
    }
};

// Check In
export const ApiConfirmReserve = async (req: Request, res: Response) => {
    try {
        const status = req.body.status;
        const reservationId = req.body.reservation_id;
        const table_no = req.body.table_no;
        const branch_id = req.body.branch_id;

        const selectedTable = await mikPrismaClient.tables.findFirst({
            where: {
                table_no: table_no,
                branchId: branch_id,
                venueId: 2,
            },
            select: {
                tableId: true,
            },
        });

        if (!selectedTable) {
            return res
                .status(401)
                .json({ error: "No suitable tables available." });
        }
        const reservationTableEntry =
            await mikPrismaClient.reservation_table.create({
                data: {
                    reserveId: reservationId,
                    tableId: selectedTable.tableId,
                },
            });

        const entry_time = addHours(new Date(), 7);
        const updateReservation = await mikPrismaClient.reservation.update({
            where: {
                reservationId: reservationId,
            },
            data: {
                status: status,
                entry_time: entry_time,
                isPaidDeposit: "Completed"
            },
        });

        const checkInTime = addHours(new Date(), 7);
        const defaultCheckoutTime = new Date();
        defaultCheckoutTime.setHours(0, 0, 0, 0);

        await mikPrismaClient.check_in_log.create({
            data: {
                reserveId: reservationId,
                check_in_time: checkInTime,
                check_out_time: defaultCheckoutTime,
            },
        });

        await mikPrismaClient.tables.update({
            where: {
                tableId: selectedTable.tableId,
                isUsing: true,
            },
            data: {
                status: "Unavailable",
            },
        });

        res.status(200).json({ updateReservation, reservationTableEntry });
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to fetch data from other website");
    }
};

export const ApiReserve = async (req: Request, res: Response) => {
    const url =
        process.env.MIKSERVER_URL + "/api/harmoniReserve" ||
        "https://mikserver.harmoni.social";

    try {
        const token = req.cookies.authToken;

        const date = req.body.date;
        const time = req.body.time;
        const guest_amount = req.body.guest_amount;
        const fname = req.body.fname;
        const lname = req.body.lname;

        const phone = req.body.phone;
        const email = "harmoni.social@gmail.com";

        if (!token) {
            throw new Error("No auth token");
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "user") {
            throw new Error("Invalid  auth token");
        }

        const reserve_time = `${date}T${time}Z`;

        const { branchId } = req.body;
        const { userId } = decodedToken;
        const venueId = 2;

        const depositId = await mikPrismaClient.deposit.findFirst({
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
        const name = fname + " " + lname;
        const newReservation = await mikPrismaClient.reservation.create({
            data: {
                venueId,
                userId: userId,
                guest_amount,
                reserved_time: reserve_time,
                entry_time: reserve_time,
                status: "Pending",
                isPaidDeposit: "Pending",
                isReview: false,
                depositId: depositId?.depositId,
                branchId: branchId,
                name: name,
                phone: phone,
            },
        });

        const checkChatRoomId = await mikPrismaClient.venue.findFirst({
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
            await mikPrismaClient.chat_Room_Logs.create({
                data: {
                    chatRoomId: checkChatRoomId?.chatRoomId,
                    userId: userId,
                    access_status: true,
                    reservationId: newReservation.reservationId,
                },
            });
        }

        const reservationID = newReservation.reservationId;

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                phone: phone,
                email: email,
                date: date,
                time: time,
                guest_amount: guest_amount,
                reservation_id: reservationID,
                branch_id: branchId,
            }),
        });
        if (!response.ok) {
            if (newReservation) {
                await mikPrismaClient.reservation.delete({
                    where: { reservationId: newReservation.reservationId },
                });
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json({
            data,
            fname,
            lname,
            phone,
            email,
            date,
            time,
            guest_amount,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
};

// Check Out
export const ApiCheckOut = async (req: Request, res: Response) => {
    try {
        const reservationId = req.body.reservation_id;
        const checkOutTime = addHours(new Date(), 7);

        const checkOutLog = await mikPrismaClient.check_in_log.update({
            where: {
                reserveId: reservationId,
            },
            data: {
                reserveId: reservationId,
                check_out_time: checkOutTime,
            },
        });
        await mikPrismaClient.reservation.update({
            where: { reservationId },
            data: {
                status: "Check_out",
                isPaymentSuccess: "Completed"
            },
        });

        const selectedTable = await mikPrismaClient.reservation_table.findFirst(
            {
                where: {
                    reserveId: reservationId,
                },
                select: {
                    tableId: true,
                },
            }
        );
        await mikPrismaClient.tables.update({
            where: {
                tableId: selectedTable?.tableId,
                isUsing: true,
            },
            data: {
                status: "Available",
            },
        });

        if (reservationId == undefined){
            res.status(500).json({"error": "reservationId not found"})
        }
        const logId = await mikPrismaClient.chat_Room_Logs.findFirst({
            where: {
                reservationId: reservationId
            },
        });
        await mikPrismaClient.chat_Room_Logs.update({
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
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const checkInStatus_MIK = async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.params;
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "No auth token" });
        }

        const getstatus = await mikPrismaClient.reservation.findUnique({
            where: {
                reservationId: parseInt(reservationId),
            },
            select: {
                status: true,
            },
        });

        if (getstatus?.status == "Check_in") {
            const reservationToken = genToken(parseInt(reservationId));
            res.cookie("reservationToken", reservationToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
        }
        res.json(getstatus);
    } catch (e) {
        return res.status(500).json(e);
    }
};

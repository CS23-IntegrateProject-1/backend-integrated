import { Request, Response } from "express";
import authService from "../services/auth/auth.service";
// import MIKAPIRouter from "../routes/MIKAPI.routes";
import { prismaClient } from "./feature1.controller";
import { getAvailableTables } from "../services/reservation/getAvailableTables.service";
import { findSuitableTable } from "../services/reservation/findSuitable.service";


// import { PrismaClient } from "@prisma/client";

// const mikPrismaClient = new PrismaClient();

export const ApiConnection = async (req: Request, res: Response) => {
    const url =
        process.env.MIKSERVER_URL + "/harmoniReserve" ||
        "https://mikserver.harmoni.social";
    console.log(url);
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

export const ApiConfirmReserve = async (req: Request, res: Response) => {
    try{
        const status = req.body.status;
        const reservationId = req.body.reservation_id;
        const tableId = req.body.table_id;
        const reserved_time = req.body.time;
        const reserved_date = req.body.reserve_date;
        const venueId = req.body.venueId;
        const branchId = req.body.branchId;
        const guest_amount = req.body.guest_amount;

        console.log(venueId,branchId);
        console.log(tableId, reserved_time, reserved_date)

        let isResponse = true;
        const getAvailableTablesResponse = await getAvailableTables(req);
        // if (
        //     getAvailableTablesResponse.error == "No tables found in this venue"
        // ) {
        //     return res
        //         .status(400)
        //         .json({ error: "No tables found in this venue" });
        // } else if (
        //     getAvailableTablesResponse.error == "Venue is closed today"
        // ) {
        //     return res.status(400).json({ error: "Venue is closed today" });
        // } else if (
        //     getAvailableTablesResponse.error ==
        //     "Reservation time is not within valid hours"
        // ) {
        //     return res
        //         .status(400)
        //         .json({ error: "Reservation time is not within valid hours" });
        // } else if (
        //     getAvailableTablesResponse.error == "No more Available Table"
        // ) {
        //     return res.status(400).json({ error: "No more Available Table" });
        // }
        getAvailableTablesResponse + guest_amount;
        console.log(getAvailableTablesResponse + guest_amount);

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
        const reservationTableEntry =
        await prismaClient.reservation_table.create({
            data: {
                reserveId: reservationId,
                tableId: selectedTable[0].tableId,
            },
        });

        const updateReservation = await prismaClient.reservation.update({
            where: {
                reservationId: reservationId,
            },
            data: {
                status: status,
            },
        });
        res.status(200).json({updateReservation, reservationTableEntry});
        }
    }catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to fetch data from other website");
    }
}

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

        const phone = "0967928537";
        const email = "harmoni.social@gmail.com";

        if (!token) {
            throw new Error("No auth token");
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "user") {
            throw new Error("Invalid  auth token");
        }

        // const userInfo = await mikPrismaClient.user.findFirst({
        //     where: {
        //         userId: decodedToken.userId,
        //     },
        //     select: {
        //         fname: true,
        //         lname: true,
        //     }
        // });

        // console.log(phone);
        // return res.status(200).json({fname, lname, phone, email, date, time, guest_amount});
        
        // const reserve_time = date + "T" + time + ":.000Z";
        const reserve_time = `${date}T${time}Z`;

        const {
            branchId,
        } = req.body;
        const { userId } = decodedToken;
        const venueId = 2;

        const depositId = await prismaClient.deposit.findFirst({
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
        const name = fname+" "+lname
        const newReservation = await prismaClient.reservation.create({
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

        const reservationID = newReservation.reservationId;

        // console.log(newReservation.reservationId);

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
                reservation_id : reservationID,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.reservationId);
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
        res.status(500).json({ error: "Internal server error" });
    }
};
import { Request, Response } from "express";
import authService from "../services/auth/auth.service";
// import { PrismaClient } from "@prisma/client";


// const mikPrismaClient = new PrismaClient();

export const ApiConnection = async (req: Request, res: Response) => {
    const url = process.env.MIKSERVER_URL + "/harmoniReserve" || "https://mikserver.harmoni.social";
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

export const ApiReserve = async (req: Request, res: Response) => {

    const url = process.env.MIKSERVER_URL + "/api/harmoniReserve" || "https://mikserver.harmoni.social";

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
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json({data,fname, lname, phone, email, date, time, guest_amount});

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
}
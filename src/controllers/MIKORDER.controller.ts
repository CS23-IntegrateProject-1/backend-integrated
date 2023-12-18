// import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";

// const mikOrderClient = new PrismaClient();

export const getMikStock = async (req: any, res: Response,next:NextFunction) => {
    const branchId = 1;
    const url = process.env.MIKSERVER_URL || "http://localhost:11000";
    try {
        const result = await fetch(`${url}/api/harmoniStock`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ branch_id : branchId }),
        });
        const data = await result.json();
        req.StockPass=data;
        next();
        console.log(result)
        console.log(data[0]);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }   
}
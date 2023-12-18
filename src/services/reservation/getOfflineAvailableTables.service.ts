import { Day, PrismaClient } from "@prisma/client";
import authService from "../auth/auth.service";
import { addHours } from "date-fns";
import { Request } from "express";
import { error } from "console";


export const getOfflineAvailableTables = async (req: Request) => {
    try {
        const prisma = new PrismaClient();
        const token = req.cookies.authToken;
        if (!token) {
            throw new Error("No auth token");
        }
        const decodedToken = authService.decodeToken(token);
        if (decodedToken.userType != "business") {
            throw new Error("Invalid auth token");
        }

        const businessId = decodedToken.businessId;

        const getVenueId = await prisma.property.findFirst({
            where: {
                businessId: businessId,
            },
        });

        const venueId = getVenueId?.venueId;

        if (venueId == undefined || !venueId) {
            return { error: "Venue not found." };
        }

        const { reserve_date, time, branchId } = req.body;

        // try {
        const concatDatetime = `${reserve_date} ${time}`;
        const reservedTimeStart = new Date(concatDatetime);
        const ReservedTimeStart = addHours(new Date(reservedTimeStart), 5);

        const tables = await prisma.tables.findMany({
            where: { venueId, branchId, isUsing: true },
        });

        if (tables.length === 0) {
            return { error: "No tables found in this venue" };
        }

        const DateTimeStart: Date = addHours(new Date(reservedTimeStart), 7);
        const dateOnly = DateTimeStart.toISOString().split("T")[0];
        const TodayDate = new Date(dateOnly);
        const reservedTimeEnd = addHours(new Date(reservedTimeStart), 9);
        const isoStartTime = new Date(ReservedTimeStart).toISOString();
        const isoEndTime = reservedTimeEnd.toISOString();
        const [year, month, d] = reserve_date.split(/[- :]/);
        const DateString = `${year}-${month}-${d}`;
        const myDate = new Date(DateString);
        const day = myDate.getDay();
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const isopen = await prisma.opening_day.findMany({
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

        let pos;
        for (let index = 0; index < daysOfWeek.length; index++) {
            if (openday[openday.length - 1] == daysOfWeek[index]) pos = index;
        }

        openday.push(daysOfWeek[pos + 1]);

        let canreserve = 0;
        for (let index = 0; index < openday.length; index++) {
            if (daysOfWeek[day] == openday[index]) canreserve++;
        }

        if (canreserve === 0) {
            return { error: "Venue is closed today" };
        }

        const dayName = daysOfWeek[day];
        const opening = await prisma.opening_day.findMany({
            where: {
                venueId,
                day: dayName as Day,
            },
        });

        let notOpen = false;
        const dayBefore = daysOfWeek[day - 1];
        if (opening.length === 0) {
            const openBefore = await prisma.opening_day.findMany({
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
                return { error: "Venue is closed today" };
            } else {
                notOpen = true;
            }
        }

        let open, close;
        if (notOpen) {
            const openBefore = await prisma.opening_day.findMany({
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

        if (DateTimeStart < openDate || DateTimeStart > twoHoursBeforeClose) {
            return { error: "Reservation time is not within valid hours." };
        }

        const overlappingReservations = await prisma.reservation.findMany({
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

        const allTables = await prisma.tables.findMany({
            where: {
                venueId: venueId,
                isUsing: true,
            },
            include: {
                table_type: true,
            },
        });

        const reservedTableIds: number[] = await Promise.all(
            overlappingReservations.map(async (reservation) => {
                const tables = await prisma.reservation_table.findMany({
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
            return { error: "No more Available Table" };
        }
        const availableTables2 = {
            availableTables: availableTables,
            guestAmount: req.body.guest_amount,
        };

        return availableTables2;
    } catch (e) {
        return error(e);
    }
};
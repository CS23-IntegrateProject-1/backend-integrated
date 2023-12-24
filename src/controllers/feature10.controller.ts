import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmService from "../services/movie/films.service";
import theaterService from "../services/movie/theaters.service";
//import showService from "../services/movie/shows.service";
import seatsService from "../services/movie/seats.service";
import reservationService from "../services/movie/reservation.service";
import authService from "../services/auth/auth.service";
import { AxiosError } from "axios";
import filmsService from "../services/movie/films.service";
import bookSeatService from "../services/movie/bookSeat.service";
import showsService from "../services/movie/shows.service";
import paymentService from "../services/movie/payment.service";

//import majorAPIService from "../services/movie/majorAPI.service";

const prisma = new PrismaClient();

// export const getfeature10 = async (req: Request, res: Response) => {};

export const getAllFilms = async (req: Request, res: Response) => {
  try {
    const data = await filmService.getAllFilms();
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getShowingFilms = async (req: Request, res: Response) => {
  try {
    const params = req.query;
    let data: any[];
    if (params.type) {
      if (params.type === "IMAX") {
        data = await filmService.getShowingImaxFilms();
      } else if (params.type === "Standard") {
        data = await filmService.getShowingStandardFilms();
      } else if (params.type === "X3D") {
        data = await filmService.getShowing3DFilms();
      } else if (params.type === "X4D") {
        data = await filmService.getShowing4DFilms();
      } else {
        data = await filmService.getShowingKidFilms();
      }
    } else {
      data = await filmService.getAllFilms();
    }
    res.status(200).send(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getFilmsById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await filmService.getFilmsById(id);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getNowShowingFilms = async (req: Request, res: Response) => {
  try {
    const data = await filmService.getNowShowingFilms();
    if (data.length === 0) {
      res.status(404).json({ error: "No films are currently showing" });
    }
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getUpcomingFilms = async (req: Request, res: Response) => {
  try {
    const data = await filmService.getUpcomingFilms();
    if (data.length === 0) {
      res.status(404).json({ error: "No upcoming films" });
    }
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getShowsByFilmIdandDate = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    const date = req.body.date;
    const year = req.body.year;
    const month = req.body.month;
    const data = await filmsService.getShowsByFilmIdandDate(
      id,
      date,
      month,
      year
    );
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

// export const getShowsByTheaterId = async (req: Request, res: Response) => {
//     try {
//       const id = Number(req.body.id);
//       const date = req.body.date;
//       const year = req.body.year;
//       const month = req.body.month;

//       const data = await showService.getShowsByTheaterId(id, date, month, year);
//       res.json(data);
//     } catch (e: any) {
//       console.log(e);
//       res.status(500).json({ error: e.message });
//     }
// };

//กดเข้าจาก theater
export const getFilmsByTheaterId = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const date = req.body.date;
    const year = req.body.year;
    const month = req.body.month;

    const data = await filmService.getFilmsByTheaterId(id, date, month, year);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const getShowsByTheaterIdandScreenIdandDate = async (
  req: Request,
  res: Response
) => {
  try {
    const filmId = Number(req.body.filmId);
    const date = req.body.date;
    const year = req.body.year;
    const month = req.body.month;

    const data = await showsService.getShowsByTheaterIdandScreenIdandDate(
      filmId,
      date,
      month,
      year
    );
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//เปลี่ยนไปใช้ getShowsByFilmIdandDate แทนน่าจะดีกว่า
// export const getShowsByFilmId = async (req: Request, res: Response) => {
//     try {const id = Number(req.params.id);
//   // const date = req.params.date;
//   const data = await showService.getShowsByFilmId(id);
//   res.json(data);
//     } catch (e: any) {
//       console.log(e);
//       res.status(500).json({ error: e.message });
//     }

// };

//ใช้อันนี้ตอนกดshowแล้วเข้าไปหน้าseat
export const getSeatByShowId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    const data = await seatsService.getSeatByShowId(id);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//page4

export const getTheaterById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await theaterService.getTheaterById(id);
    res.status(200).json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//price * price_modifier
export const getTotalPriceByReservationId = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.body.id;
    const data = await reservationService.getTotalPriceByReservationId(id);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//ใช้ทำอะไรจำไม่ได้ละ
export const getReservationById = async (req: Request, res: Response) => {
  try {
    //select all data
    const id = req.body.id;
    const data = await reservationService.getReservationById(id);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//ใช้ตอนจะเอา history ของuserคนนั้น --> เรียกข้อมูลทุกอย่างหมดเลยลึ่มๆ
export const getReservationByUserId = async (req: Request, res: Response) => {
  try {
    const id = authService.decodeToken(req.cookies.authToken).userId;
    const data = await reservationService.getReservationByUserId(id);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//ใช้ตอนคนกดจองที่นั่งเรียบร้อยแล้วกำลังจะไปหน้า payment ถ้าผ่านอันนี้จะไปจ่ายได้ ถ้าไม่ผ่านแสดงว่ามีคนจองแล้วหรือerror
export const bookSeatAndSendCookie = async (req: Request, res: Response) => {
  const reservationIdsForError: number[] = [];
  try {
    const showId: number = Number(req.body.showId);
    const seatIds: number[] = req.body.seatId;
    console.log("seatIds: ", seatIds);
    console.log("showId: ", showId);

    const userId = authService.decodeToken(req.cookies.authToken).userId;
    console.log("userId: ", userId);

    try {
      for (const seatId of seatIds) {
        const isSeatAvailable = await bookSeatService.getMinorAvilableSeats(
          showId,
          seatId
        );
        if (!isSeatAvailable.data) {
          return res.status(400).json({
            error: `Seat ${seatId} is not available`,
          });
        }
      }
      const reservationIds: number[] =
        await bookSeatService.createMinorReservation(seatIds, showId);
      console.log("Created Reservation in major with id: ");
      for (const reservationId of reservationIds) {
        console.log(reservationId);
      }
      console.log("--------------------");
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
        return res.status(e.response?.status || 500).json({
          error: e.response?.data.error,
          message: "Minor Api Axios Error",
        });
      }
      return res.status(500).json({ error: "reservation failed" });
    }

    console.log("Create Major reservation success");
    console.log("Creating Harmoni reservation logs");
    const harmoniLogs: number[] = [];
    //const harmoniPaymentLogs: number[] = [];
    try {
      for (const seatId of seatIds) {
        const response = await prisma.reservation_logs.create({
          data: {
            showId: showId,
            seatId: seatId,
            userId: userId,
          },
        });
		console.log("create reservation_logs: ", response.reservationId);
		
        harmoniLogs.push(response.reservationId);
        reservationIdsForError.push(response.reservationId);
      }
      let totalAmount = 0;
      for (const reservationId of harmoniLogs) {
        totalAmount += await reservationService.getTotalPriceByReservationId(
          reservationId
        );
		console.log("totalAmount: ", totalAmount);
		
      }
      for (const reservationId of harmoniLogs) {
         await prisma.payments.create({
          data: {
            reservationId: reservationId,
            payment_date: new Date(),
            payment_amount: totalAmount,
            payment_status: "Pending",
          },
        });
        // harmoniPaymentLogs.push(response.paymentId);
        // console.log("harmoniPaymentLogs: ", harmoniPaymentLogs);
      }
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "Cannot Create harmoni reservation logs" });
    }

    console.log("Creating Cookies");

    res.cookie(
      "movieReservationToken",
      bookSeatService.createCookie(harmoniLogs, userId),
      {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      }
    );
    console.log("Sent Cookies");
    console.log("Create Harmoni reservation logs success");

	paymentService.waitForPayment(harmoniLogs);

    return res.status(200).json({ available: true });
  } catch (e) {
    console.log(e);
    for (const reservationId of reservationIdsForError) {
      await bookSeatService.deleteReservation(reservationId);
    }
    return res.status(500).json({ error: "Unknown Error Encountered" });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { resevationIds } = authService.decodeToken(
      req.cookies.movieReservationToken
    );
    const data: any = [];
    for (const reservationId of resevationIds) {
      const response = await bookSeatService.deleteReservation(reservationId);
      data.push(response);
    }
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

export const updatePaymentStatusToSuccess = async (req: Request, res: Response) => {
  try {
    const reservationId = Number(req.body.reservationId);
    const data = await paymentService.updatePaymentStatusToSuccess(reservationId);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
}

import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmService from "../services/movie/films.service";
import theaterService from "../services/movie/theaters.service";
//import showService from "../services/movie/shows.service";
import seatsService from "../services/movie/seats.service";
import reservationService from "../services/movie/reservation.service";
import jwt from "jsonwebtoken";
import authService from "../services/auth/auth.service";
import { MajorAxios as Axios } from "../configs/MajorAxiosInstance";
import { AxiosError } from "axios";
import filmsService from "../services/movie/films.service";

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
    const id = Number(req.body.id);
    const data = await reservationService.getReservationByUserId(id);
    res.json(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

//ใช้ตอนคนกดจองที่นั่งเรียบร้อยแล้วกำลังจะไปหน้า payment ถ้าผ่านอันนี้จะไปจ่ายได้ ถ้าไม่ผ่านแสดงว่ามีคนจองแล้วหรือerror
export const bookSeatAndSendCookie = async (req: Request, res: Response) => {
  try {
    const showId = Number(req.body.showId);
    const seatId = Number(req.body.seatId);
    const userId = authService.decodeToken(req.cookies.authToken).userId;
    let reservationResult;
    try {
      reservationResult = await Axios.post("/api/reservation/create", {
        showId,
        seatId,
      });

      console.log(reservationResult.status);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
        return res
          .status(e.response?.status || 500)
          .json({ error: e.response?.data.error });
      }
      return res.status(500).json({ error: "reservation failed" });
    }

    const reservationId = reservationResult.data.reservationId;
    const secretKey = process.env.JWT_SECRET as string;

    const movieReservationToken = jwt.sign(
      { reservationId: reservationId, userId: userId },
      secretKey,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("movieReservationToken", movieReservationToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    // ไม่ต้องประกาศก็ได้ มั้งงงง
    //const createReservation =
    await prisma.reservation_logs.create({
      data: {
        showId: showId,
        seatId: seatId,
        userId: userId,
      },
    });

    return res.status(200).json({ available: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Unknown Error Encountered" });
  }
};



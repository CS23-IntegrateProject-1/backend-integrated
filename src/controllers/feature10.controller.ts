import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmService from "../services/movie/films.service";
import theaterService from "../services/movie/theaters.service";
import showService from "../services/movie/shows.service";
import seatsService from "../services/movie/seats.service";
import reservationService from "../services/movie/reservation.service";
import jwt from "jsonwebtoken";
import authService from "../services/auth/auth.service";
import { MajorAxios as Axios } from "../configs/MajorAxiosInstance";
import { AxiosError } from "axios";

const prisma = new PrismaClient();

// export const getfeature10 = async (req: Request, res: Response) => {};

export const getAllFilms = async (req: Request, res: Response) => {
  const data = await filmService.getAllFilms();
  res.json(data);
};

export const getShowingFilms = async (req: Request, res: Response) => {
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
};

export const getFilmsById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await filmService.getFilmsById(id);
  res.json(data);
};

export const getNowShowingFilms = async (req: Request, res: Response) => {
  const data = await filmService.getNowShowingFilms();
  if (data.length === 0) {
    res.status(404).json({ error: "No films are currently showing" });
  }
  res.json(data);
};

export const getUpcomingFilms = async (req: Request, res: Response) => {
  const data = await filmService.getUpcomingFilms();
  if (data.length === 0) {
    res.status(404).json({ error: "No upcoming films" });
  }
  res.json(data);
};

export const getShowsByFilmId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  // const date = req.params.date;

  const data = await showService.getShowsByFilmId(id);
  res.json(data);
};

//make it distinct????????????????????????????????????????????????
export const getSeatsTypeByScreenId = async (req: Request, res: Response) => {
  try {
    // const id = Number(req.params.id);
    const seat_types = await prisma.seat_types.findMany({});
    res.json(seat_types);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getSeatByScreenId = async (req: Request, res: Response) => {
  const id = req.body.id;
  const data = await seatsService.getSeatByScreenId(id);
  res.json(data);
};

//page4

export const getShowsByTheaterId = async (req: Request, res: Response) => {
  const id = Number(req.body.id);
  const date = req.body.date;
  const year = req.body.year;
  const month = req.body.month;

  const data = await showService.getShowsByTheaterId(id, date, month, year);
  res.json(data);
};

export const getFilmsByTheaterId = async (req: Request, res: Response) => {
  const id = req.body.id;
  const date = req.body.date;
  const year = req.body.year;
  const month = req.body.month;

  const data = await filmService.getFilmsByTheaterId(id, date, month, year);
  res.json(data);
};

export const getTheaterById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await theaterService.getTheaterById(id);
  res.status(200).json(data);
};

export const getTotalPriceByReservationId = async (
  req: Request,
  res: Response
) => {
  const id = req.body.id;
  const data = await reservationService.getTotalPriceByReservationId(id);
  res.json(data);
};

export const getReservationById = async (req: Request, res: Response) => {
  //select all data
  const id = req.body.id;
  const data = await reservationService.getReservationById(id);
  res.json(data);
};

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

    const createReservation = await prisma.reservation_logs.create({
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

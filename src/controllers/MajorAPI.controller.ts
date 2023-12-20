import { Request, Response } from "express";
import majorAPIService from "../services/movie/majorAPI.service";
import filmsService from "../services/movie/films.service";
import { Film } from "../interface/movie/film.interface";
import theatersService from "../services/movie/theaters.service";
import { Theater } from "../interface/movie/theater.interface";
import screensService from "../services/movie/screens.service";
import { Screen } from "../interface/movie/screen.interface";
import seatsService from "../services/movie/seats.service";
import { SeatType } from "../interface/movie/seatType.interface";
import { Seat } from "../interface/movie/seat.interface";
import showsService from "../services/movie/shows.service";
import { Show } from "../interface/movie/show.interface";

// import { get } from "http";

const getFilmFromHarmoni = filmsService.getAllFilms;
const getTheaterFromHarmoni = theatersService.getAllTheaters;
const getScreenFromHarmoni = screensService.getAllScreens;
const getSeatTypeFromHarmoni = seatsService.getAllSeatTypes;
const getSeatFromHarmoni = seatsService.getAllSeats;
const getShowFromHarmoni = showsService.getAllShows;

class MajorAPIController {
  async getFilmsFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getFilmsFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
  async getTheaterFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getTheatersFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
  async getScreenFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getScreenFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
  async getSeatTypeFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getSeatTypeFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
  async getSeatFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getSeatFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
  async getShowFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getShowFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }

  //   async addNewFilms(req: Request, res: Response) {
  //     try {
  //       const majorData: Film[] = await majorAPIService.getFilmsFromMajor();
  //       const harmoniData: Film[] = await getFilmFromHarmoni();

  //       const newDataMajor: Film[] = majorData.filter(
  //         (film) => !harmoniData.some((hFilm) => hFilm.filmId === film.filmId)
  //       );
  //       majorAPIService.addNewFilms(newDataMajor);
  //       res.status(200).send(newDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  //   async deleteOutdatedFilms(req: Request, res: Response) {
  //     try {
  //       const majorData: Film[] = await majorAPIService.getFilmsFromMajor();
  //       const harmoniData: Film[] = await getFilmFromHarmoni();

  //       const deletedDataMajor: Film[] = harmoniData.filter(
  //         (hFilm) => !majorData.some((film) => film.filmId === hFilm.filmId)
  //       );
  //       majorAPIService.deleteOutdatedFilms(deletedDataMajor);
  //       res.status(200).send(deletedDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  //   async addNewTheaters(req: Request, res: Response) {
  //     try {
  //       const majorData: Theater[] = await majorAPIService.getTheatersFromMajor();
  //       const harmoniData: Theater[] = await getTheaterFromHarmoni();

  //       const newDataMajor: Theater[] = majorData.filter(
  //         (theater) =>
  //           !harmoniData.some(
  //             (hTheater) => hTheater.theaterId === theater.theaterId
  //           )
  //       );
  //       majorAPIService.addNewTheaters(newDataMajor);
  //       res.status(200).send(newDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  //   async deleteOutdatedTheaters(req: Request, res: Response) {
  //     try {
  //       const majorData: Theater[] = await majorAPIService.getTheatersFromMajor();
  //       const harmoniData: Theater[] = await getTheaterFromHarmoni();

  //       const deletedDataMajor: Theater[] = harmoniData.filter(
  //         (hTheater) =>
  //           !majorData.some((theater) => theater.theaterId === hTheater.theaterId)
  //       );
  //       majorAPIService.deleteOutdatedTheaters(deletedDataMajor);
  //       res.status(200).send(deletedDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  //   async addNewScreens(req: Request, res: Response) {
  //     try {
  //       const majorData: Screen[] = await majorAPIService.getScreenFromMajor();
  //       const harmoniData: Screen[] = await getScreenFromHarmoni();

  //       const newDataMajor: Screen[] = majorData.filter(
  //         (screen) =>
  //           !harmoniData.some((hScreen) => hScreen.screenId === screen.screenId)
  //       );
  //       majorAPIService.addNewScreens(newDataMajor);
  //       res.status(200).send(newDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  //   async deleteOutdatedScreens(req: Request, res: Response) {
  //     try {
  //       const majorData: Screen[] = await majorAPIService.getScreenFromMajor();
  //       const harmoniData: Screen[] = await getScreenFromHarmoni();

  //       const deletedDataMajor: Screen[] = harmoniData.filter(
  //         (hScreen) =>
  //           !majorData.some((screen) => screen.screenId === hScreen.screenId)
  //       );
  //       majorAPIService.deleteOutdatedScreens(deletedDataMajor);
  //       res.status(200).send(deletedDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  //   async addNewSeatTypes(req: Request, res: Response) {
  //     try {
  //       const majorData: SeatType[] =
  //         await majorAPIService.getSeatTypeFromMajor();
  //       const harmoniData: SeatType[] = await getSeatTypeFromHarmoni();

  //       const newDataMajor: SeatType[] = majorData.filter(
  //         (seatType) =>
  //           !harmoniData.some(
  //             (hSeatType) => hSeatType.seatTypeId === seatType.seatTypeId
  //           )
  //       );
  //       majorAPIService.addNewSeatTypes(newDataMajor);
  //       res.status(200).send(newDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  //   async deleteOutdatedSeatTypes(req: Request, res: Response) {
  //     try {
  //       const majorData: SeatType[] =
  //         await majorAPIService.getSeatTypeFromMajor();
  //       const harmoniData: SeatType[] = await getSeatTypeFromHarmoni();

  //       const deletedDataMajor: SeatType[] = harmoniData.filter(
  //         (hSeatType) =>
  //           !majorData.some(
  //             (seatType) => seatType.seatTypeId === hSeatType.seatTypeId
  //           )
  //       );
  //       majorAPIService.deleteOutdatedSeatTypes(deletedDataMajor);
  //       res.status(200).send(deletedDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  //   async addNewSeats(req: Request, res: Response) {
  //     try {
  //       const majorData: Seat[] = await majorAPIService.getSeatFromMajor();
  //       const harmoniData: Seat[] = await getSeatFromHarmoni();

  //       const newDataMajor: Seat[] = majorData.filter(
  //         (seat) => !harmoniData.some((hSeat) => hSeat.seatId === seat.seatId)
  //       );
  //       majorAPIService.addNewSeats(newDataMajor);
  //       res.status(200).send(newDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  //   async deleteOutdatedSeats(req: Request, res: Response) {
  //     try {
  //       const majorData: Seat[] = await majorAPIService.getSeatFromMajor();
  //       const harmoniData: Seat[] = await getSeatFromHarmoni();

  //       const deletedDataMajor: Seat[] = harmoniData.filter(
  //         (hSeat) => !majorData.some((seat) => seat.seatId === hSeat.seatId)
  //       );
  //       majorAPIService.deleteOutdatedSeats(deletedDataMajor);
  //       res.status(200).send(deletedDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  //   async addNewShows(req: Request, res: Response) {
  //     try {
  //       const majorData: Show[] = await majorAPIService.getShowFromMajor();
  //       const harmoniData: Show[] = await getShowFromHarmoni();

  //       const newDataMajor: Show[] = majorData.filter(
  //         (show) => !harmoniData.some((hShow) => hShow.showId === show.showId)
  //       );
  //       majorAPIService.addNewShows(newDataMajor);
  //       res.status(200).send(newDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  //   async deleteOutdatedShows(req: Request, res: Response) {
  //     try {
  //       const majorData: Show[] = await majorAPIService.getShowFromMajor();
  //       const harmoniData: Show[] = await getShowFromHarmoni();

  //       const deletedDataMajor: Show[] = harmoniData.filter(
  //         (hShow) => !majorData.some((show) => show.showId === hShow.showId)
  //       );
  //       majorAPIService.deleteOutdatedShows(deletedDataMajor);
  //       res.status(200).send(deletedDataMajor);
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }

  //Paymentจริงๆไม่ต้องทำก็ได้รึป่าว???
  async getPaymentFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getPaymentFromMajor();
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }

  async postReservationToMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.postReservationToMajor(req.body);
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
  //   async getFilmsFromMajor(req: Request, res: Response) {
  //     try {
  //       const majorData: Film[] = await majorAPIService.getFilmsFromMajor();
  //       const harmoniData: Film[] = await getFilmFromHarmoni();

  //       const newDataMajor: Film[] = majorData.filter(
  //         (film) => !harmoniData.some((hFilm) => hFilm.filmId === film.filmId)
  //       );

  //       const deletedDataMajor: Film[] = harmoniData.filter(
  //         (hFilm) => !majorData.some((film) => film.filmId === hFilm.filmId)
  //       );

  //       majorAPIService.addNewFilms(newDataMajor);
  //       majorAPIService.deleteOutdatedFilms(deletedDataMajor);

  //       res.status(200).send(majorData);
  //     } catch (e: any) {
  //         console.log(e);
  //     }
  //   }

  //   async getTheaterFromMajor(req: Request, res: Response) {
  //     try {
  //       const majorData: Theater[] = await majorAPIService.getTheatersFromMajor();
  //       const harmoniData: Theater[] = await getTheaterFromHarmoni();

  //       const newDataMajor: Theater[] = majorData.filter(
  //         (theater) => !harmoniData.some((hTheater) => hTheater.theaterId === theater.theaterId)
  //       );

  //       const deletedDataMajor: Theater[] = harmoniData.filter(
  //         (hTheater) => !majorData.some((theater) => theater.theaterId === hTheater.theaterId)
  //       );

  //       majorAPIService.addNewTheaters(newDataMajor);
  //       majorAPIService.deleteOutdatedTheaters(deletedDataMajor);

  //       res.status(200).send(majorData);
  //     } catch (e: any) {
  //         console.log(e);
  //     }
  //   }

    async updateData(req: Request, res: Response) {
      try {
        await majorAPIService.addNewScreens();
        await majorAPIService.addNewSeatTypes();
        await majorAPIService.addNewSeats();
        await majorAPIService.addNewShows();
        await majorAPIService.addNewFilms();
        await majorAPIService.addNewTheaters();
        
        await majorAPIService.deleteOutdatedSeatTypes();
        await majorAPIService.deleteOutdatedSeats();
        await majorAPIService.deleteOutdatedShows();
        await majorAPIService.deleteOutdatedFilms();
        await majorAPIService.deleteOutdatedScreens();
        await majorAPIService.deleteOutdatedTheaters();
        
        res.status(200).send("Update success");
      } catch (e: any) {
        console.log(e);
        res.status(500).send("Update failed");
      }
    }
}

export default new MajorAPIController();

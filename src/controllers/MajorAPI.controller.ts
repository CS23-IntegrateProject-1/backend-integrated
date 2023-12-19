import { Request, Response } from "express";
import majorAPIService from "../services/movie/majorAPI.service";
import filmsService from "../services/movie/films.service";
import theatersService from "../services/movie/theaters.service";
import { Film } from "../interface/movie/film.interface";
import { Theater } from "../interface/movie/theater.interface";
import { get } from "http";

const getFilmFromHarmoni = filmsService.getAllFilms;
const getTheaterFromHarmoni = theatersService.getAllTheaters;

class MajorAPIController {
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

    async getShowsFromMajor(req: Request, res: Response) {
        try {
        const response = await majorAPIService.getShowFromMajor();
        res.status(200).send(response);
        } catch (e: any) {
            console.log(e);
        }
    }

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

}

export default new MajorAPIController();

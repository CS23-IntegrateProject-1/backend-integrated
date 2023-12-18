import { Request, Response } from "express";
import majorAPIService from "../services/movie/majorAPI.service";
import filmsService from "../services/movie/films.service";
import { Film } from "../interface/movie/film.interface";
import { Theater } from "../interface/movie/theater.interface";

const getFilmFromHarmoni = filmsService.getAllFilms;

class MajorAPIController {
  // async getFilmsFromMajor(req: Request, res: Response) {
  //     try {
  //         const response = await majorAPIService.getFilmsFromMajor();
  //         res.status(200).send(response);
  //        } catch(e: any) {}
  // }

  async getFilmsFromMajor(req: Request, res: Response) {
    try {
      const majorData: Film[] = await majorAPIService.getFilmsFromMajor();
      const harmoniData: Film[] = await getFilmFromHarmoni();

      const newDataMajor: Film[] = majorData.filter(
        (film) => !harmoniData.some((hFilm) => hFilm.filmId === film.filmId)
      );

      const deletedDataMajor: Film[] = harmoniData.filter(
        (hFilm) => !majorData.some((film) => film.filmId === hFilm.filmId)
      );

      majorAPIService.addNewFilms(newDataMajor);
      majorAPIService.deleteOutdatedFilms(deletedDataMajor);

      res.status(200).send(majorData);
    } catch (e: any) {}
  }

  async getTheaterFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getTheaterFromMajor();
      res.status(200).send(response);
    } catch (e: any) {}
  }

  async getSeatTypeFromMajor(req: Request, res: Response) {
    try {
      const response = await majorAPIService.getSeatTypeFromMajor();
      res.status(200).send(response);
    } catch (e: any) {}
  }
}

export default new MajorAPIController();

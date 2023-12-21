import { Request, Response } from "express";
import majorAPIService from "../services/movie/majorAPI.service";

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

  async updateData(req: Request, res: Response) {
    try {
      await majorAPIService.addNewTheaters();
      await majorAPIService.addNewFilms();
      await majorAPIService.addNewScreens();
      await majorAPIService.addNewShows();
      await majorAPIService.addNewSeatTypes();
      await majorAPIService.addNewSeats();

      await majorAPIService.deleteOutdatedSeats();
      await majorAPIService.deleteOutdatedSeatTypes();
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

  async getReserveSeatFromMajor(req: Request, res: Response) {
    try {
      const showId = Number(req.body.showId);
      const response = await majorAPIService.getReserveSeatFromMajor(showId); 
      res.status(200).send(response);
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default new MajorAPIController();

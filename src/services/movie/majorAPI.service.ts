import { Genre, PrismaClient } from "@prisma/client";
import { Axios } from "../../configs/MajorAxiosInstance";
import { Film } from "../../interface/movie/film.interface";
import { Theater } from "../../interface/movie/theater.interface";
import theatersService from "./theaters.service";

class MajorAPIService {
  prisma = new PrismaClient();

  async getFilmsFromMajor() {
    try {
      const response = await Axios.get("/film/getFilm");
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
  }

  async addNewFilms(addQueue: Film[]) {
    try {
      for (const film of addQueue) {
        const genre = film.genre;
        await this.prisma.films.create({
          data: {
            filmId: film.filmId,
            name: film.name,
            language: film.language,
            synopsis: film.synopsis,
            release_date: film.release_date,
            duration: film.duration,
            poster_img: film.poster_img,
            rate: film.rate,
            genre: Genre[genre],
          },
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async deleteOutdatedFilms(deleteQueue: Film[]) {
    try {
      for (const film of deleteQueue) {
        await this.prisma.films.delete({
          where: {
            filmId: film.filmId,
          },
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async getTheatersFromMajor() {
    try {
      const response = await Axios.get("/theater/getTheaters");
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
  }

  async addNewTheaters(addQueue: Theater[]) {
    try {
      for (const theater of addQueue) {
        await this.prisma.theaters.create({
          data: {
            theaterId: theater.theaterId,
            name: theater.name,
            address: theater.address,
            phone_num: theater.phone_num,
            promptpay_num: theater.promptpay_num,
            latitude: theater.latitude,
            longitude: theater.longitude,
          },
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async deleteOutdatedTheaters(deleteQueue: Theater[]) {
    try {
      for (const theater of deleteQueue) {
        await this.prisma.theaters.delete({
          where: {
            theaterId: theater.theaterId,
          },
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async getScreenFromMajor() {
    try {
      const response = await Axios.get("/screen/getScreens");
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
  }

  async getSeatTypeFromMajor() {
    try {
      const response = await Axios.get("/seatType/getSeatTypes");
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default new MajorAPIService();

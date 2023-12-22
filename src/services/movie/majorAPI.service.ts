import { Films_genre, PrismaClient, Screens_screen_type } from "@prisma/client";
import { MajorAxios as Axios } from "../../configs/MajorAxiosInstance";

import filmsService from "./films.service";
import { Film, RecievedFilm } from "../../interface/movie/film.interface";
import theatersService from "./theaters.service";
import {
  RecievedTheater,
  Theater,
} from "../../interface/movie/theater.interface";
import screensService from "./screens.service";
import { RecievedScreen, Screen } from "../../interface/movie/screen.interface";
import seatsService from "./seats.service";
import {
  RecievedSeatType,
  SeatType,
} from "../../interface/movie/seatType.interface";
import { RecievedSeat, Seat } from "../../interface/movie/seat.interface";
import showsService from "./shows.service";
import { RecievedShow, Show } from "../../interface/movie/show.interface";

const getFilmFromHarmoni = filmsService.getAllFilms;
const getTheaterFromHarmoni = theatersService.getAllTheaters;
const getScreenFromHarmoni = screensService.getAllScreens;
const getSeatTypeFromHarmoni = seatsService.getAllSeatTypes;
const getSeatFromHarmoni = seatsService.getAllSeats;
const getShowFromHarmoni = showsService.getAllShows;

class MajorAPIService {
  prisma = new PrismaClient();
  //
  async getFilmsFromMajor() {
    const response = await Axios.get("/film/getFilm");
    return response.data;
  }

  async addNewFilms() {
    const majorData: RecievedFilm[] = await this.getFilmsFromMajor();
    const harmoniData: Film[] = await getFilmFromHarmoni();
    const newDataMajor: RecievedFilm[] = majorData.filter(
      (film) => !harmoniData.some((hFilm) => hFilm.filmId === film.filmId)
    );

    for (const film of newDataMajor) {
      const genre = film.genre;
      await this.prisma.films.create({
        data: {
          filmId: film.filmId,
          name: film.name,
          language: film.language,
          synopsis: film.synopsis,
          release_date: film.releaseDate,
          duration: film.duration,
          poster_img: film.posterImg,
          rate: film.rate,
          genre: Films_genre[genre],
        },
      });
    }
  }

  async deleteOutdatedFilms() {
    const majorData: Film[] = await this.getFilmsFromMajor();
    const harmoniData: Film[] = await getFilmFromHarmoni();
    const deletedDataMajor: Film[] = harmoniData.filter(
      (hFilm) => !majorData.some((film) => film.filmId === hFilm.filmId)
    );

    for (const film of deletedDataMajor) {
      await this.prisma.films.delete({
        where: {
          filmId: film.filmId,
        },
      });
    }
  }

  async editFilm() {
    const majorData: Film[] = await this.getFilmsFromMajor();
    const harmoniData: Film[] = await getFilmFromHarmoni();

    for (const film of majorData) {
      const harmoniFilm = harmoniData.find(
        (hFilm) => hFilm.filmId === film.filmId
      );

      if (harmoniFilm) {
        const hasChanged =
          film.name !== harmoniFilm.name ||
          film.genre !== harmoniFilm.genre ||
          film.language !== harmoniFilm.language ||
          film.synopsis !== harmoniFilm.synopsis ||
          film.release_date !== harmoniFilm.release_date ||
          film.duration !== harmoniFilm.duration ||
          film.poster_img !== harmoniFilm.poster_img ||
          film.rate !== harmoniFilm.rate;

        if (hasChanged) {
          //const genre = majorFilm.genre;
          this.prisma.films.update({
            where: {
              filmId: film.filmId,
            },
            data: {
              name: film.name,
              genre: Films_genre[film.genre],
              language: film.language,
              synopsis: film.synopsis,
              release_date: film.release_date,
              duration: film.duration,
              poster_img: film.poster_img,
              rate: film.rate,
            },
          });
        }
      }
      console.log("edit filmId: " + film.filmId);
    }
  }
  //
  async getScreenFromMajor() {
    const response = await Axios.get("/screen/getAllScreens");
    return response.data;
  }

  async addNewScreens() {
    const majorData: RecievedScreen[] = await this.getScreenFromMajor();
    let harmoniData: Screen[] = await getScreenFromHarmoni();

    const newDataMajor: RecievedScreen[] = majorData.filter(
      (screen) =>
        !harmoniData.some((hScreen) => hScreen.screenId === screen.screenId)
    );

    for (const screen of newDataMajor) {
      const screenType = screen.screenType;
      await this.prisma.screens.create({
        data: {
          screenId: screen.screenId,
          theaterId: screen.theaterId,
          capacity: screen.capacity,
          screen_type: Screens_screen_type[screenType],
          price: screen.price,
          screen_no: screen.screen_number,
        },
      });
    }
    harmoniData = await getScreenFromHarmoni();
    return newDataMajor;
  }

  async deleteOutdatedScreens() {
    const majorData: Screen[] = await this.getScreenFromMajor();
    const harmoniData: Screen[] = await getScreenFromHarmoni();
    const deletedDataMajor: Screen[] = harmoniData.filter(
      (hScreen) =>
        !majorData.some((screen) => screen.screenId === hScreen.screenId)
    );

    for (const screen of deletedDataMajor) {
      await this.prisma.screens.delete({
        where: {
          screenId: screen.screenId,
        },
      });
    }
  }

  async editScreen() {
    const majorData: Screen[] = await this.getScreenFromMajor();
    const harmoniData: Screen[] = await getScreenFromHarmoni();

    for (const screen of majorData) {
      const harmoniScreen = harmoniData.find(
        (hScreen) => hScreen.screenId === screen.screenId
      );

      if (harmoniScreen) {
        const hasChanged =
          screen.theaterId !== harmoniScreen.theaterId ||
          screen.capacity !== harmoniScreen.capacity ||
          screen.screen_type !== harmoniScreen.screen_type ||
          screen.price !== harmoniScreen.price ||
          screen.screen_no !== harmoniScreen.screen_no;

        if (hasChanged) {
          this.prisma.screens.update({
            where: {
              screenId: screen.screenId,
            },
            data: {
              theaterId: screen.theaterId,
              capacity: screen.capacity,
              screen_type: Screens_screen_type[screen.screen_type],
              price: screen.price,
              screen_no: screen.screen_no,
            },
          });
        }
      }
      console.log("edit screenId: " + screen.screenId);
    }
  }

  //
  async getTheatersFromMajor() {
    const response = await Axios.get("/theater/getTheaters");
    return response.data;
  }

  async addNewTheaters() {
    const majorData: RecievedTheater[] = await this.getTheatersFromMajor();
    const harmoniData: Theater[] = await getTheaterFromHarmoni();
    const newDataMajor: RecievedTheater[] = majorData.filter(
      (theater) =>
        !harmoniData.some(
          (hTheater) => hTheater.theaterId === theater.theaterId
        )
    );

    for (const theater of newDataMajor) {
      await this.prisma.theaters.create({
        data: {
          theaterId: theater.theaterId,
          name: theater.name,
          address: theater.address,
          phone_num: theater.phoneNum,
          promptpay_num: theater.promptPayNum,
          latitude: theater.latitude,
          longitude: theater.longitude,
        },
      });
    }
  }

  async deleteOutdatedTheaters() {
    const majorData: Theater[] = await this.getTheatersFromMajor();
    const harmoniData: Theater[] = await getTheaterFromHarmoni();

    const deletedDataMajor: Theater[] = harmoniData.filter(
      (hTheater) =>
        !majorData.some((theater) => theater.theaterId === hTheater.theaterId)
    );

    for (const theater of deletedDataMajor) {
      await this.prisma.theaters.delete({
        where: {
          theaterId: theater.theaterId,
        },
      });
    }
  }
  async editTheater() {
    const majorData: Theater[] = await this.getTheatersFromMajor();
    const harmoniData: Theater[] = await getTheaterFromHarmoni();

    for (const theater of majorData) {
      const harmoniTheater = harmoniData.find(
        (hTheater) => hTheater.theaterId === theater.theaterId
      );

      if (harmoniTheater) {
        const hasChanged =
          theater.name !== harmoniTheater.name ||
          theater.address !== harmoniTheater.address ||
          theater.phone_num !== harmoniTheater.phone_num ||
          theater.promptpay_num !== harmoniTheater.promptpay_num ||
          theater.latitude !== harmoniTheater.latitude ||
          theater.longitude !== harmoniTheater.longitude;

        if (hasChanged) {
          this.prisma.theaters.update({
            where: {
              theaterId: theater.theaterId,
            },
            data: {
              name: theater.name,
              address: theater.address,
              phone_num: theater.phone_num,
              promptpay_num: theater.promptpay_num,
              latitude: theater.latitude,
              longitude: theater.longitude,
            },
          });
        }
      }
      console.log("edit theaterId: " + theater.theaterId);
    }
  }
  //
  async getShowFromMajor() {
    const response = await Axios.get("/show/getAllShows");
    //console.log(response.data);
    return response.data;
  }

  async addNewShows() {
    const majorData: RecievedShow[] = await this.getShowFromMajor();
    const harmoniData: Show[] = await getShowFromHarmoni();

    const newDataMajor: RecievedShow[] = majorData.filter(
      (show) => !harmoniData.some((hShow) => hShow.showId === show.showId)
    );

    for (const show of newDataMajor) {
      await this.prisma.shows.create({
        data: {
          showId: show.showId,
          screenId: show.screenId,
          filmId: show.filmId,
          date: show.date,
          start_time: show.startTime,
          end_time: show.endTime,
          price: show.price,
        },
      });
    }
  }

  async deleteOutdatedShows() {
    const majorData: Show[] = await this.getShowFromMajor();
    const harmoniData: Show[] = await getShowFromHarmoni();

    const deletedDataMajor: Show[] = harmoniData.filter(
      (hShow) => !majorData.some((show) => show.showId === hShow.showId)
    );

    for (const show of deletedDataMajor) {
      await this.prisma.shows.delete({
        where: {
          showId: show.showId,
        },
      });
    }
  }
  async editShow() {
    const majorData: Show[] = await this.getShowFromMajor();
    const harmoniData: Show[] = await getShowFromHarmoni();

    for (const show of majorData) {
      const harmoniShow = harmoniData.find(
        (hShow) => hShow.showId === show.showId
      );

      if (harmoniShow) {
        const hasChanged =
          show.screenId !== harmoniShow.screenId ||
          show.filmId !== harmoniShow.filmId ||
          show.date !== harmoniShow.date ||
          show.start_time !== harmoniShow.start_time ||
          show.end_time !== harmoniShow.end_time ||
          show.price !== harmoniShow.price;

        if (hasChanged) {
          this.prisma.shows.update({
            where: {
              showId: show.showId,
            },
            data: {
              screenId: show.screenId,
              filmId: show.filmId,
              date: show.date,
              start_time: show.start_time,
              end_time: show.end_time,
              price: show.price,
            },
          });
        }
      }
      console.log("edit showId: " + show.showId);
    }
  }
  ////////////////////////////////////
  async getSeatTypeFromMajor() {
    const response = await Axios.get("/seat/getAllSeatType");
    return response.data;
  }

  async addNewSeatTypes() {
    const majorData: RecievedSeatType[] = await this.getSeatTypeFromMajor();
    const harmoniData: SeatType[] = await getSeatTypeFromHarmoni();

    const newDataMajor: RecievedSeatType[] = majorData.filter(
      (seatType) =>
        !harmoniData.some(
          (hSeatType) => hSeatType.seatTypeId === seatType.seatTypeId
        )
    );

    for (const seatType of newDataMajor) {
      await this.prisma.seat_types.create({
        data: {
          seatTypeId: seatType.seatTypeId,
          type_name: seatType.typeName,
          description: seatType.description,
          price_modifier: seatType.price_modifier,
        },
      });
    }
  }

  async deleteOutdatedSeatTypes() {
    const majorData: SeatType[] = await this.getSeatTypeFromMajor();
    const harmoniData: SeatType[] = await getSeatTypeFromHarmoni();

    const deletedDataMajor: SeatType[] = harmoniData.filter(
      (hSeatType) =>
        !majorData.some(
          (seatType) => seatType.seatTypeId === hSeatType.seatTypeId
        )
    );

    for (const seatType of deletedDataMajor) {
      await this.prisma.seat_types.delete({
        where: {
          seatTypeId: seatType.seatTypeId,
        },
      });
    }
  }
  async editSeatType() {
    const majorData: SeatType[] = await this.getSeatTypeFromMajor();
    const harmoniData: SeatType[] = await getSeatTypeFromHarmoni();

    for (const seatType of majorData) {
      const harmoniSeatType = harmoniData.find(
        (hSeatType) => hSeatType.seatTypeId === seatType.seatTypeId
      );

      if (harmoniSeatType) {
        const hasChanged =
          seatType.type_name !== harmoniSeatType.type_name ||
          seatType.description !== harmoniSeatType.description ||
          seatType.price_modifier !== harmoniSeatType.price_modifier;

        if (hasChanged) {
          this.prisma.seat_types.update({
            where: {
              seatTypeId: seatType.seatTypeId,
            },
            data: {
              type_name: seatType.type_name,
              description: seatType.description,
              price_modifier: seatType.price_modifier,
            },
          });
        }
      }
      console.log("edit seatTypeId: " + seatType.seatTypeId);
    }
  }
  //
  async getSeatFromMajor() {
    const response = await Axios.get("/seat/getAllSeats");
    return response.data;
  }

  async addNewSeats() {
    const majorData: RecievedSeat[] = await this.getSeatFromMajor();
    const harmoniData: Seat[] = await getSeatFromHarmoni();

    const newDataMajor: RecievedSeat[] = majorData.filter(
      (seat) => !harmoniData.some((hSeat) => hSeat.seatId === seat.seatId)
    );

    for (const seat of newDataMajor) {
      await this.prisma.seats.create({
        data: {
          seatId: seat.seatId,
          screenId: seat.screenId,
          seatTypeId: seat.seatTypeId,
          seat_row: seat.seatRow,
          seat_no: seat.seatNo,
        },
      });
    }
  }

  async deleteOutdatedSeats() {
    const majorData: Seat[] = await this.getSeatFromMajor();
    const harmoniData: Seat[] = await getSeatFromHarmoni();

    const deletedDataMajor: Seat[] = harmoniData.filter(
      (hSeat) => !majorData.some((seat) => seat.seatId === hSeat.seatId)
    );

    for (const seat of deletedDataMajor) {
      await this.prisma.seats.delete({
        where: {
          seatId: seat.seatId,
        },
      });
    }
  }
  async editSeat() {
    const majorData: Seat[] = await this.getSeatFromMajor();
    const harmoniData: Seat[] = await getSeatFromHarmoni();

    for (const seat of majorData) {
      const harmoniSeat = harmoniData.find(
        (hSeat) => hSeat.seatId === seat.seatId
      );

      if (harmoniSeat) {
        const hasChanged =
          seat.screenId !== harmoniSeat.screenId ||
          seat.seatTypeId !== harmoniSeat.seatTypeId ||
          seat.seat_row !== harmoniSeat.seat_row ||
          seat.seat_no !== harmoniSeat.seat_no;

        if (hasChanged) {
          // await this.prisma.seats.update({4
          this.prisma.seats.update({
            where: {
              seatId: seat.seatId,
            },
            data: {
              screenId: seat.screenId,
              seatTypeId: seat.seatTypeId,
              seat_row: seat.seat_row,
              seat_no: seat.seat_no,
            },
          });
        }
      }
      console.log("edit seatId: " + seat.seatId);
    }
  }
  //
  async getPaymentFromMajor() {
    const response = await Axios.get("/payment/getAllPayments");
    return response.data;
  }

  async postReservationToMajor(reservation: any) {
    const response = await Axios.post(
      "/reservation/getReservationById",
      reservation
    );
    return response.data;
  }

  async getReserveSeatFromMajor(showId: number) {
    const response = await Axios.post("/reservation/getReserveSeatByShowId", {
      showId,
    });
    return response.data;
  }
}

export default new MajorAPIService();

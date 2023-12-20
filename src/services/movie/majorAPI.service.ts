import {
  Films_genre,
  PrismaClient,
  Screens_screen_type,
  Payments_payment_method,
  Payments_payment_status,
} from "@prisma/client";
import { MajorAxios as Axios } from "../../configs/MajorAxiosInstance";

import filmsService from "./films.service";
import { Film, RecievedFilm } from "../../interface/movie/film.interface";
import theatersService from "./theaters.service";
import { RecievedTheater, Theater } from "../../interface/movie/theater.interface";
import screensService from "./screens.service";
import { RecievedScreen, Screen } from "../../interface/movie/screen.interface";
import seatsService from "./seats.service";
import { RecievedSeatType, SeatType } from "../../interface/movie/seatType.interface";
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
    try {
      const response = await Axios.get("/film/getFilm");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  async addNewFilms() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }

  async deleteOutdatedFilms() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }
  //
  async getScreenFromMajor() {
    try {
      const response = await Axios.get("/screen/getAllScreens");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  async addNewScreens() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }

  async deleteOutdatedScreens() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }
  //
  async getTheatersFromMajor() {
    try {
      const response = await Axios.get("/theater/getTheaters");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  async addNewTheaters() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }

  async deleteOutdatedTheaters() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }
  //
  async getShowFromMajor() {
    try {
      const response = await Axios.get("/show/getAllShows");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  async addNewShows() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }

  async deleteOutdatedShows() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }
  ////////////////////////////////////
  async getSeatTypeFromMajor() {
    try {
      const response = await Axios.get("/seat/getAllSeatType");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  async addNewSeatTypes() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }

  async deleteOutdatedSeatTypes() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }
  //
  async getSeatFromMajor() {
    try {
      const response = await Axios.get("/seat/getAllSeats");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  async addNewSeats() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }

  async deleteOutdatedSeats() {
    try {
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
    } catch (e: any) {
      throw e;
    }
  }
  //
  async getPaymentFromMajor() {
    try {
      const response = await Axios.get("/payment/getAllPayments");
      return response.data;
    } catch (e: any) {
      throw e;
    }
  }

  // async addNewPayments(addQueue: Payment[]) {
  //   try {
  //     for (const payment of addQueue) {
  //       const payment_method = payment.paymentMethod;
  //       const payment_status = payment.paymentStatus;
  //       await this.prisma.payments.create({
  //         data: {
  //           paymentId: payment.paymentId,
  //           reservationId: payment.reservationId,
  //           payment_date: payment.paymentDate,
  //           payment_amount: payment.paymentAmount,
  //           payment_method: Payments_payment_method[payment_method],
  //           payment_status: Payments_payment_status[payment_status],
  //         },
  //       });
  //     }
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // }

  // async deleteOutdatedPayments(deleteQueue: Payment[]) {
  //   try {
  //     for (const payment of deleteQueue) {
  //       await this.prisma.payments.delete({
  //         where: {
  //           paymentId: payment.paymentId,
  //         },
  //       });
  //     }
  //   } catch (e: any) {
  //     console.log(e);
  //   }
  // }

  async postReservationToMajor(reservation: any) {
    try {
      const response = await Axios.post(
        "/reservation/getReservationById",
        reservation
      );
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
  }
}

export default new MajorAPIService();

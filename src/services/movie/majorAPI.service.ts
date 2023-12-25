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
      console.log("add filmId: " + film.filmId);
    }
  }

  async deleteOutdatedFilms() {
    const majorData: RecievedFilm[] = await this.getFilmsFromMajor();
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
      console.log("delete filmId: " + film.filmId);
    }
  }

  async editFilm() {
    const majorData: RecievedFilm[] = await this.getFilmsFromMajor();
    const harmoniData: Film[] = await getFilmFromHarmoni();

    const updatePromise = majorData.map(async (film) => {
      const harmoniFilm = harmoniData.find(
        (hFilm) => hFilm.filmId === film.filmId
      );

      if (harmoniFilm) {
        const hasChanged =
          film.name != harmoniFilm.name ||
          film.genre != harmoniFilm.genre ||
          film.language != harmoniFilm.language ||
          film.synopsis != harmoniFilm.synopsis ||
          film.releaseDate.toString() !=
            harmoniFilm.release_date.toISOString() ||
          film.duration != harmoniFilm.duration ||
          film.posterImg != harmoniFilm.poster_img ||
          film.rate != harmoniFilm.rate;

        if (hasChanged) {
          console.log("edit filmId: " + film.filmId);
          return this.prisma.films.update({
            where: {
              filmId: film.filmId,
            },
            data: {
              name: film.name,
              genre: Films_genre[film.genre],
              language: film.language,
              synopsis: film.synopsis,
              release_date: film.releaseDate,
              duration: film.duration,
              poster_img: film.posterImg,
              rate: film.rate,
            },
          });
        }
      }
    });
    await Promise.all(updatePromise);
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
      console.log("add screenId: " + screen.screenId);
    }
    harmoniData = await getScreenFromHarmoni();
    return newDataMajor;
  }

  async deleteOutdatedScreens() {
    const majorData: RecievedScreen[] = await this.getScreenFromMajor();
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
      console.log("delete screenId: " + screen.screenId);
    }
  }

  async editScreen() {
    const majorData: RecievedScreen[] = await this.getScreenFromMajor();
    const harmoniData: Screen[] = await getScreenFromHarmoni();

    const updatePromise = majorData.map(async (screen) => {
      const harmoniScreen = harmoniData.find(
        (hScreen) => hScreen.screenId === screen.screenId
      );

      if (harmoniScreen) {
        const hasChanged =
          screen.theaterId != harmoniScreen.theaterId ||
          screen.capacity != harmoniScreen.capacity ||
          screen.screenType != harmoniScreen.screen_type ||
          screen.price != harmoniScreen.price ||
          screen.screen_number != harmoniScreen.screen_no;

        if (hasChanged) {
          console.log("edit screenId: " + screen.screenId);
          return this.prisma.screens.update({
            where: {
              screenId: screen.screenId,
            },
            data: {
              theaterId: screen.theaterId,
              capacity: screen.capacity,
              screen_type: Screens_screen_type[screen.screenType],
              price: screen.price,
              screen_no: screen.screen_number,
            },
          });
        }
      }
    });
    await Promise.all(updatePromise);
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
      console.log("add theaterId: " + theater.theaterId);
    }
  }

  async deleteOutdatedTheaters() {
    const majorData: RecievedTheater[] = await this.getTheatersFromMajor();
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
      console.log("delete theaterId: " + theater.theaterId);
    }
  }
  async editTheater() {
    const majorData: RecievedTheater[] = await this.getTheatersFromMajor();
    const harmoniData: Theater[] = await getTheaterFromHarmoni();

    const updatePromise = majorData.map(async (theater) => {
      const harmoniTheater = harmoniData.find(
        (hTheater) => hTheater.theaterId === theater.theaterId
      );

      if (harmoniTheater) {
        const hasChanged =
          theater.name != harmoniTheater.name ||
          theater.address != harmoniTheater.address ||
          theater.phoneNum != harmoniTheater.phone_num ||
          theater.promptPayNum != harmoniTheater.promptpay_num ||
          theater.latitude != harmoniTheater.latitude ||
          theater.longitude != harmoniTheater.longitude;

        if (hasChanged) {

          console.log("edit theaterId: " + theater.theaterId);
          return this.prisma.theaters.update({
            where: {
              theaterId: theater.theaterId,
            },
            data: {
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
    });
    await Promise.all(updatePromise);
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
      console.log("add showId: " + show.showId);
    }
  }

  async deleteOutdatedShows() {
    const majorData: RecievedShow[] = await this.getShowFromMajor();
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
      console.log("delete showId: " + show.showId);
    }
  }
  async editShow() {
    const majorData: RecievedShow[] = await this.getShowFromMajor();
    const harmoniData: Show[] = await getShowFromHarmoni();

    const updatePromise = majorData.map((show) => {
      const harmoniShow = harmoniData.find(
        (hShow) => hShow.showId === show.showId
      );

      if (harmoniShow) {
        const harmoniDate: string = harmoniShow.date.toISOString();
        const harmoniStartTime: string = harmoniShow.start_time.toISOString();
        const harmoniEndTime: string = harmoniShow.end_time.toISOString();
        const majorDate: string = show.date.toString();
        const majorStartTime: string = show.startTime.toString();
        const majorEndTime: string = show.endTime.toString();
        const hasChanged =
          show.screenId != harmoniShow.screenId ||
          show.filmId != harmoniShow.filmId ||
          majorDate != harmoniDate ||
          majorStartTime != harmoniStartTime ||
          majorEndTime != harmoniEndTime ||
          show.price != harmoniShow.price;

        if (hasChanged) {
          console.log("edit showId: " + show.showId);

          return this.prisma.shows.update({
            where: {
              showId: harmoniShow.showId,
            },
            data: {
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
    });
    await Promise.all(updatePromise);
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
      console.log("add seatTypeId: " + seatType.seatTypeId);
    }
  }

  async deleteOutdatedSeatTypes() {
    const majorData: RecievedSeatType[] = await this.getSeatTypeFromMajor();
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
      console.log("delete seatTypeId: " + seatType.seatTypeId);
    }
  }
  async editSeatType() {
    const majorData: RecievedSeatType[] = await this.getSeatTypeFromMajor();
    const harmoniData: SeatType[] = await getSeatTypeFromHarmoni();

    const updatePromise = majorData.map(async (seatType) => {
      const harmoniSeatType = harmoniData.find(
        (hSeatType) => hSeatType.seatTypeId === seatType.seatTypeId
      );

      if (harmoniSeatType) {
        const hasChanged =
          seatType.typeName != harmoniSeatType.type_name ||
          seatType.description != harmoniSeatType.description ||
          seatType.price_modifier != harmoniSeatType.price_modifier;

        if (hasChanged) {
          return this.prisma.seat_types.update({
            where: {
              seatTypeId: seatType.seatTypeId,
            },
            data: {
              type_name: seatType.typeName,
              description: seatType.description,
              price_modifier: seatType.price_modifier,
            },
          });
        }
      }
    });
    await Promise.all(updatePromise);
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
      console.log("add seatId: " + seat.seatId);
    }
  }

  async deleteOutdatedSeats() {
    const majorData: RecievedSeat[] = await this.getSeatFromMajor();
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
      console.log("delete seatId: " + seat.seatId);
    }
  }
  async editSeat() {
    const majorData: RecievedSeat[] = await this.getSeatFromMajor();
    const harmoniData: Seat[] = await getSeatFromHarmoni();

    const updatePromise = majorData.map(async (seat) => {
      const harmoniSeat = harmoniData.find(
        (hSeat) => hSeat.seatId === seat.seatId
      );

      if (harmoniSeat) {
        const hasChanged =
          seat.screenId != harmoniSeat.screenId ||
          seat.seatTypeId != harmoniSeat.seatTypeId ||
          seat.seatRow != harmoniSeat.seat_row ||
          seat.seatNo != harmoniSeat.seat_no;

        if (hasChanged) {
          console.log("edit seatId: " + seat.seatId);
          // await this.prisma.seats.update({4
          return this.prisma.seats.update({
            where: {
              seatId: seat.seatId,
            },
            data: {
              screenId: seat.screenId,
              seatTypeId: seat.seatTypeId,
              seat_row: seat.seatRow,
              seat_no: seat.seatNo,
            },
          });
        }
      }
    });
    await Promise.all(updatePromise);
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

import { Genre, PrismaClient } from "@prisma/client";
import { Axios } from "../../configs/MajorAxiosInstance";
import { Film } from "../../interface/movie/film.interface";
import { Theater } from "../../interface/movie/theater.interface";
import theatersService from "./theaters.service";

class MajorAPIService {
  prisma = new PrismaClient();
//
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
//  
    async getScreenFromMajor() {
        try {
        const response = await Axios.get("/screen/getScreens");
        return response.data;
        } catch (e: any) {
        console.log(e);
        }
    }

//     async addNewScreens(addQueue: Screen[]) {
//         try {
//         for (const screen of addQueue) {
//             await this.prisma.screens.create({
//             data: {
//                 screenId: screen.screenId,
//                 screen_type: screen.screen_type,
//                 theaterId: screen.theaterId,
//             },
//             });
//         }
//         } catch (e: any) {
//         console.log(e);
//         }
//     }

//     async deleteOutdatedScreens(deleteQueue: Screen[]) {
//         try {
//         for (const screen of deleteQueue) {
//             await this.prisma.screens.delete({
//             where: {
//                 screenId: screen.screenId,
//             },
//             });
//         }
//         } catch (e: any) {
//         console.log(e);
//         }
//     }
// //
//   async getTheatersFromMajor() {
//     try {
//       const response = await Axios.get("/theater/getTheaters");
//       return response.data;
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async addNewTheaters(addQueue: Theater[]) {
//     try {
//       for (const theater of addQueue) {
//         await this.prisma.theaters.create({
//           data: {
//             theaterId: theater.theaterId,
//             name: theater.name,
//             address: theater.address,
//             phone_num: theater.phone_num,
//             promptpay_num: theater.promptpay_num,
//             latitude: theater.latitude,
//             longitude: theater.longitude,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async deleteOutdatedTheaters(deleteQueue: Theater[]) {
//     try {
//       for (const theater of deleteQueue) {
//         await this.prisma.theaters.delete({
//           where: {
//             theaterId: theater.theaterId,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }
// //
//     async getShowFromMajor() {
//         try {
//         const response = await Axios.get("/show/getShows");
//         return response.data;
//         } catch (e: any) {
//         console.log(e);
//         }
//     }

//     async addNewShows(addQueue: Show[]) {
//         try {
//         for (const show of addQueue) {
//             await this.prisma.shows.create({
//             data: {
//                 showId: show.showId,
//                 date: show.date,
//                 time: show.time,
//                 filmId: show.filmId,
//                 screenId: show.screenId,
//             },
//             });
//         }
//         } catch (e: any) {
//         console.log(e);
//         }
//     }

//     async deleteOutdatedShows(deleteQueue: Show[]) {
//         try {
//         for (const show of deleteQueue) {
//             await this.prisma.shows.delete({
//             where: {
//                 showId: show.showId,
//             },
//             });
//         }
//         } catch (e: any) {
//         console.log(e);
//         }
//     }
// //
//   async getSeatTypeFromMajor() {
//     try {
//       const response = await Axios.get("/seatType/getSeatTypes");
//       return response.data;
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async addNewSeatTypes(addQueue: SeatType[]) {
//     try {
//       for (const seatType of addQueue) {
//         await this.prisma.seatTypes.create({
//           data: {
//             seatTypeId: seatType.seatTypeId,
//             seat_type: seatType.seat_type,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async deleteOutdatedSeatTypes(deleteQueue: SeatType[]) {
//     try {
//       for (const seatType of deleteQueue) {
//         await this.prisma.seatTypes.delete({
//           where: {
//             seatTypeId: seatType.seatTypeId,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }
// // 
//   async getSeatFromMajor() {
//     try {
//       const response = await Axios.get("/seat/getSeats");
//       return response.data;
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async addNewSeats(addQueue: Seat[]) {
//     try {
//       for (const seat of addQueue) {
//         await this.prisma.seats.create({
//           data: {
//             seatId: seat.seatId,
//             seat_type: seat.seat_type,
//             screenId: seat.screenId,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async deleteOutdatedSeats(deleteQueue: Seat[]) {
//     try {
//       for (const seat of deleteQueue) {
//         await this.prisma.seats.delete({
//           where: {
//             seatId: seat.seatId,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }
// //
//   async getPaymentFromMajor() {
//     try {
//       const response = await Axios.get("/payment/getPayments");
//       return response.data;
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async addNewPayments(addQueue: Payment[]) {
//     try {
//       for (const payment of addQueue) {
//         await this.prisma.payments.create({
//           data: {
//             paymentId: payment.paymentId,
//             payment_type: payment.payment_type,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }

//   async deleteOutdatedPayments(deleteQueue: Payment[]) {
//     try {
//       for (const payment of deleteQueue) {
//         await this.prisma.payments.delete({
//           where: {
//             paymentId: payment.paymentId,
//           },
//         });
//       }
//     } catch (e: any) {
//       console.log(e);
//     }
//   }
  
}



export default new MajorAPIService();

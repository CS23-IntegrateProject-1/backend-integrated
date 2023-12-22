import { MajorAxios as Axios } from "../../configs/MajorAxiosInstance";
import jwt from "jsonwebtoken";

class bookSeatService {
	async getMinorAvilableSeats(showId: number, seatId: number) {
		return await Axios.post("/api/reservation/check", {
			showId: showId,
			seatId: seatId,
		});
	}

	async createMinorReservation(seatIds: number[], showId: number) {
		const minorReservationIds: number[] = [];
		for (const seatId of seatIds) {
			const response = await Axios.post("/api/reservation/create", {
				showId: showId,
				seatId: seatId,
			});
			minorReservationIds.push(response.data.reservationId);
		}
		return minorReservationIds;
	}

	createCookie(reservationIds: number[], userId: number) {
		const secretKey = process.env.JWT_SECRET as string;
		return jwt.sign({ reservationIds, userId }, secretKey, {
			expiresIn: 5 * 60,
		});
	}
}

export default new bookSeatService();

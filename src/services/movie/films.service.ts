import { PrismaClient } from "@prisma/client";

class filmService{
	getShowingFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany();
		return data;
	}

	// getFilmsById(id: number): Promise<any[]> {
	// 	const prisma = new PrismaClient();
	// 	const data = prisma.films.findUnique({
	// 		where: {filmId: id}
	// 	});
	// 	return data;
	// }

	getShowingImaxFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			distinct: ["filmId"],
			where: {
				Shows: {
					some: {
						screen: {
							screen_type: "IMAX"
						}
					}
				}
			}
		});
		return data;
	}

	getShowing3DFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			distinct: ["filmId"],
			where: {
				Shows: {
					some: {
						screen: {
							screen_type: "X3D"
						}
					}
				}
			}
		});
		return data;
	}

	getShowing4DFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			distinct: ["filmId"],
			where: {
				Shows: {
					some: {
						screen: {
							screen_type: "X4D"
						}
					}
				}
			}
		});
		return data;
	}

	getShowingKidFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			distinct: ["filmId"],
			where: {
				Shows: {
					some: {
						screen: {
							screen_type: "Kids"
						}
					}
				}
			}
		});
		return data;
	}

	getShowingStandardFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			distinct: ["filmId"],
			where: {
				Shows: {
					some: {
						screen: {
							screen_type: "Standard"
						}
					}
				}
			}
		});
		return data;
	}

	// getNowShowing(): Promise<any[]> {
	// 	const prisma = new PrismaClient();
	// 	const data = prisma.films.findMany({
	// 		where: {
	// 				release_date: {
	// 					lte: new Date()
	// 				}
	// 		}
	// 	});
	// 	return data;
	// }
}

export default new filmService();
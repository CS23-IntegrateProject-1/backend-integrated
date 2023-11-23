import { PrismaClient } from "@prisma/client";

class filmService{
	getAllFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany();
		return data;
	}

	getFilmsById(id: number): Promise<any> {
		const prisma = new PrismaClient();
		const data = prisma.films.findUnique({
			where: {filmId: id}
		});
		return data;
	}

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

	getNowShowingFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			where: {
				release_date: {
					lte: new Date(),
				},
			},
		});
		return data;
	}

	getUpcomingFilms(): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			where: {
				release_date: {
					gt: new Date(),
				},
			},
		});
		return data;
	}

	// getFilmsByTheaterId(id: number, date: string): Promise<any[]> {
	// 	const prisma = new PrismaClient();
	// 	const data = prisma.films.findMany({
	// 		//distinct: ["filmId"],
	// 		where: {
	// 			Shows: {
	// 				every: {
	// 					date: new Date(date)
	// 				}
	// 			},
	// 		},
	// 	});
	// 	return data;
	// }

	getFilmsByTheaterId(id: number, date: string): Promise<any[]> {
		const prisma = new PrismaClient();
		const data = prisma.films.findMany({
			//distinct: ["filmId"],
			where: {
				Shows: {
					some: {
						screen: {
							theaterId: id
						}
					},
					every: {
						date: new Date(date)
					}
				}
			}
		});
		return data;
	}

	
}

export default new filmService();
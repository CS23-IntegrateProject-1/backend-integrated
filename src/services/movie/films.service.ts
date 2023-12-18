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

	async getFilmsByTheaterId(id: number, date: number, month:number, year:number): Promise<any[]> {
		const prisma = new PrismaClient();
		const dateString = date<10 ? "0"+date : date.toString()
		const monthString = month<10 ? "0"+month : month.toString()
		const queryDate = new Date(year+"-"+monthString+"-"+dateString).toISOString()
		console.log(queryDate);
		
		
		const shows = await prisma.films.findMany({
			where: {
				Shows: {
					some: {
						screen: {
							theaterId: id
						},
						date: queryDate
					}
				}
			},
			include: {
				Shows: {
					where: {
						screen: {
							theaterId: id,
						},
						date: queryDate,
					},
					include: {
						screen: true,
					}
				},
			}
		});

		return shows;
	}
// date+"-"+month+"-"+year
	
}

export default new filmService();
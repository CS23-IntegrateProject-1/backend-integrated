import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmsService from "../services/movie/films.service";

const prisma = new PrismaClient();

export const getfeature10 = async (req: Request, res: Response) => {
    
};

export const getAllFilms = async (req: Request, res: Response) => {
    try {
        const allFilms = await prisma.films.findMany();
        res.json(allFilms);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
};

// export const getFilmsById = async (req: Request, res: Response) => {
//     try {
//         const id = Number(req.params.id);
//         const film = await prisma.films.findUnique({
//             where: {filmId: id}
//         });
//         res.json(film);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

// export const getImaxFilms = async (req: Request, res: Response) => {
//     try {
//         const imaxFilms = await prisma.films.findMany({
//             distinct: ["filmId"],
//             where: {
//                 Shows: {
//                     some: {
//                         screen: {
//                             screen_type: "IMAX"
//                         }
//                     }
//                 }
//             }
//         });
//         res.json(imaxFilms);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

// export const get3DFilms = async (req: Request, res: Response) => {
//     try {
//         const imaxFilms = await prisma.films.findMany({
//             distinct: ["filmId"],
//             where: {
//                 Shows: {
//                     some: {
//                         screen: {
//                             screen_type: "X3D"
//                         }
//                     }
//                 }
//             }
//         });
//         res.json(imaxFilms);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

// export const get4DFilms = async (req: Request, res: Response) => {
//     try {
//         const imaxFilms = await prisma.films.findMany({
//             distinct: ["filmId"],
//             where: {
//                 Shows: {
//                     some: {
//                         screen: {
//                             screen_type: "X4D"
//                         }
//                     }
//                 }
//             }
//         });
//         res.json(imaxFilms);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

// export const getKidFilms = async (req: Request, res: Response) => {
//     try {
//         const imaxFilms = await prisma.films.findMany({
//             distinct: ["filmId"],
//             where: {
//                 Shows: {
//                     some: {
//                         screen: {
//                             screen_type: "Kids"
//                         }
//                     }
//                 }
//             }
//         });
//         res.json(imaxFilms);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

// export const getStandardFilms = async (req: Request, res: Response) => {
//     try {
//         const imaxFilms = await prisma.films.findMany({
//             distinct: ["filmId"],
//             where: {
//                 Shows: {
//                     some: {
//                         screen: {
//                             screen_type: "Standard"
//                         }
//                     }
//                 }
//             }
//         });
//         res.json(imaxFilms);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

export const getShowingFilms = async (req: Request, res: Response) => {
        const params = req.query;
        let data: any[];
        if (params.type) {
            if (params.type === "IMAX") {
                data = await filmsService.getShowingImaxFilms();
            } else if (params.type === "Standard") {
                data = await filmsService.getShowingStandardFilms();
            } else if (params.type === "X3D") {
                data = await filmsService.getShowing3DFilms();
            } else if (params.type === "X4D") {
                data = await filmsService.getShowing4DFilms();
            }  else {
                data = await filmsService.getShowingKidFilms();
            }
        } else {
            data = await filmsService.getShowingFilms();
        }
        res.status(200).send(data);
    }

// export const getFilmsById = async (req: Request, res: Response) => {
//     try {
//         const id = Number(req.params.id);
//         const film = await prisma.films.findUnique({
//             where: {filmId: id}
//         });
//         res.json(film);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// }

export const getFilmsById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    //console.log('idParam:', idParam);

    // Check if idParam is a valid number
    const filmId = parseInt(idParam, 10);

    //console.log('filmId:', filmId);

    if (isNaN(filmId)) {
      return res.status(400).json({ error: "Invalid film ID" });
    }

    const film = await prisma.films.findUnique({
      where: {
        filmId: filmId,
      },
    });

    console.log('Film:', film);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    // Handle the retrieved film data
    res.status(200).json({ film });
  } catch (error) {
    console.error("Error fetching film:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNowShowingFilms = async (req: Request, res: Response) => {
    try {
        const nowShowingFilms = await prisma.films.findMany({
            where: {
                release_date: {
                    lte: new Date()
                }
            }
        });
        if (nowShowingFilms.length === 0) {
            res.status(404).json({error: "No films are currently showing"});
        }
        console.log("first")
        res.json(nowShowingFilms);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
}

export const getUpcomingFilms = async (req: Request, res: Response) => {
  try {
    const incommingFilm = await prisma.films.findMany({
      where: {
        release_date: {
          gt: new Date()
        }
      }
    });
    res.status(200).json(incommingFilm);
  } catch (err) {
      const error = err as Error;
      res.status(500).json({ error: error.message });
    }
  };


// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getShowsByFilmsId = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        // const currentDate = new Date().toISOString().split('T')[0];
        const shows = await prisma.shows.findMany({
            where: {
                filmId: id,
                // date: {
                //     gte: currentDate,
                // },
                // date: {
                //     gte: '2023-11-15', 
                // },
                
            },
            include: {
                screen: {
                    include: {
                        theater: true
                    }
                }
            }
        });
        res.json(shows);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
    
};

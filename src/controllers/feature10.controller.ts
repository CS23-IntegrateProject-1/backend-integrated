import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmsService from "../services/movie/films.service";

const prisma = new PrismaClient();

export const getfeature10 = async (req: Request, res: Response) => {
    
};

// export const getAllFilms = async (req: Request, res: Response) => {
//     try {
//         const allFilms = await prisma.films.findMany();
//         res.json(allFilms);

//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
// };

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
            } else {
                data = await filmsService.getShowingKidFilms();
            }
        } else {
            data = await filmsService.getShowingFilms();
        }
        res.status(200).send(data);
    }

export const getFilmsById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const film = await prisma.films.findUnique({
            where: {filmId: id}
        });
        res.json(film);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
}

export const getNowShowingFilms = async (req: Request, res: Response) => {
    try {
        const nowShowingFilms = await prisma.films.findMany({
            where: {
                release_date: {
                    lte: new Date()
                }
            }
        });
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
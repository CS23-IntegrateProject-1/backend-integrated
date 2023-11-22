import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmsService from "../services/movie/films.service";

const prisma = new PrismaClient();

export const getfeature10 = async (req: Request, res: Response) => {};

export const getAllFilms = async (req: Request, res: Response) => {
    try {
        const allFilms = await prisma.films.findMany();
        res.json(allFilms);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

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
};

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

        console.log("Film:", film);

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
                    lte: new Date(),
                },
            },
        });
        if (nowShowingFilms.length === 0) {
            res.status(404).json({ error: "No films are currently showing" });
        }
        console.log("first");
        res.json(nowShowingFilms);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

export const getUpcomingFilms = async (req: Request, res: Response) => {
    try {
        const incommingFilm = await prisma.films.findMany({
            where: {
                release_date: {
                    gt: new Date(),
                },
            },
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
        // const id = Number(req.params.id);
        const {date, id} = req.params
        // const currentDate = new Date().toISOString().split('T')[0];
        const shows = await prisma.shows.findMany({
            where: {
                filmId: parseInt(id),
                date: new Date(date),
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
                },
                film: true
            },
        });
        res.json(shows);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

//make it distinct????????????????????????????????????????????????
export const getSeatsTypeByScreenId = async (req: Request, res: Response) => {
    try {
        // const id = Number(req.params.id);
        const seat_types = await prisma.seat_types.findMany({ 
        });
        res.json(seat_types);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
    
}


export const getFilmsInfoPage3 = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const films = await prisma.films.findMany({
            where: {
                filmId: id,
            },
            
                
            
        });
        res.json(films);

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
    
}





//page4
//
//
//
//

// export const getShowsByTheaterId = async (req: Request, res: Response) => {
//     try {
//         const id = Number(req.params.id);
        
//         const films = await prisma.shows.findMany({
//             where: {
//                 screen: {
//                     theaterId: id,
//                 },
               
//             },
//             include: {
//                 film: true,
//             },
//         });
//         res.json(films);
//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({error: error.message});
//     }
    
// }

export const getShowsByTheaterId = async (req: Request, res: Response) => {
    try {
        // const {date,id} = req.params
        const id = Number(req.params.id);
        const date = req.params.date;
        
        const films = await prisma.shows.findMany({
            where: {
                screen: {
                    // theaterId: parseInt(id),
                    theaterId: id,
                },
                date: new Date(date),
                // date: date,
            },
            include: {
                screen: {
                    include: {
                        theater: true
                    }
                },
                film: true
            },
        });
        console.log(id);
        console.log(date);
        res.json(films);
    } catch (err) {
        console.error(err);
        const error = err as Error;
        res.status(500).json({error: error.message});
    }   
}

// export const getShowsByTheaterId = async (req: Request, res: Response) => {
//     try {
        
//         const {date, id} = req.params
        
//         const shows = await prisma.shows.findMany({
//             where: {
//                 filmId: parseInt(id),
//                 date: new Date(date),
               
//             },
//             include: {
//                 screen: {
//                     include: {
//                         theater: true
//                     }
//                 },
//                 film: true
//             },
//         });
//         console.log(id);
//         console.log(date);
//         res.json(shows);
//     } catch (err) {
//         const error = err as Error;
//         res.status(500).json({ error: error.message });
//     }
// };





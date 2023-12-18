import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import filmService from "../services/movie/films.service";
import  theaterService  from "../services/movie/theaters.service";
import showService from "../services/movie/shows.service";
import seatsService from "../services/movie/seats.service";

const prisma = new PrismaClient();

export const getfeature10 = async (req: Request, res: Response) => {};

export const getAllFilms = async (req: Request, res: Response) => {
    const data = await filmService.getAllFilms();
    res.json(data);
};

export const getShowingFilms = async (req: Request, res: Response) => {
    const params = req.query;
    let data: any[];
    if (params.type) {
        if (params.type === "IMAX") {
            data = await filmService.getShowingImaxFilms();
        } else if (params.type === "Standard") {
            data = await filmService.getShowingStandardFilms();
        } else if (params.type === "X3D") {
            data = await filmService.getShowing3DFilms();
        } else if (params.type === "X4D") {
            data = await filmService.getShowing4DFilms();
        } else {
            data = await filmService.getShowingKidFilms();
        }
    } else {
        data = await filmService.getAllFilms();
    }
    res.status(200).send(data);
};

export const getFilmsById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await filmService.getFilmsById(id);
    res.json(data);
};

export const getNowShowingFilms = async (req: Request, res: Response) => {
    const data = await filmService.getNowShowingFilms();
        if (data.length === 0) {
            res.status(404).json({ error: "No films are currently showing" });
        }
        res.json(data);
};

export const getUpcomingFilms = async (req: Request, res: Response) => {
    const data = await filmService.getUpcomingFilms();
    if (data.length === 0) {
        res.status(404).json({ error: "No upcoming films" });
    }
    res.json(data);
};



export const getShowsByFilmId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const date = req.params.date;

    const data = await showService.getShowsByFilmId(id, date);
    res.json(data);
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

export const getSeatByScreenId = async (req: Request, res: Response) => {
    const id = req.body.id;
    const data = await seatsService.getSeatByScreenId(id);
    res.json(data);
}

//page4
//

export const getShowsByTheaterId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const date = req.params.date;

    const data = await showService.getShowsByTheaterId(id, date);
    res.json(data);
}
//
export const getFilmsByTheaterId = async (req: Request, res: Response) => {
    const id = req.body.id;
    const date = req.body.date;
    const year = req.body.year;
    const month = req.body.month;

    const data = await filmService.getFilmsByTheaterId(id, date,month,year);
    res.json(data);
}  
//
export const getTheaterById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await theaterService.getTheaterById(id);
    res.status(200).json(data);
}

//test
export const getTestTest = async (req: Request, res: Response) => {
    try {
        const data = await prisma.shows.findMany({
            where: {
                showId: 1,
            },
            include: {
                screen:{
                    include:{
                        theater:true
                    }
                },
                film:true
            }    
        });
        res.json(data); 

    } catch (err) {
        const error = err as Error;
        res.status(500).json({error: error.message});
    }
}    






export interface Show{
    showId: number;
    screenId: number;
    filmId: number;
    date: Date;
    start_time: Date;
    end_time: Date;
    price: number;    
}

export interface RecievedShow {
    showId: number;
    screenId: number;
    filmId: number;
    date: Date;
    startTime: Date;
    endTime: Date;
    price: number;
    }
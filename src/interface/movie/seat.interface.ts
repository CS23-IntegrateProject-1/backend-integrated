export interface Seat{
    seatId: number;
    screenId: number;
    seatTypeId: number;
    seat_row: number;
    seat_no: number;   
}

export interface RecievedSeat {
    seatId: number;
    screenId: number;
    seatTypeId: number;
    seatRow: number;
    seatNo: number;
}
export enum screenType{
    IMAX,
    X3D,
    X4D,
    Standard,
    Kids
}

export interface Screen{
    screenId: number;
    theaterId: number;
    capacity: number;
    screenType: screenType;
    screenNumber: number;
    price: number;
}
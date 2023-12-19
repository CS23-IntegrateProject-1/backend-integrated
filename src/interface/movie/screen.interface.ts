export enum screenType{
    IMAX,
    X3D,
    X4D,
    Standard,
    Kids
}

export interface screen{
    screenId: number;
    theaterId: number;
    capacity: number;
    screenType: screenType;
    screenNumber: number;
    price: number;
    theater: string;
    deletedAt: Date;
}
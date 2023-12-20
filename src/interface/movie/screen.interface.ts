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
    scree_type: screenType;
    price: number;
    screen_no: number;
}

export interface RecievedScreen {
  screenId: number;
  theaterId: number;
  capacity: number;
  screenType: screenType;
  price: number;
  screen_number: number;
}
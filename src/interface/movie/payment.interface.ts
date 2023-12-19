export enum moviePayment{
    Cash,
    Promptpay
}

export enum paymentStatus{
    Pending,
    Success,
    Cancled
}

export interface payment{
    paymentId: number;
    reservationId: number;
    paymentDate: Date;
    paymentAmount: number;
    paymentMethod: moviePayment;
    paymentStatus: paymentStatus;
}
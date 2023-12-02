enum isApprove {
    Rejected = "Rejected",
    In_progress = "In_progress",
    Completed = "Completed"
}

export interface voucherinfo{

    voucher_name: string;
    voucher_image: string;
    start_date: Date;
    end_date: Date;
    description: string;
    point_use: number;
    venueId: number;
    isApprove: isApprove;
}
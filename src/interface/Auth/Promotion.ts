enum isApprove {
    Rejected = "Rejected",
    In_progress = "In_progress",
    Completed = "Completed"
}

export interface Promotioninfo{
    name: string;
    description: string;
    image_url: string;
    start_date: Date;
    end_date: Date;
    discount_price: number;
    isApprove: isApprove;
    venueId: number;
    menuId: number;
}
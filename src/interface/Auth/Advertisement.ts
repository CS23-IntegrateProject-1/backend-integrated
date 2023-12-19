import { Ad_business_customer_type, Ad_business_target_group } from "@prisma/client";

enum isApprove {
    Rejected = "Rejected",
    In_progress = "In_progress",
    Completed = "Completed"
}

export interface adinfo {
    name: string;
    description: string;    
    image_url: string;
    start_date: Date;
    end_date: Date;
    cost: number;
    isApprove: isApprove;
    customer_type: Ad_business_customer_type;
    target_group: Ad_business_target_group;
    businessId: number;
    
}
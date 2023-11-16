import { PrismaClient } from "@prisma/client";
import exp from "constants";
import { Response, Request } from "express";

const feature7Client = new PrismaClient();

export const getfeature7 = async (req: Request, res: Response) => {
};
export const getMenus = async (req: Request, res: Response) => {
    // try {
        
    //     const allMenus = await feature7Client.menu.findMany(

    //     );
    //     res.status(200).json(allMenus);
    // }
    // catch (e) {
    //     console.log(e);
    // }
}
export const getMenuById = async (req: Request, res: Response) => {
};
export const getVenueById = async (req: Request, res: Response) => {
};
export const getCustomerById = async (req: Request, res: Response) => {
};
export const addProductToOrderDetails = async (req: Request, res: Response) => {
}
export const createNewOrder = async (req: Request, res: Response) => {
}
export const createOrderFromOrderDetails = async (req: Request, res: Response) => {
}
export const menuOrderCount = async (req: Request, res: Response) => {
}
export const getOrdersByCustomerIdandDate = async (req: Request, res: Response) => {
}
export const getReceipt = async (req: Request, res: Response) => {
}

// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };
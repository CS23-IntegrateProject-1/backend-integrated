import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature1Client = new PrismaClient();

export const getfeature1 = async (req: Request, res: Response) => {	
};

export const accountHandler = async (req: Request, res: Response) => {
};

export const notificationHandler = async (req: Request, res: Response) => {
};

export const privacyHandler = async (req: Request, res: Response) => {
};

export const termOfServiceHandler = async (req: Request, res: Response) => {
};

export const helpHandler = async (req: Request, res: Response) => {
};

export const aboutHandler = async (req: Request, res: Response) => {
};



// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

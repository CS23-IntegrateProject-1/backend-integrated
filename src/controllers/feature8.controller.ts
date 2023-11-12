import { PrismaClient } from "@prisma/client";
import exp from "constants";
import { Response, Request } from "express";

const feature8Client = new PrismaClient();

export const getfeature8 = async (req: Request, res: Response) => {
    res.status(200).json({message: 'This is Feature8'});
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const allUsers = await feature8Client.user.findMany();
        res.status(200).json(allUsers);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
        // res.status(500).json({ error: 'Failed to retrieve data' });
    }
};export const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
  
    try {
      const user = await feature8Client.user.findUnique({
        where: { userId },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

export const getAllAdvertisements = async (req: Request, res: Response) => {
    try {
        const tables = await feature8Client.ad_business.findMany();
        return res.json(tables);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}

export const getAdvertisementById = async (req: Request, res: Response) => {
    const advertisementId = parseInt(req.params.advertisementId, 10);
  
    try {
      const advertisement = await feature8Client.ad_business.findUnique({
        where: { advertisementId },
      });
  
      if (!advertisement) {
        return res.status(404).json({ error: 'Advertisement not found' });
      }
  
      res.status(200).json(advertisement);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve advertisement' });
    }
  }

  export const getAllNotification = async (req: Request, res: Response) => {
    try {
        const tables = await feature8Client.notification.findMany();
        return res.json(tables);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
  }

  export const getAllTransaction_detail = async (req: Request, res: Response) => {
    try {
        const tables = await feature8Client.transaction_detail.findMany();
        return res.json(tables);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
  }

  export const getAllTransaction = async (req: Request, res: Response) => {
    try {
        const tables = await feature8Client.transaction.findMany();
        return res.json(tables);
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
  }

  export const getAllTransaction_detailById = async (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId, 10);
  
    try {
      const transaction_detail = await feature8Client.transaction_detail.findUnique({
        where: { transactionId },
      });
  
      if (!transaction_detail) {
        return res.status(404).json({ error: 'Transaction_detail not found' });
      }
  
      res.status(200).json(transaction_detail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve transaction_detail' });
    }
  }

export const getAllTransactionById = async (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId, 10);
  
    try {
      const transaction = await feature8Client.transaction.findUnique({
        where: { transactionId },
      });
  
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve transaction' });
    }
  }





// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };
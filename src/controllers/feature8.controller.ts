import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature8Client = new PrismaClient();

export const getfeature8 = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'This is Feature8' });
};

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const allUsers = await feature8Client.user.findMany();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
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
};

export const getAllAdvertisements = async (req: Request, res: Response) => {
    try {
        const advertisements = await feature8Client.ad_business.findMany();
        res.json(advertisements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve advertisements' });
    }
};

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
};

export const getAllNotification = async (req: Request, res: Response) => {
    try {
        const notifications = await feature8Client.notification.findMany();
        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
};

export const getAllTransactionDetails = async (req: Request, res: Response) => {
    try {
        const transactionDetails = await feature8Client.transaction_detail.findMany();
        res.json(transactionDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve transaction details' });
    }
};

export const getTransactionDetailById = async (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId, 10);

    try {
        const transactionDetail = await feature8Client.transaction_detail.findUnique({
            where: { transactionId },
        });

        if (!transactionDetail) {
            return res.status(404).json({ error: 'Transaction detail not found' });
        }

        res.status(200).json(transactionDetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve transaction detail' });
    }
};



// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };
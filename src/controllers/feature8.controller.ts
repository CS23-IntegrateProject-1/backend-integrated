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
export const getCreditCardById = async (req: Request, res: Response) => {
    const creditCardId = parseInt(req.params.creditCardId, 10);
    try {
        const creditCard = await feature8Client.credit_card.findUnique({
            where: { creditCardId },
        });

        if (!creditCard) {
            return res.status(404).json({ error: 'Credit card not found' });
        }

        res.status(200).json(creditCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve credit card' });
    }
}

export const getCreditCardByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    try {
        const user = await feature8Client.user.findUnique({
            where: { userId },
            include: {
                Credit_card: true, 
            },
        });

        if (!user || !user.Credit_card) {
            return res.status(404).json({ error: 'Credit card not found' });
        }

        res.status(200).json(user.Credit_card);
    } catch (error) {
        console.error('Error retrieving credit card:', error);
        res.status(500).json({ error: 'Failed to retrieve credit card' });
    }
};

export const getVenueCreditCardByVenueId = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);

    try {
        const creditCard = await feature8Client.venue_credit_card.findUnique({
            where: { creditCardId: venueId },
        });

        if (!creditCard) {
            return res.status(404).json({ error: 'Credit card not found' });
        }

        res.status(200).json(creditCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve credit card' });
    }
}

export const getVenuePromptpayByVenueId = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);

    try {
        const promptpay = await feature8Client.venue_promptpay.findUnique({
            where: { promptpayId: venueId },
        });

        if (!promptpay) {
            return res.status(404).json({ error: 'Promptpay not found' });
        }

        res.status(200).json(promptpay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve promptpay' });
    }
}

export const getOrderdetailByOrderId = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId, 10);

    try {
        const orderdetail = await feature8Client.order_detail.findUnique({
            where: { orderDetailId: orderId },
        });

        if (!orderdetail) {
            return res.status(404).json({ error: 'Order detail not found' });
        }

        res.status(200).json(orderdetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve order detail' });
    }
}

export const getMenuByMenuId = async (req: Request, res: Response) => {
    const menuId = parseInt(req.params.menuId, 10);

    try {
        const menu = await feature8Client.menu.findUnique({
            where: { menuId },
        });

        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        res.status(200).json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve menu' });
    }
}

export const addCreditCard = async (req: Request, res: Response) => {
    const { card_no, name,country,bank, exp, cvc } = req.body;

    try {
        const newCreditCard = await feature8Client.credit_card.create({
            data: {
                card_no,
                name,
                country,
                bank,
                cvc,
                exp,
                user: {
                    connect: {
                        userId: req.body.userId,
                    },
                },
            },
        });

        res.status(201).json(newCreditCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create credit card' });
    }
}

export const addVenueCreditCard = async (req: Request, res: Response) => {
    const { card_no, name,country,bank, exp, cvc } = req.body;

    try {
        const newCreditCard = await feature8Client.venue_credit_card.create({
            data: {
                card_no,
                name,
                country,
                bank,
                cvc,
                exp,
                venue: {
                    connect: {
                        venueId: req.body.venueId,
                    },
                },
            },
        });

        res.status(201).json(newCreditCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create credit card' });
    }
}
export const addVenuePromptpay = async (req: Request, res: Response) => {
    const { promptpay_no } = req.body;

    try {
        const newPromptpay = await feature8Client.venue_promptpay.create({
            data: {
                promptpay_no,
                venue: {
                    connect: {
                        venueId: req.body.venueId,
                    },
                },
            },
        });

        res.status(201).json(newPromptpay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create promptpay' });
    }
}
export const createTransactionDetail = async (req: Request, res: Response) => {
    const { detail, timestamp, status, total_amount } = req.body;

    try {
        const newTransactionDetail = await feature8Client.transaction_detail.create({
            data: {
                detail,
                timestamp,
                status,
                total_amount,
                transaction: {
                    connect: {
                        transactionId: req.body.transactionId,
                    },
                },
            },
        });

        res.status(201).json(newTransactionDetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create transaction detail' });
    }
};

export const updateCreditCard = async (req: Request, res: Response) => {
    const creditCardId = parseInt(req.params.creditCardId, 10);
    const { card_no, name,country,bank, exp, cvc } = req.body;

    try {
        const updatedCreditCard = await feature8Client.credit_card.update({
            where: { creditCardId },
            data: {
                card_no,
                name,
                country,
                bank,
                cvc,
                exp,
            },
        });

        res.status(200).json(updatedCreditCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update credit card' });
    }
}



// example of controller createAuthor
// export const createAuthor = async (req: Request, res: Response) => {
//   try {
//     const newAuthor = await feature1Client.modelName.create({
//       data: {
//         name: req.body.name,
//       },
//     });
//     res.status(201).json(newAuthor);
//   } catch (e) {
//     console.log(e);
//   }
// };


// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };
import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import authService from "../services/auth/auth.service";

const crypto = require('crypto');
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
    // const userId = parseInt(req.params.userId, 10);
    const token = req.cookies.authToken; // token stored in authToken

    if (!token) {
        return res.status(404).json({ error: 'not verify' });
    }
    const decodetoken = authService.decodeToken(token);
    const userId = decodetoken.userId;

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


export const getReservationByVenueId = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);

    try {
        const reservations = await feature8Client.reservation.findMany({
            where: { venueId },
        });

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for the specified venue' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Failed to retrieve reservations' });
    }
};


export const getTableIdsByVenueId = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);

    try {
        const tablesResponse = await feature8Client.tables.findMany({
            where: { venueId },
            select: { tableId: true },
        });

        if (tablesResponse.length === 0) {
            return res.status(404).json({ error: 'No tables found for the specified venue' });
        }

        const tableIds = tablesResponse.map((table) => table.tableId);

        return { tableIds };
    } catch (error) {
        console.error('Error fetching tableIds:', error);
        return res.status(500).json({ error: 'Failed to retrieve tableIds' });
    }
};

export const getTableNosByVenueId = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);

    try {
        const response = await getTableIdsByVenueId(req, res);

        if (!('tableIds' in response) || response.tableIds.length === 0) {
            return res.status(404).json({ error: 'No tableIds found for the specified venue' });
        }

        const tables = await feature8Client.tables.findMany({
            where: { tableId: { in: response.tableIds } },
            select: {
                tableId: true,
                table_no: true
            },
        });

        if (tables.length === 0) {
            return res.status(404).json({ error: 'No tables found for the specified tableIds' });
        }

        const tableNos = tables.map((table) => table.table_no);

        res.status(200).json({ tableNos });
    } catch (error) {
        console.error('Error fetching tableNos:', error);
        res.status(500).json({ error: 'Failed to retrieve tableNos' });
    }
};


export const getTableNoByReservationId = async (req: Request, res: Response) => {
    const { reservationId } = req.params;
  
    try {
      const reservation = await feature8Client.reservation.findUnique({
        where: { reservationId: parseInt(reservationId, 10) },
        include: {
          Reservation_table: {
            include: {
              reserve_table: {
                select: {
                  table_no: true,
                },
              },
            },
          },
        },
      });
  
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
  
      const tableNo = reservation.Reservation_table[0]?.reserve_table.table_no;
  
      if (!tableNo) {
        return res.status(404).json({ error: 'Table not found for the reservation' });
      }
  
      res.status(200).json({ tableNo });
    } catch (error) {
      console.error('Error fetching table number by reservation ID:', error);
      res.status(500).json({ error: 'Failed to retrieve table number' });
    }
  };


  export const getAllApptransactionByVenueId = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);

    try {
        const apptransactions = await feature8Client.app_transaction.findMany({
            where: { venueId },
        });

        if (!apptransactions || apptransactions.length === 0) {
            return res.status(404).json({ error: 'No app transactions found for the specified venue' });
        }

        res.status(200).json(apptransactions);
    } catch (error) {
        console.error('Error fetching app transactions by venue ID:', error);
        res.status(500).json({ error: 'Failed to retrieve app transactions' });
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

//transaction and transaction detail
export const getAllTransaction = async (req: Request, res: Response) => {
    try {
        const transactions = await feature8Client.transaction.findMany();
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
}

export const getTransactionById = async (req: Request, res: Response) => {
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

export const getAllApptransaction = async (req: Request, res: Response) => {
    try {
        const apptransactions = await feature8Client.app_transaction.findMany();
        res.json(apptransactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve app transactions' });
    }
}

export const getApptransactionById = async (req: Request, res: Response) => {
    const appTransactionId = parseInt(req.params.appTransactionId, 10);

    try {
        const apptransaction = await feature8Client.app_transaction.findUnique({
            where: { appTransactionId },
        });

        if (!apptransaction) {
            return res.status(404).json({ error: 'App transaction not found' });
        }

        res.status(200).json(apptransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve app transaction' });
    }
}

export const getAllAppTransactiondetail = async (req: Request, res: Response) => {
    try {
        const apptransactiondetail = await feature8Client.app_transaction_detail.findMany();
        res.json(apptransactiondetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve app transaction details' });
    }
}

export const getApptransactiondetailByTransactionId = async (req: Request, res: Response) => {
    try {
        const transactionId = parseInt(req.params.transactionId, 10);

        if (isNaN(transactionId)) {
            console.error('Invalid transactionId:', req.params.transactionId);
            return res.status(400).json({ error: 'Invalid transactionId' });
        }

        const appTransactionDetail = await feature8Client.app_transaction_detail.findUnique({
            where: { appTransactionId: transactionId },
        });

        if (!appTransactionDetail) {
            console.error('AppTransactionDetail not found for transactionId:', transactionId);
            return res.status(404).json({ error: 'AppTransactionDetail not found' });
        }

        res.status(200).json(appTransactionDetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve AppTransactionDetail' });
    }
};


export const getAppTransactiondetailById = async (req: Request, res: Response) => {
    const appTransactionDetailId = parseInt(req.params.appTransactionDetailId, 10);
    try {
        const apptransactiondetail = await feature8Client.app_transaction_detail.findUnique({
            where: { appTransactionDetailId },
        });
        if (!apptransactiondetail) {
            return res.status(404).json({ error: 'App transaction detail not found' });
        }
        res.status(200).json(apptransactiondetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve app transaction detail' });
    }
}









export const getVenuetransaction = async (req: Request, res: Response) => {
    try {
        const venuetransactions = await feature8Client.venue_transaction.findMany();
        res.json(venuetransactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve venue transactions' });
    }
}

export const getVenuetransactionById = async (req: Request, res: Response) => {
    const venueTransactionId = parseInt(req.params.venueTransactionId, 10);

    try {
        const venuetransaction = await feature8Client.venue_transaction.findUnique({
            where: { venueTransactionId },
        });

        if (!venuetransaction) {
            return res.status(404).json({ error: 'Venue transaction not found' });
        }

        res.status(200).json(venuetransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve venue transaction' });
    }
}

export const getVenuetransactiondetail = async (req: Request, res: Response) => {
    try {
        const venuetransactiondetails = await feature8Client.venue_transaction_detail.findMany();
        res.json(venuetransactiondetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve venue transaction details' });
    }
}

export const getVenuetransactiondetailById = async (req: Request, res: Response) => {
    const venueTransactionDetailId = parseInt(req.params.venueTransactionDetailId, 10);

    try {
        const venuetransactiondetail = await feature8Client.venue_transaction_detail.findUnique({
            where: { venueTransactionDetailId },
        });

        if (!venuetransactiondetail) {
            return res.status(404).json({ error: 'Venue transaction detail not found' });
        }

        res.status(200).json(venuetransactiondetail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve venue transaction detail' });
    }
}

// get credit card
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
        const venueCreditCard = await feature8Client.venue_credit_card.findMany({
            where: { venueId },
        });

        if (!venueCreditCard) {
            return res.status(404).json({ error: 'Venue credit card not found' });
        }

        res.status(200).json(venueCreditCard);
    } catch (error) {
        console.error('Error retrieving venue credit card:', error);
        res.status(500).json({ error: 'Failed to retrieve venue credit card' });
    }
};

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

// get order,menu
export const getOrderbyId = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId, 10);

    try {
        const order = await feature8Client.orders.findUnique({
            where: { orderId },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
}

export const getOrderdetailByOrderId = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId, 10);

    try {
        const orderdetail = await feature8Client.order_detail.findMany({
            where: { orderId },
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

// export const getAllNotificationReservation = async (req: Request, res: Response) => {
//     try {
//         const notifications = await feature8Client.notification_reservation.findMany();
//         res.json(notifications);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to retrieve notifications' });
//     }
// }

// export const getAllNotificationOrder = async (req: Request, res: Response) => {
//     try {
//         const notifications = await feature8Client.notification_order.findMany();
//         res.json(notifications);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to retrieve notifications' });
//     }
// }

// export const getAllNotificationAdBusiness = async (req: Request, res: Response) => {
//     try {
//         const notifications = await feature8Client.notification_ad_business.findMany();
//         res.json(notifications);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to retrieve notifications' });
//     }
// }
export const ShowUpdateOrder = async (req: Request, res: Response) => {
    const token = req.cookies.authToken; // token stored in authToken
    // wait to change the userId to businessId(not finish yet) businessId->venueId->orderUpdate
    if (!token) {
        return res.status(404).json({ error: 'not verify' });
    }
    const decodetoken = authService.decodeToken(token);
    const userId = decodetoken.userId;
    try {
        const order = await feature8Client.orders.findMany({
            where: { userId : userId },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
}
// add , create
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



// credit card encryption function

function encryptData(data, secretKey) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

// function decryptData(encryptedData, secretKey) {
//     const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
//     let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
//     decryptedData += decipher.final('utf-8');
//     return decryptedData;
// }


// credit card with encryption

export const addCreditCard = async (req: Request, res: Response) => {
    const { card_no, name, country, bank, exp, cvc, userId } = req.body;

    const secretKey = 'your-secret-key'; 

    const encryptedCardNo = encryptData(card_no, secretKey);

    try {
        const newCreditCard = await feature8Client.credit_card.create({
            data: {
                card_no: encryptedCardNo,
                name,
                country,
                bank,
                cvc,
                exp,
                user: {
                    connect: {
                        userId,
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

export const updateCreditCard = async (req: Request, res: Response) => {
    const creditCardId = parseInt(req.params.creditCardId, 10);
    const { card_no, name, country, bank, exp, cvc } = req.body;

    const secretKey = 'your-secret-key';

    const encryptedCardNo = encryptData(card_no, secretKey);

    try {
        const updatedCreditCard = await feature8Client.credit_card.update({
            where: { creditCardId },
            data: {
                card_no: encryptedCardNo,
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

export const addVenueCreditCard = async (req: Request, res: Response) => {
    const { card_no, name, country, bank, exp, cvc } = req.body;
    const secretKey = 'your-secret-key';
    const encryptedCardNo = encryptData(card_no, secretKey);

    try {
        const newCreditCard = await feature8Client.venue_credit_card.create({
            data: {
                card_no: encryptedCardNo,
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
};

export const updateVenueCreditCard = async (req: Request, res: Response) => {
    const venueId = parseInt(req.params.venueId, 10);
    
    const { card_no, name, country, bank, exp, cvc } = req.body;

    const secretKey = 'your-secret-key';

    if (!card_no || !name || !country || !bank || !exp || !cvc) {
        return res.status(400).json({ error: 'All fields are required for the update' });
    }

    const encryptedCardNo = encryptData(card_no, secretKey);

    try {
        const existingCreditCards = await feature8Client.venue_credit_card.findMany({
            where: { venueId },
        });

        if (!existingCreditCards || existingCreditCards.length === 0) {
            return res.status(404).json({ error: 'No credit cards found for the specified venue' });
        }

        // Update all credit cards associated with the venue
        const updatedCreditCards = await Promise.all(existingCreditCards.map(async (creditCard) => {
            const updatedCreditCard = await feature8Client.venue_credit_card.update({
                where: { creditCardId: creditCard.creditCardId },
                data: {
                    card_no: encryptedCardNo,
                    name,
                    country,
                    bank,
                    cvc,
                    exp,
                },
            });

            return updatedCreditCard;
        }));

        res.status(200).json(updatedCreditCards);
    } catch (error) {
        console.error('Error updating venue credit cards:', error);
        res.status(500).json({ error: 'Failed to update venue credit cards' });
    }
};


//token function
// import jwt, { Secret } from 'jsonwebtoken';
// interface CustomJwtPayload {
//     userId: number;
// }

// export const yourRouteHandler = (req: Request, res: Response) => {
//     const secret: Secret = 'your_secret_key' || "";

//     const token = req.cookies.authToken;

//     if (!token) {
//         return res.json({ error: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, secret) as CustomJwtPayload;
//         const { userId } = decoded;

//         const userData = {
//             userId: decoded.userId,
//             username: 'john_doe',
//         };

//         return res.json({ success: true, data: userData });
//     } catch (error) {
//         console.error('JWT verification error:', error);
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
// };

// import express from 'express';
// import cookieParser from 'cookie-parser';
// import { yourRouteHandler } from './controllers/authController';
// import { authenticate } from './middlewares/authMiddleware';

// const app = express();

// app.use(cookieParser());

// app.get('/your-protected-route', yourRouteHandler);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

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

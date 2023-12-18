import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
// import { parse } from "path";
// import { json } from "stream/consumers";
import multerConfig from "../multerConfig";
import { parse } from "path";
import { or } from "ramda";
import { get } from "http";
import { reservationMW } from "../middlewares/reservationMW";


const feature7Client = new PrismaClient();

export const getfeature7 = async (req: Request, res: Response) => {
};
//----------------Customer-Side-------------------//
export const getReservationId = async (req: any, res: Response) => {
    try{
        const reservationId=req.reservationId;
        console.log(reservationId);
        
        res.status(200).json(reservationId);
    }
    catch (e) {
        console.log(e);
    }
}
export const getMenusByVenueId = async (req: any, res: Response) => {
    try {
        const reservationId=req.reservationId;
        const reservationInfo = await feature7Client.reservation.findUnique({
            where: {
                reservationId: reservationId,
            },
        });
        const venueId = reservationInfo?.venueId;
        const allMenus = await feature7Client.menu.findMany(
            {
                where: {
                    venueId: venueId
                }
            }
        );

        res.status(200).json(allMenus);
    }
    catch (e) {
        console.log(e);
    }
}
export const getSetsByVenueId = async (req: any, res: Response) => {
    try {
        const reservationId=req.reservationId;
        const reservationInfo = await feature7Client.reservation.findUnique({
            where: {
                reservationId: reservationId,
            },
        });
        const venueId = reservationInfo?.venueId;
        const allSets = await feature7Client.sets.findMany(
            {
                where: {
                    venueId: venueId
                }
            }
        );

        res.status(200).json(allSets);
    }
    catch (e) {
        console.log(e);
    }
}
export const getMenuById = async (req: Request, res: Response) => {
    try {
        const menuId = req.params.id;
        const menu = await feature7Client.menu.findUnique(
            {
                where: {
                    menuId: parseInt(menuId)
                }
            }
        );
        return res.status(200).json(menu);
    }
    catch (e) {
        console.log(e);
    }
};
export const getSetById = async (req: Request, res: Response) => {
    try {
        const setId = req.params.id;
        const set = await feature7Client.sets.findUnique(
            {
                where: {
                    setId: parseInt(setId)
                }
            }
        );
        return res.status(200).json(set);
    }
    catch (e) {
        console.log(e);
    }
}
export const addMenuToCookie = async (req: any, res: Response) => {
    try {
        const userId = req.userId;
        const reservationId =req.reservationId;
        const reservationInfo = await feature7Client.reservation.findUnique({
            where: {
                reservationId: reservationId,
            },
        });
        const quantity = req.body.quantity;
        if (quantity === undefined || quantity === null) {
            return res.status(400).json({ error: 'Add Quantity' });
        }
        const menuId = req.params.menuId;
        const venueId = reservationInfo?.venueId;
        const branchId = reservationInfo?.branchId;
        const stockRecord = await feature7Client.stocks.findFirst({
            where: {
                venueId: venueId,
                branchId: branchId!,
                menuId: parseInt(menuId),
            },
        });

        if (stockRecord?.availability === false) {
            return res.status(404).json({ error: 'Menu item not available' });
        }
        const menu = await feature7Client.menu.findUnique(
            {
                where: {
                    menuId: parseInt(menuId)
                }
            }
        );
        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Retrieve existing cart from the 'cart' cookie or initialize an empty array
        const existingCartString = req.cookies.cart || '[]';
        const existingCart = JSON.parse(existingCartString);

        // Check if the menu item is already in the cart
        const existingCartItem = existingCart.find((item) => item.menuId === menu.menuId);

        if (existingCartItem && reservationId == existingCartItem.reservationId) {
            // If the item is already in the cart, update the quantity
            existingCartItem.quantity = quantity;
        } else {
            // If the item is not in the cart, add it
            existingCart.push({
                userId: parseInt(userId),
                menuId: menu.menuId,
                reservationId: reservationId,
                setId: null,
                name: menu.name,
                price: menu.price,
                quantity: quantity,
                image: menu.image,
                description: menu.description,
            });
        }
        if (quantity == 0) {
            existingCart.pop();
        }
        //if nothing in cart delete cookie
        if (existingCart.length == 0) {
            res.clearCookie('cart');
        }
        // Update the 'cart' cookie with the modified cart
        res.cookie('cart', JSON.stringify(existingCart));
        res.status(200).json({ success: true, message: 'Added to cart' });
    } catch (error) {
        console.log(error);
    }
}
export const deleteMenuFromCookie = async (req: any, res: Response) => {
    try {
        const reservationId =req.reservationId;
        const menuId = req.params.menuId;
        // Retrieve existing cart from the 'cart' cookie or initialize an empty array
        const existingCartString = req.cookies.cart || '[]';
        const existingCart = JSON.parse(existingCartString);

        // Check if the menu item is already in the cart
        const existingCartItem = existingCart.find((item) => item.menuId === menuId);
        existingCart.pop(existingCartItem);
        const updatedCart = existingCart.filter(item => item.reservationId == reservationId && item.menuId == menuId);
        // Update the 'cart' cookie with the modified cart
        res.cookie('cart', JSON.stringify(updatedCart));
        res.status(200).json({ success: true, message: 'Deleted menu from cart' });
    } catch (error) {
        console.log(error);
    }
}
export const addSetToCookie = async (req: any, res: Response) => {
    try {
        const userId = req.userId;
        const reservationId =req.reservationId;
        const reservationInfo = await feature7Client.reservation.findUnique({
            where: {
                reservationId: reservationId,
            },
        });
        const quantity = req.body.quantity;
        if (quantity === undefined || quantity === null) {
            return res.status(400).json({ error: 'Add Quantity' });
        }
        const setId = req.params.setId;
        const venueId = reservationInfo?.venueId;
        const branchId = reservationInfo?.branchId;
        const setItems = await feature7Client.set_items.findMany({
            where: {
                setId: parseInt(setId),
            },
        });
        const menuIds = setItems.map((setItem) => setItem.menuId);
        const stockRecords = await feature7Client.stocks.findMany({
            where: {
                menuId: {
                    in: menuIds,
                },
                venueId: venueId,
                branchId: branchId!,
            },
        });
        if (stockRecords.every((stockRecord) => stockRecord.availability) === false) {
            return res.status(404).json({ error: 'Set not available' });
        }
        const set = await feature7Client.sets.findUnique(
            {
                where: {
                    setId: parseInt(setId)
                }
            }
        );
        if (!set) {
            return res.status(404).json({ error: 'set item not found' });
        }

        // Retrieve existing cart from the 'cart' cookie or initialize an empty array
        const existingCartString = req.cookies.cart || '[]';
        const existingCart = JSON.parse(existingCartString);

        // Check if the set item is already in the cart
        const existingCartItem = existingCart.find((item) => item.setId === set.setId);

        if (existingCartItem && reservationId == existingCartItem.reservationId) {
            // If the item is already in the cart, update the quantity
            existingCartItem.quantity = quantity;
        } else {
            // If the item is not in the cart, add it
            existingCart.push({
                userId: parseInt(userId),
                setId: set.setId,
                reservationId: reservationId,
                menuId: null,
                name: set.name,
                price: set.price,
                quantity: quantity,
                image: set.image_url,
                description: set.description,
            });
        }
        if (quantity == 0) {
            existingCart.pop();
        }
        //if nothing in cart delete cookie
        if (existingCart.length == 0) {
            res.clearCookie('cart');
        }
        // Update the 'cart' cookie with the modified cart
        res.cookie('cart', JSON.stringify(existingCart));
        res.status(200).json({ success: true, message: 'Added to cart' });
    } catch (error) {
        console.log(error);
    }
}
export const deleteSetFromCookie = async (req: any, res: Response) => {
    try {
        const reservationId =req.reservationId;
        const setId = req.params.setId;
        // Retrieve existing cart from the 'cart' cookie or initialize an empty array
        const existingCartString = req.cookies.cart || '[]';
        const existingCart = JSON.parse(existingCartString);

        // Check if the menu item is already in the cart
        const existingCartItem = existingCart.find((item) => item.setId === setId);
        existingCart.pop(existingCartItem);
        const updatedCart = existingCart.filter(item => item.reservationId == reservationId && item.setId == setId);
        // Update the 'cart' cookie with the modified cart
        res.cookie('cart', JSON.stringify(updatedCart));
        res.status(200).json({ success: true, message: 'Deleted set from cart' });
    } catch (error) {
        console.log(error);
    }
}
export const showCart = async (req: any, res: Response) => {
    try {
        // const userId = parseInt(req.userId);
        const reservationId =req.reservationId;
        const cartString = req.cookies.cart || '[]';
        // console.log(cartString);
        const cart = JSON.parse(cartString);
        console.log(cart);
        const userCart = cart.filter((item: any) => item.reservationId === reservationId);
        console.log(userCart);
        res.status(200).json(userCart);
    }
    catch (e) {
        console.log(e);
    }
}
//Show detail of specific menu from cart
export const showMenuDetailFromCart = async (req: any, res: Response) => {
    try {
        const reservationId=req.reservationId;
        const menuId = parseInt(req.params.menuId);
        const cartString = req.cookies.cart || '[]';
        const cart = JSON.parse(cartString);
        const userCart = cart.filter((item: any) => item.reservationId === reservationId && item.menuId === menuId);
        if (userCart.length === 1) {
            const dataObject = userCart[0];
            res.status(200).json(dataObject);
        } else {
            res.status(404).json({ error: "Menu not found in the user's cart." });
        }
        // res.status(200).json(userCart);
    }
    catch (e) {
        console.log(e);
    }
}
//for sets
export const showSetDetailFromCart = async (req: any, res: Response) => {
    try {
        const reservationId=req.reservationId;
        const setId = parseInt(req.params.setId);
        const cartString = req.cookies.cart || '[]';
        const cart = JSON.parse(cartString);
        const userCart = cart.filter((item: any) => item.reservationId === reservationId && item.setId === setId);
        if (userCart.length === 1) {
            const dataObject = userCart[0];
            res.status(200).json(dataObject);
        } else {
            res.status(404).json({ error: "Set not found in the user's cart." });
        }
        // res.status(200).json(userCart);
    }
    catch (e) {
        console.log(e);
    }
}
export const addCartToOrderDetailsOfDineIn = async (req: any, res: Response) => {
    try{
        const reservationId = req.reservationId;
        const reservationInfo = await feature7Client.reservation.findUnique({
            where: {
                reservationId: reservationId,
            },
        });
        const venueId = reservationInfo?.venueId;
        const branchId = reservationInfo?.branchId;
        const userId = req.userId;
        const orderId = reservationId;
        const findOrder = await feature7Client.orders.findFirst({
            where: {
                orderId: reservationId,
            },
        });
        if (!findOrder) {
        //create new order
        const newOrder = await feature7Client.orders.create({
            data: {
                orderId: reservationId,
                userId: userId,
                branchId:branchId!,
                reservedId: reservationId,
                venueId: venueId!,
                order_date: new Date(),
                total_amount: 0,
                // status: "On_going",
            },
          });
        }
          const cartString = req.cookies.cart || '[]';
          const cart = JSON.parse(cartString);
          console.log(cart);
          const userCart = cart.filter((item: any) => item.reservationId === reservationId);
        console.log(userCart);
        //For menu
        const menuIds = userCart
        .filter((item) => item.menuId !== null) // Filter out null values
        .map((item) => parseInt(item.menuId));
        const menu = await feature7Client.menu.findMany({
            where: {
                menuId: {
                    in: menuIds.map((id) => parseInt(id))
                }
            } 
        });
        const menuOrderDetails = await feature7Client.order_detail.createMany({
            data: userCart
                .filter((item) => item.menuId !== null) // Filter out null menuId values
                .map((item) => ({
                    orderId: orderId,
                    menuId: item.menuId,
                    unit_price: menu.find((menu) => menu.menuId === item.menuId)?.price,
                    quantity: parseInt(item.quantity),
                    setId: null,
                    order_time: new Date(),
                    status: "On_going",
                })),
        });
        //For set
        const setIds = userCart
        .filter((item) => item.setId !== null) // Filter out null values
        .map((item) => parseInt(item.setId));
        // console.log(setIds);
        const set = await feature7Client.sets.findMany({
            where: {
                setId: {
                    in: setIds.map((id) => parseInt(id))
                }
            } 
        });
        const setOrderDetails = await feature7Client.order_detail.createMany({
            data: userCart
                .filter((item) => item.setId !== null) // Filter out null setId values
                .map((item) => ({
                    orderId: orderId,
                    setId: item.setId,
                    unit_price: set.find((set) => set.setId === item.setId)?.price,
                    menuId: null,
                    quantity: parseInt(item.quantity),
                    order_time: new Date(),
                    // status: "On_going",
                })),
        });
        //get all orderdetails of the order
        const orderDetailsOfOrder = await feature7Client.order_detail.findMany({
            where: {
                orderId: orderId,
            },
        });

        //get total amount with quantity and unitprice
        const totalAmount = orderDetailsOfOrder.reduce(
            (total, orderDetail) => total + orderDetail.quantity * orderDetail.unit_price.toNumber(),
            0
        );
        //update order with total amount
        const updatedOrder = await feature7Client.orders.update({
            where: {
                orderId: orderId,
            },
            data: {
                total_amount:totalAmount,
                status: "On_going",
            },
        });
        //clear cart
        res.clearCookie('userCart');
        const updatedCart = cart.filter(item => item.reservationId !== reservationId);
        res.cookie('cart', JSON.stringify(updatedCart));
        console.log(cart);
        res.status(200).json(orderDetailsOfOrder);
    }
    catch (e) {
        console.log(e);
    }
}
// export const addCartToOrderDetailsOfDineIn = async (req: any, res: Response) => {
//     try {
//         const branchId = req.body.branchId;
//         const venueId = req.params.venueId;
//         const userId = parseInt(req.userId);

//         // Check if the user already has an active order for the given venue
//         const existingOrder = await feature7Client.orders.findFirst({
//             where: {
//                 userId: userId,
//                 venueId: parseInt(venueId),
//                 status: "On_going", // Assuming this is your order status for active orders
//             },
//         });

//         let orderId;
//         if (existingOrder) {
//             // If the user has an active order for the venue, use its orderId
//             orderId = existingOrder.orderId;
//         } else {
//             // If the user doesn't have an active order for the venue, create a new order
//             const latestOrder = await feature7Client.orders.findFirst({
//                 orderBy: {
//                     orderId: 'desc',
//                 },
//             });

//             const newOrderId = latestOrder?.orderId ? latestOrder.orderId + 1 : 1;

//             // Create a new order
//             const newOrder = await feature7Client.orders.create({
//                 data: {
//                     orderId: newOrderId,
//                     userId: userId,
//                     branchId: parseInt(branchId),
//                     reservedId: null,
//                     venueId: parseInt(venueId),
//                     order_date: new Date(),
//                     total_amount: 0,
//                     status: "On_going",
//                 },
//             });

//             orderId = newOrderId;
//         }

//         const cartString = req.cookies.cart || '[]';
//         const cart = JSON.parse(cartString);
//         const userCart = cart.filter((item: any) => item.userId === userId);

//         // For menu
//         const menuIds = userCart
//             .filter((item) => item.menuId !== null)
//             .map((item) => parseInt(item.menuId));
//         const menu = await feature7Client.menu.findMany({
//             where: {
//                 menuId: {
//                     in: menuIds.map((id) => parseInt(id)),
//                 },
//             },
//         });

//         const menuOrderDetails = await feature7Client.order_detail.createMany({
//             data: userCart
//                 .filter((item) => item.menuId !== null)
//                 .map((item) => ({
//                     orderId: orderId,
//                     menuId: item.menuId,
//                     unit_price: menu.find((menu) => menu.menuId === item.menuId)?.price,
//                     setId: null,
//                     quantity: item.quantity,
//                     order_time: new Date(),
//                     status: "On_going",
//                 })),
//         });

//         // For set
//         const setIds = userCart
//             .filter((item) => item.setId !== null)
//             .map((item) => parseInt(item.setId));
//         const set = await feature7Client.sets.findMany({
//             where: {
//                 setId: {
//                     in: setIds.map((id) => parseInt(id)),
//                 },
//             },
//         });

//         const setOrderDetails = await feature7Client.order_detail.createMany({
//             data: userCart
//                 .filter((item) => item.setId !== null)
//                 .map((item) => ({
//                     orderId: orderId,
//                     setId: item.setId,
//                     unit_price: set.find((set) => set.setId === item.setId)?.price,
//                     menuId: null,
//                     quantity: item.quantity,
//                     order_time: new Date(),
//                 })),
//         });

//         // Get all order details of the order
//         const orderDetailsOfOrder = await feature7Client.order_detail.findMany({
//             where: {
//                 orderId: orderId,
//             },
//         });

//         // Get total amount with quantity and unit price
//         const totalAmount = orderDetailsOfOrder.reduce(
//             (total, orderDetail) => total + orderDetail.quantity * orderDetail.unit_price.toNumber(),
//             0
//         );

//         // Update order with total amount
//         const updatedOrder = await feature7Client.orders.update({
//             where: {
//                 orderId: orderId,
//             },
//             data: {
//                 total_amount: totalAmount,
//             },
//         });

//         // Clear cart
//         // res.clearCookie('userCart');
//         const updatedCart = cart.filter(item => item.userId !== userId);
//         res.cookie('cart', JSON.stringify(updatedCart));
//         res.status(200).json(orderDetailsOfOrder);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
export const showOnGoingOrderDetails = async (req: any, res: Response) => {
    try {
        const reservationId =req.reservationId;
        const orderDetails = await feature7Client.order_detail.findMany({
            where: {
                orderId: reservationId,
                status: "On_going",
            },
        });
        if (orderDetails.length !== 0) {
            const menuDetails = await feature7Client.menu.findMany({
                where: {
                    menuId: {
                        in: orderDetails
                            .map((orderDetail) => orderDetail.menuId)
                            .filter((menuId) => menuId !== null) as number[],
                    },
                },
            });
            const setDetails = await feature7Client.sets.findMany({
                where: {
                    setId: {
                        in: orderDetails
                            .map((orderDetail) => orderDetail.setId)
                            .filter((setId) => setId !== null) as number[],
                    },
                },
            });
            const orderDetailsWithDetails = orderDetails.map((orderDetail) => {
                const menu = menuDetails.find((menu) => menu.menuId === orderDetail.menuId);
                const set = setDetails.find((set) => set.setId === orderDetail.setId);

                return {
                    ...orderDetail,
                    menu: menu,
                    set: set,
                };
            });
            return res.status(200).json(orderDetailsWithDetails);
        }
        else {
            res.status(404).json({ error: "No ongoing order found." });
        }
        // res.status(200).json(orderDetails);
    }
    catch (e) {
        console.log(e);
    }
}
export const showCompletedOrderDetails = async (req: any, res: Response) => {
    try {
        const userId = parseInt(req.userId);
        const reservationId =req.reservationId;
        const orderDetails = await feature7Client.order_detail.findMany({
            where: {
                orderId: reservationId,
                status: "Completed",
            },
        });
        if (orderDetails.length !== 0) {
            const menuDetails = await feature7Client.menu.findMany({
                where: {
                    menuId: {
                        in: orderDetails
                            .map((orderDetail) => orderDetail.menuId)
                            .filter((menuId) => menuId !== null) as number[],
                    },
                },
            });
            const setDetails = await feature7Client.sets.findMany({
                where: {
                    setId: {
                        in: orderDetails
                            .map((orderDetail) => orderDetail.setId)
                            .filter((setId) => setId !== null) as number[],
                    },
                },
            });
            const orderDetailsWithDetails = orderDetails.map((orderDetail) => {
                const menu = menuDetails.find((menu) => menu.menuId === orderDetail.menuId);
                const set = setDetails.find((set) => set.setId === orderDetail.setId);

                return {
                    ...orderDetail,
                    menu: menu,
                    set: set,
                };
            });
            return res.status(200).json(orderDetailsWithDetails);
        }
        else {
            res.status(404).json({ error: "No ongoing order found." });
        }
        // res.status(200).json(orderDetails);
    }
    catch (e) {
        console.log(e);
    }
}
//get receipt
export const getReceipt = async (req: any, res: Response) => {
    try {
        const reservationId = req.reservationId;
        const orderId = reservationId;
        const orderInfo= await feature7Client.orders.findUnique({
            where: {
                orderId: orderId,
            },
        });
        const orderDetails = await feature7Client.order_detail.findMany({
            where: {
                orderId: orderId,
            },
        });
        //menu name
        const menuIds = orderDetails
            .map((orderDetail) => orderDetail.menuId)
            .filter((menuId) => menuId !== null) as number[];
        const menu = await feature7Client.menu.findMany({
            where: {
                menuId: {
                    in: menuIds,
                },
            },
        });
        //set name
        const setIds = orderDetails
            .map((orderDetail) => orderDetail.setId)
            .filter((setId) => setId !== null) as number[];
        const set = await feature7Client.sets.findMany({
            where: {
                setId: {
                    in: setIds,
                },
            },
        });
         // Calculate item count, total count, and total amount only once
         const itemCount = orderDetails.length;
         const totalCount = orderDetails.reduce((total, orderDetail) => total + orderDetail.quantity, 0);
         const totalAmount = orderInfo?.total_amount;
 
         // Process order details and add calculated values
         const orderDetailsWithDetails = orderDetails.map((orderDetail) => {
             const quantity = orderDetail.quantity;
             const menuName = menu.find((menu) => menu.menuId === orderDetail.menuId)?.name;
             const menuPrice= menu.find((menu) => menu.menuId === orderDetail.menuId)?.price;
             const setPrice= set.find((set) => set.setId === orderDetail.setId)?.price;
             const setName = set.find((set) => set.setId === orderDetail.setId)?.name;
             return {
                 
                 menuName: menuName,
                 setName: setName,
                 quantity: quantity,
                menuPrice: menuPrice,
                setPrice: setPrice,

             };
         });
 
         // Add calculated values to the response
         const finalResponse = {
            orderId: orderInfo?.orderId,
             orderDate: orderInfo?.order_date,
             orderDetails: orderDetailsWithDetails,
             itemCount: itemCount,
             totalCount: totalCount,
             totalAmount: totalAmount,
         };
 
         res.status(200).json(finalResponse);
    }
    catch (e) {
        console.log(e);
    }
}

//--------------Business side---------------//
//get all menus of venue 
export const getAllMenus = async (req: any, res: Response) => {
    try {
        const businessId = req.businessId;
        const getVenueId = await feature7Client.property.findFirst({
            where: {
                businessId: businessId,
            },
        });
        const venueId=getVenueId?.venueId;
        const allMenus = await feature7Client.menu.findMany(
            {
                where: {
                    venueId: venueId
                }
            }
        );

        res.status(200).json(allMenus);
    }
    catch (e) {
        console.log(e);
    }
}
export const getAllSets = async (req: any, res: Response) => {
    try {
        const businessId = req.businessId;
        const getVenueId = await feature7Client.property.findFirst({
            where: {
                businessId: businessId,
            },
        });
        const venueId=getVenueId?.venueId;
        const allSets = await feature7Client.sets.findMany(
            {
                where: {
                    venueId: venueId
                }
            }
        );

        res.status(200).json(allSets);
    }
    catch (e) {
        console.log(e);
    }
}
//show availability of menu of all branches
export const checkMenuAvailabilityOfAllBranches = async (req: any, res: Response) => {
    try {
        const menuId = req.params.menuId;
        const businessId = req.businessId;
        const getVenueId = await feature7Client.property.findFirst({
            where: {
                businessId: businessId,
            },
        });
        const venueId=getVenueId?.venueId;
        const stockRecord = await feature7Client.stocks.findMany({
            where: {
                venueId: venueId,
                menuId: parseInt(menuId),
            },
        });
        // Extract branch IDs from stock records
        const branchIds = stockRecord.map((record) => record.branchId);

        // Query the venue_branch table to get branch names
        const branchNames = await feature7Client.venue_branch.findMany({
            where: {
                venueId: venueId,
                branchId: { in: branchIds },
            },
            select: {
                branchId: true,
                branch_name: true,
            },
        });

        // Create a mapping of branchId to branchName
        const branchIdToNameMap: Record<number, string> = {};
        branchNames.forEach((branch) => {
            branchIdToNameMap[branch.branchId] = branch.branch_name;
        });

        // Combine stock records with branch names
        const result = stockRecord.map((record) => ({
            branchId: record.branchId,
            branchName: branchIdToNameMap[record.branchId] || 'Unknown Branch',
            availability: record.availability || 0, // Assuming availability is a field in the stocks table
            // Add other fields from stock record if needed
            // For example: menuId: record.menuId, quantity: record.quantity, etc.
        }));

        return res.status(200).json(result);
    }
    catch (e) {
        console.error('Error checking stock availability:', e);
    }
}
//Change menu availability
export const changeMenuAvailability = async (req: any, res: Response) => {
    try {
        const menuId = req.params.menuId;
        const businessId = req.businessId;
        const getVenueId = await feature7Client.property.findFirst({
            where: {
                businessId: businessId,
            },
        });
        const venueId=getVenueId?.venueId;
        const branchId = req.params.branchId;
        console.log(branchId);
        const availability = await feature7Client.stocks.findFirst({
            where: {
                venueId: venueId,
                branchId: parseInt(branchId),
                menuId: parseInt(menuId),
            },
        });
        const stockRecord = await feature7Client.stocks.update({
            where: {
                stockId: availability?.stockId,
            },
            data: {
                availability: !(availability?.availability),
            }
        });

        return res.status(200).json(stockRecord);
    }
    catch (e) {
        console.error('Error changing stock availability:', e);
    }
}
//edit menu
export const editMenu = async (req: any, res: Response) => {
    try {
        multerConfig.single('menuImage')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const menuId = req.params.menuId;
            const imageFile = await feature7Client.menu.findUnique({ where: { menuId: parseInt(menuId) } });
            const name = req.body.name;
            const price = req.body.price;
            const description = req.body.description;
            const image = req.file?.filename || imageFile?.image; // Use the filename generated by multer

            try {
                const menu = await feature7Client.menu.update({
                    where: {
                        menuId: parseInt(menuId),
                    },
                    data: {
                        name: name,
                        price: price,
                        description: description,
                        image: image,
                    }
                });
                return res.status(200).json(menu);
            } catch (e) {
                console.error('Error editing menu:', e);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });

    }
    catch (e) {
        console.error('Error editing', e);
    }
}
//add menu
export const addMenu = async (req: any, res: Response) => {
    try {
        const businessId = req.businessId;
        const getVenueId = await feature7Client.property.findFirst({
            where: {
                businessId: businessId,
            },
        });
        const venueId=getVenueId?.venueId;

        // const image = "menuImage.jpg";

        // Use multerConfig middleware to handle file upload
        multerConfig.single('menuImage')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const name = req.body.name;
            const price = req.body.price;
            const description = req.body.description;
            const image = req.file ? req.file.filename : ''; // Use the filename generated by multer

            try {
                const menu = await feature7Client.menu.create({
                    data: {
                        name: name,
                        price: price,
                        description: description,
                        image: image,
                        venueId: venueId!,
                        menu_no: 0,
                    },
                });
                const branchIds = await feature7Client.venue_branch.findMany({
                    where: {
                        venueId: venueId,
                    },
                    select: {
                        branchId: true,
                    },
                });
                await Promise.all(
                    branchIds.map(async (branchId) => {
                        const createdStock = await feature7Client.stocks.create({
                            data: {
                                menuId: menu.menuId,
                                venueId: venueId!,
                                branchId: branchId.branchId,
                            },
                        });
                        return createdStock;
                    })
                );

                return res.status(200).json(menu);
            } catch (e) {
                console.error('Error adding menu:', e);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    catch (e) {
        console.error('Error adding menu', e);
    }
}
//add menu to set (cookies)
export const addMenuItemsToSetsInCookies = async (req: Request, res: Response) => {
    try {
        const setId = req.params.setId || "0";
        const menuId = req.body.menuId;
        const menu = await feature7Client.menu.findUnique(
            {
                where: {
                    menuId: parseInt(menuId)
                }
            }
        );
        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        const existingItemsString = req.cookies.setItems || '[]';
        const existingItems = JSON.parse(existingItemsString);
        // Check if the item is already in the array
        const itemExists = existingItems.some(item => (
            item.setId === parseInt(setId) && item.menuId === parseInt(menuId)
        ));

        // If the item doesn't exist, add it to the array
        if (!itemExists) {
            existingItems.push({
                // venueId: parseInt(venueId),
                menuId: parseInt(menuId),
                setId: parseInt(setId),
                menuName: menu.name
            });

            // Set the updated array as the value for the cookie
            res.cookie('setItems', JSON.stringify(existingItems));
        }

        console.log('existingItems:', existingItems);

        // Clear the cookie if the array is empty
        if (existingItems.length === 0) {
            res.clearCookie('setItems');
        }
        res.cookie('setItems', JSON.stringify(existingItems));
        res.status(200).json({ success: true, message: 'Added items to set' });
    }
    catch (e) {
        console.error('Error adding menu items to set:', e);
    }
};
//show set items for specific set in cookies
export const showMenuItemsInCookies = async (req: Request, res: Response) => {
    try {
        const setId = parseInt(req.params.setId) || 0;
        // const venueId = parseInt(req.params.venueId);
        const menuItemsString = req.cookies.setItems || '[]';
        console.log(menuItemsString);
        const menuItems = JSON.parse(menuItemsString);
        const specific = menuItems.filter((item: any) => item.setId === setId);
        console.log(menuItems);
        res.status(200).json(specific);
    }
    catch (e) {
        console.log(e);
    }
};
//add set
export const addSetWithMenuItems = async (req: any, res: Response) => {
    try {

        // Create a new set in the Sets table
        multerConfig.single('menuImage')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const { name, price, description } = req.body;
            const businessId = req.businessId;
            const getVenueId = await feature7Client.property.findFirst({
                where: {
                    businessId: businessId,
                },
            });
            const venueId=getVenueId?.venueId;
            const selectedMenuItem = req.cookies.setItems || [];
            const selectedMenuItems = JSON.parse(selectedMenuItem);
            const menuIds = selectedMenuItems.filter(item => item.setId === 0);
            const image = req.file ? req.file.filename : ''; // Use the filename generated by multer


            try {
                const createdSet = await feature7Client.sets.create({
                    data: {
                        name,
                        price,
                        description,
                        image_url: image,
                        venueId: venueId!,
                    },
                });
                const menuItems = selectedMenuItems.filter(item => item.setId === 0);
                // Create set items in the SetItems table for the extracted menuId values
                const setItems = await feature7Client.set_items.createMany({
                    data: menuItems.map((item) => ({
                        menuId: item.menuId,
                        setId: createdSet.setId,
                    })),
                });

                const updated = selectedMenuItems.filter(item => item.setId !== 0);
                res.cookie('setItems', JSON.stringify(updated));
                res.json({ createdSet, setItems });

            } catch (e) {
                console.error('Error adding set:', e);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });



    } catch (error) {
        console.error('Error adding set with menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//clear set items in cookies by venueid
export const clearSetItemsInCookies = async (req: Request, res: Response) => {
    try {
        // const venueId = req.params.venueId;
        const setId = req.params.setId || "0";
        const selectedMenuItem = req.cookies.setItems || [];
        console.log(selectedMenuItem);
        const selectedMenuItems = JSON.parse(selectedMenuItem);
        const updated = selectedMenuItems.filter(item => item.setId !== parseInt(setId));
        res.cookie('setItems', JSON.stringify(updated));
        res.status(200).json({ success: true, message: 'Cleared' });
    }
    catch (e) {
        console.log(e);
    }
}
//delete menu
export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const menuId = req.params.menuId;
        await feature7Client.stocks.deleteMany({
            where: {
                menuId: parseInt(menuId),
            },
        });
        const setId = await feature7Client.set_items.findMany({
            where: {
                menuId: parseInt(menuId),
            },
        });
        console.log(setId);
        await feature7Client.set_items.deleteMany({
            where: {
                setId: {
                    in: setId.map((id) => id.setId)

                }
            },
        });
        const deleteSet = await feature7Client.sets.deleteMany({
            where: {
                setId: {
                    in: setId.map((id) => id.setId)
                }
            },
        });
        await feature7Client.menu.delete({
            where: {
                menuId: parseInt(menuId),
            },
        });
        return res.status(200).json(deleteSet);
    } catch (e) {
        console.error('Error deleting menu:', e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
//delete set
export const deleteSet = async (req: Request, res: Response) => {
    try {
        const setId = req.params.setId;
        await feature7Client.set_items.deleteMany({
            where: {
                setId: parseInt(setId),
            },
        });
        const set = await feature7Client.sets.delete({
            where: {
                setId: parseInt(setId),
            },
        });
        return res.status(200).json(set);
    } catch (e) {
        console.error('Error deleting set:', e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
//delete menu item from set
export const deleteMenuItemFromSet = async (req: Request, res: Response) => {
    try {
        const menuId = req.params.menuId;
        const setId = req.params.setId;

        const setItems = await feature7Client.set_items.findFirst({
            where: {
                setId: parseInt(setId),
                menuId: parseInt(menuId),
            },
        });
        const toDelete = await feature7Client.set_items.delete({
            where: {
                setItemId: setItems?.setItemId,
            },
        });
        return res.status(200).json(toDelete);
    } catch (e) {
        console.error('Error deleting menu item from set:', e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
//edit set
export const editSet = async (req: any, res: Response) => {
    try {

        // Create a new set in the Sets table
        multerConfig.single('menuImage')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const setId = req.params.setId;
            const imageFile = await feature7Client.sets.findUnique({ where: { setId: parseInt(setId) } });
            const { name, price, description } = req.body;
            const businessId = req.businessId;
            const getVenueId = await feature7Client.property.findFirst({
                where: {
                    businessId: businessId,
                },
            });
            const venueId=getVenueId?.venueId;
            const selectedMenuItem = req.cookies.setItems || [];
            const selectedMenuItems = JSON.parse(selectedMenuItem);
            const image = req.file?.filename || imageFile?.image_url; // Use the filename generated by multer

            try {
                const editedSet = await feature7Client.sets.update({
                    where: {
                        setId: parseInt(setId),
                    },
                    data: {
                        name,
                        price,
                        description,
                        image_url: image,
                        venueId: venueId!,
                    },
                });
                const menuItems = selectedMenuItems.filter(item => item.setId === parseInt(setId));
                // Create set items in the SetItems table for the extracted menuId values
                const setItems = await feature7Client.set_items.createMany({
                    data: menuItems.map((item) => ({
                        menuId: item.menuId,
                        setId: parseInt(setId),
                    })),
                });
                const updated = selectedMenuItems.filter(item => item.setId !== parseInt(setId));
                res.cookie('setItems', JSON.stringify(updated));
                res.json({ editedSet, setItems });

            } catch (e) {
                console.error('Error adding set:', e);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });



    } catch (error) {
        console.error('Error adding set with menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//get menu by venue which are not included in specific set
export const getMenuByVenueNotInSet = async (req: any, res: Response) => {
    try {
        const businessId = req.businessId;
        const getVenueId = await feature7Client.property.findFirst({
            where: {
                businessId: businessId,
            },
        });
        const venueId=getVenueId?.venueId;
        const setId = req.params.setId;
        const menuItems = await feature7Client.set_items.findMany({
            where: {
                setId: parseInt(setId),
            },
        });
        const menuIds = menuItems.map((item) => item.menuId);
        const menu = await feature7Client.menu.findMany({
            where: {
                venueId: venueId,
                menuId: {
                    notIn: menuIds,
                },
            },
        });
        return res.status(200).json(menu);
    }
    catch (e) {
        console.log(e);
    }
}
//delete menu item before adding to set
export const deleteMenuItemBeforeAddingToSet = async (req: Request, res: Response) => {
    try {
        const menuId = req.body.menuId;
        const setId = "0" || req.params.setId;
        const selectedMenuItem = req.cookies.setItems || [];
        console.log(selectedMenuItem);
        const selectedMenuItems = JSON.parse(selectedMenuItem);
        const updated = selectedMenuItems.filter(item => item.menuId !== parseInt(menuId) || item.setId !== parseInt(setId));
        res.cookie('setItems', JSON.stringify(updated));
        res.status(200).json({ success: true, message: 'Deleted' });
    }
    catch (e) {
        console.log(e);
    }
}
//show menu items in set
export const showMenuItemsInSet = async (req: Request, res: Response) => {
    try {
        const setId = req.params.setId;
        const menuItems = await feature7Client.set_items.findMany({
            where: {
                setId: parseInt(setId),
            },
        });
        const menuIds = menuItems.map((item) => item.menuId);
        const menu = await feature7Client.menu.findMany({
            where: {
                menuId: {
                    in: menuIds,
                },
            },
        });
        const result = menu.map((menuItem) => ({
            setId: setId,
            menuId: menuItem.menuId,
            menuName: menuItem.name,
        }));
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
    }
}
// show checkedin tables in business
// export const showCheckedInTablesInBusiness = async (req: any, res: Response) => {
//     try {
//         const venueId = req.params.venueId;
//         const getReservations = await feature7Client.orders.findMany({
//             where: {
//                 venueId: parseInt(venueId),
//             },
//         });
//         const getTable = await feature7Client.reservation_table.findMany({
//             where: {
//                 reserveId: {
//                     in: getReservations.map((reservation) => reservation.reservedId).filter((id) => id !== null) as number[],
//                 },
//             },
//         });
//         res.status(200).json(getTable);
//     }
//     catch (e) {
//         console.log(e);
//     }
// }
//show ongoing order in business
// export const onGoingOrderDetailsInBusiness = async (req: any, res: Response) => {
//     try{ const venueId = req.params.venueId;
//     const getReservations = await feature7Client.orders.findMany({
//         where: {
//             venueId: parseInt(venueId),
//         },
//     }); 
//     console.log(getReservations);
//     const getTable = await feature7Client.reservation_table.findMany({
//         where: {
//             reserveId: {
//                 in: getReservations.map((reservation) => reservation.reservedId).filter((id) => id !== null) as number[],
//             },
//         },
//     });
//     const getOrderDetailsOfOngoingOrder = await feature7Client.order_detail.findMany({
//         where: {
//             orderId: {
//                 in: getReservations.map((reservation) => reservation.orderId),
//             },
//             status: "On_going",
//             // Filter based on menuId or setId not being null
//             OR: [
//                 { menuId: { not: null } },
//                 { setId: { not: null } },
//             ],
//         },
//     });
//     const tableOrderDetailsMap = {};

//         // Populate tableOrderDetailsMap using reservationId
//         getOrderDetailsOfOngoingOrder.forEach((orderDetail) => {
//             const reservationId = orderDetail.orderId;

//             if (!tableOrderDetailsMap[reservationId]) {
//                 tableOrderDetailsMap[reservationId] = [];
//             }

//             tableOrderDetailsMap[reservationId].push(orderDetail);
//         });

//         const response = getTable.map((table) => {
//             const reservationId = table.reserveId;
//             const orderDetails = tableOrderDetailsMap[reservationId] || [];

//             return {
//                 table,
//                 orderDetails,
//             };
//         });

//         res.status(200).json(response);
//     }
//     catch (e) {
//         console.log(e);
//     }
// }

//Show ongoing order in business
export const onGoingOrderDetailsInBusiness = async (req: any, res: Response) => {
    try {
        const venueId = req.params.venueId;
        const getReservations = await feature7Client.orders.findMany({
            where: {
                venueId: parseInt(venueId),
            },
        });

        const getTable = await feature7Client.reservation_table.findMany({
            where: {
                reserveId: {
                    in: getReservations.map((reservation) => reservation.reservedId).filter((id) => id !== null) as number[],
                },
            },
        });

        const getOrderDetailsOfOngoingOrder = await feature7Client.order_detail.findMany({
            where: {
                orderId: {
                    in: getReservations.map((reservation) => reservation.orderId),
                },
                status: "On_going",
                // Filter based on menuId or setId not being null
                OR: [
                    { menuId: { not: null } },
                    { setId: { not: null } },
                ],
            },
        });
        const tablesWithOrderDetails = getTable.filter((table) => {
            const reservationId = table.reserveId;
            return getOrderDetailsOfOngoingOrder.some((orderDetail) => orderDetail.orderId === reservationId);
        });
        const orderIds = getOrderDetailsOfOngoingOrder.map((orderDetail) => orderDetail.orderId);

        // Fetch order dates based on orderIds
        const orderDates = await feature7Client.orders.findMany({
            where: {
                orderId: {
                    in: orderIds,
                },
            },
            select: {
                orderId: true,
                order_date: true,
            },
        });

        // Create a map of order dates using orderId as the key
        const orderDateMap = {};
        orderDates.forEach((order) => {
            orderDateMap[order.orderId] = order.order_date;
        });
        // Get non-null menuIds and setIds
        const nonNullMenuIds = getOrderDetailsOfOngoingOrder.filter((orderDetail) => orderDetail.menuId !== null).map((orderDetail) => orderDetail.menuId);
        const nonNullSetIds = getOrderDetailsOfOngoingOrder.filter((orderDetail) => orderDetail.setId !== null).map((orderDetail) => orderDetail.setId);

        // Fetch menu and set names based on non-null menuIds and setIds
        const nonNullMenuIdsFiltered = nonNullMenuIds.filter((id) => id !== null) as number[];

        const menuNames = await feature7Client.menu.findMany({
            where: {
                menuId: {
                    in: nonNullMenuIdsFiltered,
                },
            },
            select: {
                menuId: true,
                name: true,
            },
        });

        const setNames = await feature7Client.sets.findMany({
            where: {
                setId: {
                    in: nonNullSetIds.filter((id) => id !== null) as number[],
                },
            },
            select: {
                setId: true,
                name: true,
            },
        });

        const menuNameMap = {};
        const setNameMap = {};

        // Populate menuNameMap and setNameMap
        menuNames.forEach((menu) => {
            menuNameMap[menu.menuId] = menu.name;
        });

        setNames.forEach((set) => {
            setNameMap[set.setId] = set.name;
        });

        const tableOrderDetailsMap = {};

        // Populate tableOrderDetailsMap using reservationId
        getOrderDetailsOfOngoingOrder.forEach((orderDetail) => {
            const reservationId = orderDetail.orderId;

            if (!tableOrderDetailsMap[reservationId]) {
                tableOrderDetailsMap[reservationId] = [];
            }

            // Get menu and set names based on non-null menuId or setId
            const menuName = orderDetail.menuId !== null ? menuNameMap[orderDetail.menuId] : null;
            const setName = orderDetail.setId !== null ? setNameMap[orderDetail.setId] : null;

            // Add menu and set names to order detail
            const orderDetailWithNames = {
                ...orderDetail,
                menuName,
                setName,
            };

            tableOrderDetailsMap[reservationId].push(orderDetailWithNames);
        });

        const response = tablesWithOrderDetails.map((table) => {
            const reservationId = table.reserveId;
            const orderDetails = tableOrderDetailsMap[reservationId] || [];
            const orderDate = orderDateMap[reservationId];

            return {
                table: {
                    ...table,
                    orderDate,
                },
                orderDetails,
            };
        });
        
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
    }
};

//show completed order in business
export const completedOrderDetailsInBusiness = async (req: any, res: Response) => {
    try {
        const venueId = req.params.venueId;
        const getReservations = await feature7Client.orders.findMany({
            where: {
                venueId: parseInt(venueId),
            },
        });

        const getTable = await feature7Client.reservation_table.findMany({
            where: {
                reserveId: {
                    in: getReservations.map((reservation) => reservation.reservedId).filter((id) => id !== null) as number[],
                },
            },
        });

        const getOrderDetailsOfCompletedOrder = await feature7Client.order_detail.findMany({
            where: {
                orderId: {
                    in: getReservations.map((reservation) => reservation.orderId),
                },
                status: "Completed",
                // Filter based on menuId or setId not being null
                OR: [
                    { menuId: { not: null } },
                    { setId: { not: null } },
                ],
            },
        });
        const orderIds = getOrderDetailsOfCompletedOrder.map((orderDetail) => orderDetail.orderId);

        // Fetch order dates based on orderIds
        const orderDates = await feature7Client.orders.findMany({
            where: {
                orderId: {
                    in: orderIds,
                },
            },
            select: {
                orderId: true,
                order_date: true,
            },
        });

        // Create a map of order dates using orderId as the key
        const orderDateMap = {};
        orderDates.forEach((order) => {
            orderDateMap[order.orderId] = order.order_date;
        });
        // Get non-null menuIds and setIds
        const nonNullMenuIds = getOrderDetailsOfCompletedOrder.filter((orderDetail) => orderDetail.menuId !== null).map((orderDetail) => orderDetail.menuId);
        const nonNullSetIds = getOrderDetailsOfCompletedOrder.filter((orderDetail) => orderDetail.setId !== null).map((orderDetail) => orderDetail.setId);

        // Fetch menu and set names based on non-null menuIds and setIds
        const nonNullMenuIdsFiltered = nonNullMenuIds.filter((id) => id !== null) as number[];

        const menuNames = await feature7Client.menu.findMany({
            where: {
                menuId: {
                    in: nonNullMenuIdsFiltered,
                },
            },
            select: {
                menuId: true,
                name: true,
            },
        });

        const setNames = await feature7Client.sets.findMany({
            where: {
                setId: {
                    in: nonNullSetIds.filter((id) => id !== null) as number[],
                },
            },
            select: {
                setId: true,
                name: true,
            },
        });

        const menuNameMap = {};
        const setNameMap = {};

        // Populate menuNameMap and setNameMap
        menuNames.forEach((menu) => {
            menuNameMap[menu.menuId] = menu.name;
        });

        setNames.forEach((set) => {
            setNameMap[set.setId] = set.name;
        });

        const tableOrderDetailsMap = {};

        // Populate tableOrderDetailsMap using reservationId
        getOrderDetailsOfCompletedOrder.forEach((orderDetail) => {
            const reservationId = orderDetail.orderId;

            if (!tableOrderDetailsMap[reservationId]) {
                tableOrderDetailsMap[reservationId] = [];
            }

            // Get menu and set names based on non-null menuId or setId
            const menuName = orderDetail.menuId !== null ? menuNameMap[orderDetail.menuId] : null;
            const setName = orderDetail.setId !== null ? setNameMap[orderDetail.setId] : null;

            // Add menu and set names to order detail
            const orderDetailWithNames = {
                ...orderDetail,
                menuName,
                setName,
            };

            tableOrderDetailsMap[reservationId].push(orderDetailWithNames);
        });

        const response = getTable.map((table) => {
            const reservationId = table.reserveId;
            const orderDetails = tableOrderDetailsMap[reservationId] || [];
            const orderDate = orderDateMap[reservationId];
        
            return {
                table: {
                    ...table,
                    orderDate,
                },
                orderDetails,
            };
        });
        
        res.status(200).json(response);
}
    catch (e) {
        console.log(e);
    }
}
//change orderdetail status
export const changeOrderDetailStatusCompleted = async (req: any, res: Response) => {
    try {
        const orderDetailId = req.params.orderDetailId;
        const orderDetail = await feature7Client.order_detail.update({
            where: {
                orderDetailId: parseInt(orderDetailId),
            },
            data: {
                status: "Completed",
            },
        });
        const orderId = orderDetail.orderId;
        //check every orderDetail in order is completed or not
        const orderDetails = await feature7Client.order_detail.findMany({
            where: {
                orderId: orderId,
            },
        });
        const completed = orderDetails.every((orderDetail) => orderDetail.status === "Completed");
        //if all orderDetails are completed, change order status to completed
        if (completed) {
            const order = await feature7Client.orders.update({
                where: {
                    orderId: orderId,
                },
                data: {
                    status: "Completed",
                },
            });
        }
        res.status(200).json(orderDetail);
    }
    catch (e) {
        console.log(e);
    }
}
//------------------MIK------------------//
export const addMenuMIK = async (req: any, res: Response) => {
    try{
        const venueId =2;
        const menuNo=req.body.menu_id;
        const name=req.body.Menus.menu_name;
        const price=req.body.Menus.menu_price;
        const img=req.body.Menus.menu_picture;
        const iinsertMenu = await feature7Client.menu.createMany({
            data: {
                venueId:venueId,
                menu_no:menuNo,
                name:name,
                price:price,
                image:img,
            },
        });
        return res.status(200).json(iinsertMenu);
    }
    catch (e) { 
        console.log(e);
    }
}
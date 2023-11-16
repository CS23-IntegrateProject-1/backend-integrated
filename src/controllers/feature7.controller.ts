import { PrismaClient } from "@prisma/client";
import exp from "constants";
import { set } from "date-fns";
import { tr } from "date-fns/locale";
import { Response, Request } from "express";
import { parse } from "path";
import { customVerifyCookie } from "../middlewares/verifyCookies";


const feature7Client = new PrismaClient();

export const getfeature7 = async (req: Request, res: Response) => {
};
export const getMenusByVenueId = async (req: Request, res: Response) => {
    try {
        const venueId= req.params.id;
        const allMenus = await feature7Client.menu.findMany(
            {
                where: {
                    venueId: parseInt(venueId)
                }
            }
        );
        
        res.status(200).json(allMenus);
    }
    catch (e) {
        console.log(e);
    }
}
export const getSetsByVenueId = async (req: Request, res: Response) => {
    try {
        const venueId= req.params.id;
        const allSets = await feature7Client.sets.findMany(
            {
                where: {
                    venueId: parseInt(venueId)
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
        const menuId= req.params.id;
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
        const setId= req.params.id;
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
export const checkMenuAvailability = async (req: Request, res: Response) => {
    try {
        const menuId= req.params.menuId;
        const venueId= req.params.venueId;
        const branchId= req.params.branchId;
        const stockRecord = await feature7Client.stocks.findFirst({
            where: {
              venueId : parseInt(venueId),
              branchId : parseInt(branchId),
              menuId : parseInt(menuId),
            },
          });
      
          return res.status(200).json(stockRecord?.availability);
    }
    catch (e) {
        console.error('Error checking stock availability:', e);
    }
}
export const checkSetAvailability = async (req: Request, res: Response) => {
    try{
        const setItems = await feature7Client.set_items.findMany({
            where: {
              setId: parseInt(req.params.setId),
            },
          });
          const menuIds = setItems.map((setItem) => setItem.menuId);
          const stockRecords = await feature7Client.stocks.findMany({
            where: {
              menuId: {
                in: menuIds,
              },
              venueId : parseInt(req.params.venueId),
              branchId : parseInt(req.params.branchId),
            },
          });
        return res.status(200).json(stockRecords.every((stockRecord) => stockRecord.availability));
    }
    catch (e) {
       console.log(e);
      }
}

export const addMenuToCookie = async (req: Request, res: Response) => {
    try{
        const userId = "4";
        const quantity = req.body.quantity;
        const menuId = req.params.menuId;
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

    if (existingCartItem && userId==existingCartItem.userId) {
      // If the item is already in the cart, update the quantity
      existingCartItem.quantity = quantity;
    } else {
      // If the item is not in the cart, add it
      existingCart.push({
        userId: parseInt(userId),
        menuId: menu.menuId,
        setId: null,
        name: menu.name,
        price: menu.price,
        quantity: quantity,
        image: menu.image,
        description: menu.description,
      });
    }
    if(quantity==0){
        existingCart.pop();
    }
    //if nothing in cart delete cookie
    if(existingCart.length==0){
        res.clearCookie('cart');
    }
    // Update the 'cart' cookie with the modified cart
    res.cookie('cart', JSON.stringify(existingCart));
    res.status(200).json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.log(error);
  }
}
export const addSetToCookie = async (req: Request, res: Response) => {
    try{
        const userId = "4";
        const quantity = req.body.quantity;
        const setId = req.params.setId;
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

    if (existingCartItem && userId==existingCartItem.userId) {
      // If the item is already in the cart, update the quantity
      existingCartItem.quantity = quantity;
    } else {
      // If the item is not in the cart, add it
      existingCart.push({
        userId: parseInt(userId),
        setId: set.setId,
        menuId: null,
        name: set.name,
        price: set.price,
        quantity: quantity,
        image: set.image_url,
        description: set.description,
      });
    }
    if(quantity==0){
        existingCart.pop();
    }
    //if nothing in cart delete cookie
    if(existingCart.length==0){
        res.clearCookie('cart');
    }
    // Update the 'cart' cookie with the modified cart
    res.cookie('cart', JSON.stringify(existingCart));
    res.status(200).json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.log(error);
  }
}
export const showCart = async (req: Request, res: Response) => {
    try {
        const userId =4 ;
        const cartString = req.cookies.cart || '[]';
        const cart = JSON.parse(cartString);
        const userCart = cart.filter((item: any) => item.userId === userId);
        res.status(200).json(userCart);
    }
    catch (e) {
        console.log(e);
    }
}
//Show detail of specific menu from cart
export const showMenuDetailFromCart = async (req: Request, res: Response) => {
    try {
        const userId =parseInt(req.params.userId) ;
        const mneuId=parseInt(req.params.menuId);
        const cartString = req.cookies.cart || '[]';
        const cart = JSON.parse(cartString);
        const userCart = cart.filter((item: any) => item.userId === userId && item.menuId===mneuId);
        res.status(200).json(userCart);
    }
    catch (e) {
        console.log(e);
    }
}
//for sets
export const showSetDetailFromCart = async (req: Request, res: Response) => {
    try {
        const userId =parseInt(req.params.userId) ;
        const setId=parseInt(req.params.setId);
        const cartString = req.cookies.cart || '[]';
        const cart = JSON.parse(cartString);
        const userCart = cart.filter((item: any) => item.userId === userId && item.setId===setId);
        res.status(200).json(userCart);
    }
    catch (e) {
        console.log(e);
    }
}
export const addCartToOrderDetailsOfDineIn = async (req: Request, res: Response) => {
    try{
        const userId = req.params.userId;
        const branchId = req.params.branchId;
        const venueId = req.params.venueId;
        const reservedId = req.params.reservationId;

        //get latest order id
        const latestOrder = await feature7Client.orders.findFirst({
            orderBy: {
              orderId: 'desc',
            },
          });
        const orderId = latestOrder?.orderId || 0;
        //create new orderId
        const newOrderId = orderId + 1;
        //create new order
        const newOrder = await feature7Client.orders.create({
            data: {
              orderId: newOrderId,
                userId: parseInt(userId),
                branchId: parseInt(branchId),
                reservedId: parseInt(reservedId),
                venueId: parseInt(venueId),
                order_date: new Date(),
                total_amount: 0,
                status: "On_going",
            },
          });
        const cartString = req.cookies.cart || '[]';
        const cart = JSON.parse(cartString);
        const userCart = cart.filter((item: any) => item.userId === parseInt(userId));
        //For menu
        const menuIds = userCart
        .filter((item) => item.menuId !== null) // Filter out null values
        .map((item) => parseInt(item.menuId));
        // console.log(menuIds);
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
                    orderId: newOrderId,
                    menuId: item.menuId,
                    unit_price: menu.find((menu) => menu.menuId === item.menuId)?.price,
                    setId: null,
                    quantity: item.quantity,
                    order_time: new Date(),
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
                    orderId: newOrderId,
                    setId: item.setId,
                    unit_price: set.find((set) => set.setId === item.setId)?.price,
                    menuId: null,
                    quantity: item.quantity,
                    order_time: new Date(),
                })),
        });
        //get all orderdetails of the order
        const orderDetailsOfOrder = await feature7Client.order_detail.findMany({
            where: {
                orderId: newOrderId,
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
                orderId: newOrderId,
            },
            data: {
                total_amount: totalAmount,
            },
        });
        //clear cart
        // res.clearCookie('userCart');
        res.status(200).json(orderDetailsOfOrder);
    }
    catch (e) {
        console.log(e);
    }
}
export const addCartToOrderDetailsOfTakeAway = async (req: Request, res: Response) => {
}

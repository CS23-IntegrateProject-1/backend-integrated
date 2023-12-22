import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import authService from "../services/auth/auth.service";
const feature4Client = new PrismaClient();

export const getUserId = async (req: any, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    if (decodedToken.userType != "user") {
      return res.status(401).json({ error: "This user is not customer user" });
    }

    res.status(200).json({ userId: userId });
  } catch (error) {
    console.error("Error Get UserId:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving location data" });
  }
};

export const saveTotal = async (req: Request, res: Response) => {
  try {
    const { total } = req.params; // Use req.params.total to get the total
    const userId = getUserId; // Note: You might want to call the getUserId function
    const userData = {
      userId: userId,
      totalValue: total,
    };
    res.cookie("totalCost", JSON.stringify(userData));
    res.status(200).json({ success: true, message: "Added to cookies" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//store location data in the database
export const mapsLocation = async (req: Request, res: Response) => {
  try {
    const { name, latitude, longtitude, address } = req.body;

    const savedLocation = await feature4Client.location.create({
      data: {
        name,
        latitude,
        longtitude,
        address,
      },
    });

    res.status(201).json({
      message: "Location data saved successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error saving location data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving location data" });
  }
};

export const GetAllMapsLocation = async (req: Request, res: Response) => {
  try {
    const savedLocation = await feature4Client.location.findMany({
      include: {
        Venue: true,
      },
    });

    res.status(201).json({
      message: "fetch data successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error fetching location data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetch location data" });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { locationId } = req.params;

    // Delete the Location record
    await feature4Client.location.delete({
      where: {
        locationId: parseInt(locationId),
      },
    });

    res.status(200).json({
      message: "Location deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting location:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting location" });
  }
};

//========================================================================store user saved location
export const saveUserLocation = async (req: Request, res: Response) => {
  try {
    const { name, address, province, district, subdistrict, postcode } =
      req.body;

    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    if (decodedToken.userType != "user") {
      return res.status(401).json({ error: "This user is not customer user" });
    }

    // Concatenate the address components into a single string

    const savedLocation = await feature4Client.userSaved_location.create({
      data: {
        userId: userId,
        name: name,
        address: address,
        province: province,
        district: district,
        sub_district: subdistrict,
        postcode: postcode,
        createdAt: new Date(),
      },
    });

    res.status(201).json({
      message: "User's saved location data saved successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error saving user's location data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving user's location data" });
  }
};

export const GetAllsaveUserLocation = async (req: Request, res: Response) => {
  try {
    const savedLocation = await feature4Client.userSaved_location.findMany();

    res.status(201).json({
      message: "User's saved location data fetch successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error fetching user's location data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user's location data" });
  }
};

export const GetUserLocationById = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    if (decodedToken.userType != "user") {
      return res.status(401).json({ error: "This user is not customer user" });
    }

    // const { savedLocId } = req.params; // Use params to get the savedLocId from the URL
    // const parsedSavedLocId = parseInt(savedLocId, 10);

    const savedLocation = await feature4Client.userSaved_location.findMany({
      where: {
        userId: userId,
        // savedLocId: parsedSavedLocId,
      },
    });

    res.status(201).json({
      message: "User's saved location data fetch successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error fetching user's location data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user's location data" });
  }
};

export const updateSavedLocation = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    if (decodedToken.userType != "user") {
      return res.status(401).json({ error: "This user is not customer user" });
    }
    const {
      savedLocId,
      name,
      address,
      province,
      district,
      subdistrict,
      postcode,
    } = req.body;

    const updatedLocation = await feature4Client.userSaved_location.update({
      where: {
        savedLocId: parseInt(savedLocId),
        userId: parseInt(userId),
      },
      data: {
        name: name,
        address: address,
        province: province,
        district: district,
        sub_district: subdistrict,
        postcode: postcode,
      },
    });

    res.status(200).json({
      message: "User's saved location data updated successfully",
      location: updatedLocation,
    });
  } catch (error) {
    console.error("Error updating user's location data:", error);
    res.status(500).json({
      error: "An error occurred while updating user's location data",
    });
  }
};

export const deleteSavedLocation = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    if (decodedToken.userType != "user") {
      return res.status(401).json({ error: "This user is not customer user" });
    }
    const { savedLocId } = req.params;

    await feature4Client.userSaved_location.delete({
      where: {
        savedLocId: parseInt(savedLocId),
        userId: parseInt(userId),
      },
    });

    res.status(200).json({
      message: "User's saved location data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user's location data:", error);
    res.status(500).json({
      error: "An error occurred while deleting user's location data",
    });
  }
};

//===========================================================get all restaurant

export const getAllRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurants = await feature4Client.venue.findMany({
      where: {
        category: {
          in: [
            "restaurant",
            "Restaurant",
            "Restaurants",
            "restaurants",
            "A LaCarte",
            "a la carte",
            "A la carte",
            "a La Carte",
          ],
        },
      },
      include: {
        Location: true, // Include the location related to each venue
      },
    });

    res.status(201).json({
      message: "restaurant data fetch successfully",
      restaurant: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching restaurant data" });
  }
};

//===========================================================get all bars
export const getAllBars = async (req: Request, res: Response) => {
  try {
    const bars = await feature4Client.venue.findMany({
      where: {
        category: {
          in: ["bar", "Bar", "Bars", "bars", "Club", "club", "Clubs", "clubs"],
        },
      },
      include: {
        Location: true, // Include the location related to each venue
      },
    });

    res.status(201).json({
      message: "bar data fetch successfully",
      bars: bars,
    });
  } catch (error) {
    console.error("Error fetching bar data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bar data" });
  }
};

//===========================================================get all cinemas
export const getAllCinema = async (req: Request, res: Response) => {
  try {
    const cinemas = await feature4Client.theaters.findMany();

    res.status(201).json({
      message: "cinemas data fetch successfully",
      cinemas: cinemas,
    });
  } catch (error) {
    console.error("Error fetching cinemas data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching cinemas data" });
  }
};

//===========================================================Online Orders

export const getBranchByVenueId = async (req: Request, res: Response) => {
  try {
    const venueId = req.params.venueId;
    const branchId = req.params.branchId;
    const branch = await feature4Client.venue_branch.findUnique({
      where: {
        branchId: parseInt(branchId),
        venueId: parseInt(venueId),
      },
      include: {
        
      }
    });

    const Venue = await feature4Client.venue.findUnique({
      where: {
        venueId: parseInt(venueId),
      },
    });

    const response = {
      venue: Venue,
      branch: branch,
    }
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
}

export const getMenusByVenueId = async (req: Request, res: Response) => {
  try {
    const venueId = req.params.venueId;
    const allMenus = await feature4Client.menu.findMany({
      where: {
        venueId: parseInt(venueId),
      },
    });

    res.status(200).json(allMenus);
  } catch (e) {
    console.log(e);
  }
};


export const getMenuById = async (req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    const menu = await feature4Client.menu.findUnique({
      where: {
        menuId: parseInt(menuId),
      },
    });
    return res.status(200).json(menu);
  } catch (e) {
    console.log(e);
  }
};


export const getPaymentMethods = async (req: Request, res: Response) => {
  try {
    // Get user ID from request parameters or authentication token
    const userId = req.params.userId; // adjust this based on your authentication method

    // Fetch payment methods for the user
    const paymentMethods = await feature4Client.payment_method.findMany({
      where: { userId: parseInt(userId) },
      include: { User: true },
    });

    res.status(200).json({
      message: "Payment methods fetched successfully",
      paymentMethods,
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching payment methods" });
  }
};

export const addItemToCookie = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const quantity = req.body.quantity;
    const name = req.body.name;
    const price = req.body.price;
    const itemId = req.params.itemId;

    // Retrieve existing cart from the 'cart' cookie or initialize an empty array
    const existingCartString = req.cookies.onlineOrderItemCart || "[]";
    let existingCart = JSON.parse(existingCartString);

    // Ensure that existingCart is an array
    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }

    console.log("existingCart:", existingCart);

    // Check if the menu item is already in the cart
    const updatedCart = existingCart.map((item) => {
      if (item.userId === userId && item.itemId === itemId) {
        // If the item is already in the cart, update the quantity
        return { ...item, quantity: quantity };
      }
      return item;
    });

    console.log("updatedCart:", updatedCart);

    // Add a new item if it's not in the cart
    if (
      !updatedCart.some(
        (item) => item.userId === userId && item.itemId === itemId
      )
    ) {
      updatedCart.push({
        userId: parseInt(userId),
        itemId: itemId,
        name: name,
        quantity: quantity,
        price: price,
      });
    }

    console.log("updatedCart after push:", updatedCart);

    // Remove the item if the quantity is 0
    const filteredCart = updatedCart.filter(
      (item) =>
        !(
          item.quantity === 0 &&
          item.userId === userId &&
          item.itemId === itemId
        )
    );

    console.log("filteredCart:", filteredCart);

    // If nothing in cart, delete the cookie
    if (filteredCart.length === 0) {
      res.clearCookie("cart");
    }

    // Update the 'cart' cookie with the modified cart
    res.cookie("onlineOrderItemCart", JSON.stringify(filteredCart));
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const showCart = async (req: any, res: Response) => {
  try {
    const userId = parseInt(req.userId);
    const cartString = req.cookies.onlineOrderItemCart || "[]";
    //console.log(cartString);
    const cart = JSON.parse(cartString);
    //console.log(cart);
    const userCart = cart.filter((item: any) => item.userId === userId);
    //console.log(userCart);
    res.status(200).json(userCart);
  } catch (e) {
    console.log(e);
  }
};


export const deleteMenuFromCookie = async (req: any, res: Response) => {
    try {
        const menuId = req.params.menuId;
        // Retrieve existing cart from the 'cart' cookie or initialize an empty array
        const existingCartString = req.cookies.onlineOrderItemCart || '[]';
        const existingCart = JSON.parse(existingCartString);

        // Check if the menu item is already in the cart
        // const existingCartItem = existingCart.find((item) => item.menuId === menuId);
        // existingCart.pop(existingCartItem);
        const updatedCart = existingCart.filter(item => item.menuId !== parseInt(menuId));
        // Update the 'cart' cookie with the modified cart
        res.cookie('onlineOrderItemCart', JSON.stringify(updatedCart));
        res.status(200).json({ success: true, message: 'Deleted menu from cart' });
    } catch (error) {
        console.log(error);
    }
}

export const getTotal = async (req: any, res: Response) => {
  try {
    // Retrieve the user's cart from the 'onlineOrderItemCart' cookie or initialize an empty array
    const cartString = req.cookies.onlineOrderItemCart || "[]";
    const cart = JSON.parse(cartString);

    // Ensure that cart is an array
    if (!Array.isArray(cart)) {
      throw new Error("Invalid cart data");
    }

    // Calculate the total by summing up the prices
    const total = cart.reduce((acc: number, item: any) => {
      return acc + item.quantity * item.price;
    }, 0);

    res.status(200).json(total);
  } catch (error) {
    console.error("Error calculating total:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteItemFromCart = async (req: any, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    const itemId = req.params.itemId;
    console.log(userId);
    console.log(itemId);
    // Retrieve the user's cart from the 'cart' cookie or initialize an empty array
    const existingCartString = req.cookies.onlineOrderItemCart || "[]";
    let existingCart = JSON.parse(existingCartString);

    // Ensure that existingCart is an array
    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }

    console.log("existingCart before removal:", existingCart);

    // Filter out the item to be removed
    const updatedCart = existingCart.filter(
      (item: any) => item.itemId != itemId
    );

    console.log("updatedCart:", updatedCart);

    // If nothing in cart, delete the cookie
    if (updatedCart.length === 0) {
      res.clearCookie("onlineOrderItemCart");
    } else {
      // Update the 'cart' cookie with the modified cart
      res.cookie("onlineOrderItemCart", JSON.stringify(updatedCart));
    }

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCartItemQuantity = async (req: any, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;
    const quantity = req.body.quantity;
    const itemId = req.params.itemId;

    // Retrieve existing cart from the 'onlineOrderItemCart' cookie or initialize an empty array
    const existingCartString = req.cookies.onlineOrderItemCart || "[]";
    let  existingCart = JSON.parse(existingCartString);

    // Ensure that existingCart is an array
    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }

    console.log("existingCart:", existingCart);

    // Check if the menu item is already in the cart
    const updatedCart = existingCart.map((item: any) => {
      if (item.userId === userId && item.itemId === itemId) {
        // If the item is already in the cart, update the quantity
        return { ...item, quantity: quantity };
      }
      return item;
    });

    console.log("updatedCart:", updatedCart);

    // Update the 'onlineOrderItemCart' cookie with the modified cart
    res.cookie("onlineOrderItemCart", JSON.stringify(updatedCart));
    res.status(200).json({ success: true, message: "Item quantity updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//totalCost
//{"totalValue":"1222"}
//%7B%22totalValue%22%3A%221222%22%7D

//onlineOrderItemCart
//[{"userId":2,"itemId":"38","name":"demo","quantity":1,"price":"222"},{"userId":2,"itemId":"25","name":"Win","quantity":1,"price":"1000"}]
//%5B%7B%22userId%22%3A2%2C%22itemId%22%3A%2225%22%2C%22name%22%3A%22Win%22%2C%22quantity%22%3A1%2C%22price%22%3A%221000%22%7D%2C%7B%22userId%22%3A2%2C%22itemId%22%3A%2238%22%2C%22name%22%3A%22demo%22%2C%22quantity%22%3A1%2C%22price%22%3A%22222%22%7D%5D




//for posting data from delivery address on checkout page
export const createOnlineOrder = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const venueId = req.body.venueId;
    const branchId = req.body.branchId;
    const address = req.body.address;
    const driverNote = req.body.driverNote;

    const findDriver = await feature4Client.driver_list.findFirst({
        where: {
          driver_status: "Available",
        }
    });

    const driverId = findDriver?.driverId;

    const cartString = req.cookies.onlineOrderItemCart || "[]";
    const cart = JSON.parse(cartString);
    const userCart = cart.filter((item: any) => item.userId === userId);

    const totalCostString = req.cookies.totalCost || '{"totalValue": "0"}';
    const totalCost = JSON.parse(totalCostString).totalValue;

    const newOrder = await feature4Client.online_orders.create({
      data: {
        userId: parseInt(userId),
        venueId: parseInt(venueId),
        order_date: new Date(),
        total_amount: parseFloat(totalCost),  
        address: address,
        branchId: parseInt(branchId),
        driverId: driverId??0,
        driver_note: driverNote,
        status: "On_going",
      },
    });

    console.log("this is new order "+ newOrder.onlineOrderId);
     const menuIds = userCart
            .filter((item) => item.itemId !== null) // Filter out null values
            .map((item) => parseInt(item.itemId));
        const menu = await feature4Client.menu.findMany({
            where: {
                menuId: {
                    in: menuIds.map((id) => parseInt(id))
                }
            }
        });
        console.log("Menu IDs:", menuIds);
        console.log("Menu:", menu);
        

        await feature4Client.online_orders_detail.createMany({
            data: userCart
                .filter((item) => item.itemId !== null) // Filter out null menuId values
                .map((item) => ({
                    onlineOrderId: newOrder.onlineOrderId,
                    menuId: (parseInt(item.itemId)),
                    unit_price: menu.find((menu) => menu.menuId === parseInt(item.itemId, 10))?.price,
                    quantity: parseInt(item.quantity),
                    order_time: new Date(),
                    status: "On_going",
                })),
        });

      const DriverStatus = await feature4Client.driver_list.update({
          where: {
           driverId: driverId,
          },data: {
            driver_status : "On_delivery",
          }
      });
      console.log("Driver Status: ", DriverStatus);
    
    res.clearCookie("onlineOrderItemCart");
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  }catch (e) {
    console.log(e);
  }
}

  export const getReceipt = async (req: any, res: Response) => {
    try {
        const orderId = req.body.onlineOrderId;
        const orderInfo = await feature4Client.online_orders.findUnique({
            where: {
                onlineOrderId: orderId,
            },          
        });
        const orderDetails = await feature4Client.online_orders_detail.findMany({
            where: {
                onlineOrderId: orderId,
            },
        });
        //menu name
        const menuIds = orderDetails
            .map((orderDetail) => orderDetail.menuId)
            .filter((menuId) => menuId !== null) as number[];
        const menu = await feature4Client.menu.findMany({
            where: {
                menuId: {
                    in: menuIds,
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
            const menuPrice = menu.find((menu) => menu.menuId === orderDetail.menuId)?.price;
            return {

                menuName: menuName,
                quantity: quantity,
                menuPrice: menuPrice,
            };
        });

        // Add calculated values to the response
        const finalResponse = {
            orderId: orderInfo?.onlineOrderId,
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

export const showOnGoingOrder = async (req: any, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    const allOrders = await feature4Client.online_orders.findMany({
      where: {
        userId: parseInt(userId),
        status: "On_going",
      },
      include: {
        Online_orders_detail: true,
        Driver_list: true,
        Venue_branch: true,
      },
    });
    res.status(200).json(allOrders);
  
} catch (e) {
  console.log(e);
}
}

export const showOnGoingOrderDetail = async (req: any, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const allOrders = await feature4Client.online_orders.findMany({
      where: {
        onlineOrderId: parseInt(orderId),
        status: "On_going",
      },
      include: {
        Online_orders_detail: true,
        Driver_list: true,
        Venue_branch: true,
      },
    });

    // Fetch menu names based on menuIds
    const menuIds = allOrders[0]?.Online_orders_detail.map(
      (orderDetail) => orderDetail.menuId
    );

    if (menuIds && menuIds.length > 0) {
      const menuData = await feature4Client.menu.findMany({
        where: {
          menuId: {
            in: menuIds,
          },
        },
      });

      // Map menu data to each order detail
      allOrders[0].Online_orders_detail.forEach((orderDetail: any) => {
        const menuInfo = menuData.find(
          (menu: any) => menu.menuId === orderDetail.menuId
        );
        if (menuInfo) {
          orderDetail.menuName = menuInfo.name;
        }
      });
    }

    res.status(200).json(allOrders[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const showCompletedOrder = async (req: any, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    const allOrders = await feature4Client.online_orders.findMany({
      where: {
        userId: parseInt(userId),
        status: "Completed",
      },
      include: {
        Online_orders_detail: true,
        Driver_list: true,
        Venue_branch: true, 
        
      },
    });
    res.status(200).json(allOrders);
  
} catch (e) {
  console.log(e);
}
}

export const showCompletedOrderDetail = async (req: any, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const allOrders = await feature4Client.online_orders.findMany({
      where: {
        onlineOrderId: parseInt(orderId),
        status: "Completed",
      },
      include: {
        Online_orders_detail: true,
        Driver_list: true,
        Venue_branch: true, 
        
      },
    });
     // Fetch menu names based on menuIds
     const menuIds = allOrders[0]?.Online_orders_detail.map(
      (orderDetail) => orderDetail.menuId
    );

    if (menuIds && menuIds.length > 0) {
      const menuData = await feature4Client.menu.findMany({
        where: {
          menuId: {
            in: menuIds,
          },
        },
      });

      // Map menu data to each order detail
      allOrders[0].Online_orders_detail.forEach((orderDetail: any) => {
        const menuInfo = menuData.find(
          (menu: any) => menu.menuId === orderDetail.menuId
        );
        if (menuInfo) {
          orderDetail.menuName = menuInfo.name;
        }
      });
    }
    res.status(200).json(allOrders[0]);
  }catch (e) {
      console.log(e);
    }
}

export const showCanceledOrder = async (req: any, res: Response) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "No auth token" });
    }
    const decodedToken = authService.decodeToken(token);
    const { userId } = decodedToken;

    const allOrders = await feature4Client.online_orders.findMany({
      where: {
        userId: parseInt(userId),
        status: "Canceled",
      },
      include: {
        Online_orders_detail: true,
        Driver_list: true,
        Venue_branch: true,
      },
    });
    res.status(200).json(allOrders);
  
} catch (e) {
  console.log(e);
}
}

export const showCanceledOrderDetail = async (req: any, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const allOrders = await feature4Client.online_orders.findMany({
      where: {
        onlineOrderId: parseInt(orderId),
        status: "Canceled",
      },
      include: {
        Online_orders_detail: true,
        Driver_list: true,
        Venue_branch: true, 
      },
    });
     // Fetch menu names based on menuIds
     const menuIds = allOrders[0]?.Online_orders_detail.map(
      (orderDetail) => orderDetail.menuId
    );

    if (menuIds && menuIds.length > 0) {
      const menuData = await feature4Client.menu.findMany({
        where: {
          menuId: {
            in: menuIds,
          },
        },
      });

      // Map menu data to each order detail
      allOrders[0].Online_orders_detail.forEach((orderDetail: any) => {
        const menuInfo = menuData.find(
          (menu: any) => menu.menuId === orderDetail.menuId
        );
        if (menuInfo) {
          orderDetail.menuName = menuInfo.name;
        }
      });
    }
    res.status(200).json(allOrders[0]);
  }catch (e) {
      console.log(e);
    }
}

export const changeOrderStatusCompleted = async (req: any, res: Response) => {
  try {
      console.log(req.body);
      const onlineOrderId = req.params.orderId;
      await feature4Client.online_orders.update({
          where: {
              onlineOrderId: onlineOrderId,
          },
          data: {
              status: "Completed",
          },
      });
      await feature4Client.online_orders_detail.updateMany({
        where: {
            onlineOrderId: onlineOrderId,
        },
        data: {
            status: "Completed",
        },
    });

    // await feature4Client.driver_list.update({
    //   where: {
    //       driverId: req.body.driverId,
    //   },
    //   data: {
    //       driver_status: "Available",
    //   },
    // });
      res.status(200).json({ success: true, message: 'Order status changed' });
  }
  catch (e) {
      console.log(e);
  }
}

export const changeOrderStatusCanceled = async (req: any, res: Response) => {
  try {

    const onlineOrderId = req.params.orderId;
    console.log("Received orderId:", onlineOrderId);

    const orderWithDriver = await feature4Client.online_orders.findUnique({
      where: {
        onlineOrderId: parseInt(onlineOrderId),
      },
      include: {
        Driver_list: true,
      },
    });

    const driverId = orderWithDriver?.Driver_list?.driverId;

    // Update driver status to "Available" if a driver is associated with the order
    if (driverId) {
      await feature4Client.driver_list.update({
        where: {
          driverId: driverId,
        },
        data: {
          driver_status: "Available",
        },
      });
    }

    // Update order status to "Canceled"
    await feature4Client.online_orders.update({
      where: {
        onlineOrderId: parseInt(onlineOrderId),
      },
      data: {
        status: "Canceled",
      },
    });

    // Update order details status to "Canceled"
    await feature4Client.online_orders_detail.updateMany({
      where: {
        onlineOrderId: parseInt(onlineOrderId),
      },
      data: {
        status: "Canceled",
      },
    });

    res.status(200).json({ success: true, message: 'Order status changed' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

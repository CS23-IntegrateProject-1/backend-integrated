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

export const getSetsByVenueId = async (req: Request, res: Response) => {
  try {
    const venueId = req.params.venueId;
    const allSets = await feature4Client.sets.findMany({
      where: {
        venueId: parseInt(venueId),
      },
    });

    res.status(200).json(allSets);
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

export const getSetById = async (req: Request, res: Response) => {
  try {
    const setId = req.params.id;
    const set = await feature4Client.sets.findUnique({
      where: {
        setId: parseInt(setId),
      },
    });
    return res.status(200).json(set);
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

export const checkMenuAvailability = async (req: Request, res: Response) => {
  try {
    const menuId = req.params.menuId;
    const venueId = req.params.venueId;
    const branchId = req.params.branchId;
    const stockRecord = await feature4Client.stocks.findFirst({
      where: {
        venueId: parseInt(venueId),
        branchId: parseInt(branchId),
        menuId: parseInt(menuId),
      },
    });

    return res.status(200).json(stockRecord?.availability);
  } catch (e) {
    console.error("Error checking stock availability:", e);
  }
};

export const checkSetAvailability = async (req: Request, res: Response) => {
  try {
    const setItems = await feature4Client.set_items.findMany({
      where: {
        setId: parseInt(req.params.setId),
      },
    });
    const menuIds = setItems.map((setItem) => setItem.menuId);
    const stockRecords = await feature4Client.stocks.findMany({
      where: {
        menuId: {
          in: menuIds,
        },
        venueId: parseInt(req.params.venueId),
        branchId: parseInt(req.params.branchId),
      },
    });
    return res
      .status(200)
      .json(stockRecords.every((stockRecord) => stockRecord.availability));
  } catch (e) {
    console.log(e);
  }
};

export const showOnGoingOrderDetails = async (req: any, res: Response) => {
  try {
    const userId = parseInt(req.userId);
    const venueId = parseInt(req.params.venueId);
    const orderId = await feature4Client.orders.findFirst({
      where: {
        userId: userId,
        venueId: venueId,
        // status: "On_going",
      },
    });
    const orderDetails = await feature4Client.order_detail.findMany({
      where: {
        orderId: orderId?.orderId,
        status: "On_going",
      },
    });
    if (orderDetails.length !== 0) {
      const menuDetails = await feature4Client.menu.findMany({
        where: {
          menuId: {
            in: orderDetails
              .map((orderDetail) => orderDetail.menuId)
              .filter((menuId) => menuId !== null) as number[],
          },
        },
      });
      const setDetails = await feature4Client.sets.findMany({
        where: {
          setId: {
            in: orderDetails
              .map((orderDetail) => orderDetail.setId)
              .filter((setId) => setId !== null) as number[],
          },
        },
      });
      const orderDetailsWithDetails = orderDetails.map((orderDetail) => {
        const menu = menuDetails.find(
          (menu) => menu.menuId === orderDetail.menuId
        );
        const set = setDetails.find((set) => set.setId === orderDetail.setId);

        return {
          ...orderDetail,
          menu: menu,
          set: set,
        };
      });
      return res.status(200).json(orderDetailsWithDetails);
    } else {
      res.status(404).json({ error: "No ongoing order found." });
    }
    // res.status(200).json(orderDetails);
  } catch (e) {
    console.log(e);
  }
};

export const showCompletedOrderDetails = async (req: any, res: Response) => {
  try {
    const userId = parseInt(req.userId);
    const venueId = parseInt(req.params.venueId);
    const orderId = await feature4Client.orders.findFirst({
      where: {
        userId: userId,
        venueId: venueId,
        // status: "Completed",
      },
    });
    const orderDetails = await feature4Client.order_detail.findMany({
      where: {
        orderId: orderId?.orderId,
        status: "Completed",
      },
    });
    if (orderDetails.length !== 0) {
      const menuDetails = await feature4Client.menu.findMany({
        where: {
          menuId: {
            in: orderDetails
              .map((orderDetail) => orderDetail.menuId)
              .filter((menuId) => menuId !== null) as number[],
          },
        },
      });
      const setDetails = await feature4Client.sets.findMany({
        where: {
          setId: {
            in: orderDetails
              .map((orderDetail) => orderDetail.setId)
              .filter((setId) => setId !== null) as number[],
          },
        },
      });
      const orderDetailsWithDetails = orderDetails.map((orderDetail) => {
        const menu = menuDetails.find(
          (menu) => menu.menuId === orderDetail.menuId
        );
        const set = setDetails.find((set) => set.setId === orderDetail.setId);

        return {
          ...orderDetail,
          menu: menu,
          set: set,
        };
      });
      return res.status(200).json(orderDetailsWithDetails);
    } else {
      res.status(404).json({ error: "No ongoing order found." });
    }
    // res.status(200).json(orderDetails);
  } catch (e) {
    console.log(e);
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

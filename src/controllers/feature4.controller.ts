import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const feature4Client = new PrismaClient();

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
    res.status(500).json({ error: "An error occurred while saving location data" });
  }
};

export const GetAllMapsLocation = async (req: Request, res: Response) => {
  try {
    const savedLocation = await feature4Client.location.findMany();

    res.status(201).json({
      message: "fetch data successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error fetching location data:", error);
    res.status(500).json({ error: "An error occurred while fetch location data" });
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
    res.status(500).json({ error: "An error occurred while deleting location" });
  }
};




//store user saved location
export const saveUserLocation = async (req: Request, res: Response) => {
  try {
    const {userId, name, address, province, district, subdistrict, postcode } = req.body;

    // Concatenate the address components into a single string
    const fullAddress = `${address} ${province} ${district} ${subdistrict} ${postcode}`;

    const savedLocation = await feature4Client.userSaved_location.create({
      data: {
        userId: parseInt(userId),
        name: name,
        address: fullAddress,
        createdAt: new Date(), 
      },
    });

    res.status(201).json({
      message: "User's saved location data saved successfully",
      location: savedLocation,
    });
  } catch (error) {
    console.error("Error saving user's location data:", error);
    res.status(500).json({ error: "An error occurred while saving user's location data" });
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
    res.status(500).json({ error: "An error occurred while fetching user's location data" });
  }
};

export const updateSavedLocation = async (req: Request, res: Response) => {
  try {
    const { savedLocId, userId, name, address, province, district, subdistrict, postcode } = req.body;

    const fullAddress = `${address} ${province} ${district} ${subdistrict} ${postcode}`;

    const updatedLocation = await feature4Client.userSaved_location.update({
      where: {
        savedLocId: parseInt(savedLocId),
        userId: parseInt(userId),
      },
      data: {
        name: name,
        address: fullAddress,
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
    const { savedLocId, userId } = req.params;

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
//get all restaurant

export const getAllRestaurant = async (req: Request, res: Response) => {
  try {

    const restaurants = await feature4Client.venue.findMany({
      where: {
        category: {
          in: ["restaurant", "Restaurant","Restaurants","restaurants","A LaCarte","a la carte","A la carte","a La Carte"]
        }
      }
    });
    

    res.status(201).json({
      message: "restaurant data fetch successfully",
      restaurant: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
    res.status(500).json({ error: "An error occurred while fetching restaurant data" });
  }
};

//get all bars
export const getAllBars = async (req: Request, res: Response) => {
  try {

    const bars = await feature4Client.venue.findMany({
      where: {
        category: {
          in: ["bar", "Bar","Bars","bars","Club","club","Clubs","clubs"]
        }
      }
    });
    

    res.status(201).json({
      message: "bar data fetch successfully",
      bars: bars,
    });
  } catch (error) {
    console.error("Error fetching bar data:", error);
    res.status(500).json({ error: "An error occurred while fetching bar data" });
  }
};



//get all cinemas
export const getAllCinema = async (req: Request, res: Response) => {
  try {

    const cinemas = await feature4Client.theaters.findMany();
    

    res.status(201).json({
      message: "cinemas data fetch successfully",
      cinemas: cinemas,
    });
  } catch (error) {
    console.error("Error fetching cinemas data:", error);
    res.status(500).json({ error: "An error occurred while fetching cinemas data" });
  }
};







//Online Orders

export const getMenusByVenueId = async (req: Request, res: Response) => {
  try {
      const venueId= req.params.venueId;
      const allMenus = await feature4Client.menu.findMany(
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
      const venueId= req.params.venueId;
      const allSets = await feature4Client.sets.findMany(
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
      const menu = await feature4Client.menu.findUnique(
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
      const set = await feature4Client.sets.findUnique(
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

export const addItemToCookie = async (req: Request) => {
  try {
    const quantity = req.body.quantity;
    const menuId = req.params.itemId;
    console.log(quantity);
    console.log(menuId);
    // Retrieve existing cart from the 'cart' cookie or initialize an empty array
    //   const existingCartString = req.cookies.cart || "[]";
    //   const existingCart = JSON.parse(existingCartString);
    //   // Check if the menu item is already in the cart
    //   const existingCartItemIndex = existingCart.findIndex(
    //     (item) => item.menuId === menu.menuId
    //   );
    //   if (
    //     existingCartItemIndex !== -1 &&
    //     userId == existingCart[existingCartItemIndex].userId
    //   ) {
    //     // If the item is already in the cart, update the quantity
    //     existingCart[existingCartItemIndex].quantity = quantity;
    //   } else {
    //     // If the item is not in the cart, add it
    //     existingCart.push({
    //       userId: parseInt(userId),
    //       menuId: menu.menuId,
    //       setId: null,
    //       name: menu.name,
    //       price: menu.price,
    //       quantity: quantity,
    //       image: menu.image,
    //       description: menu.description,
    //     });
    //   }
    //   // Remove the item if the quantity is 0
    //   if (quantity === 0) {
    //     existingCart.splice(existingCartItemIndex, 1);
    //   }
    //   // If nothing in the cart, delete the 'cart' cookie
    //   if (existingCart.length === 0) {
    //     res.clearCookie("cart");
    //   } else {
    //     // Update the 'cart' cookie with the modified cart
    //     res.cookie("cart", JSON.stringify(existingCart));
    //   }
    //   res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    //   console.log(error);
    //   res
    //     .status(500)
    //     .json({ success: false, message: "Failed to add item to cart" });
  }
};

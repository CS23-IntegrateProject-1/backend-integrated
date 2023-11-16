import { Router } from "express";

// here import your controllers(function)
import {
    getMenuById,
    getMenusByVenueId,
    getfeature7, 
    getSetsByVenueId,
    getSetById,
    checkMenuAvailability,
    checkSetAvailability,
    addMenuToCookie,
    showCart,
    addSetToCookie,
    addCartToOrderDetailsOfDineIn,
    showMenuDetailFromCart,
    showSetDetailFromCart,
    
} from "../controllers/feature7.controller";
import { customVerifyCookie } from "../middlewares/verifyCookies";

const feature7Router = Router();

// feature7Router.use("/addMenuToCookie/:userId/:menuId", customVerifyCookie );
// here define your routes
feature7Router.get("/", getfeature7);
//get all menus
feature7Router.get("/getMenusByVenueId/:id",getMenusByVenueId);
//get all sets
feature7Router.get("/getSetsByVenueId/:id",getSetsByVenueId);
//get menu by id
feature7Router.get("/getMenuById/:id",getMenuById);
//get set by id
feature7Router.get("/getSetById/:id",getSetById);
//check menu availability
feature7Router.get("/checkMenuAvailability/:menuId/:venueId/:branchId",checkMenuAvailability);
//check set availability
feature7Router.get("/checkSetAvailability/:setId/:venueId/:branchId",checkSetAvailability);
//add menu to cart
feature7Router.post("/addMenuToCookie/:menuId", addMenuToCookie);
//add set to cart
feature7Router.post("/addSetToCookie/:setId", customVerifyCookie, addSetToCookie);
//show cart of user
feature7Router.get("/showCart/:userId",showCart);
//Show menu detail from cart
feature7Router.get("/showMenuDetailFromCart/:userId/:menuId",showMenuDetailFromCart);
//Show set detail from cart
feature7Router.get("/showSetDetailFromCart/:userId/:setId",showSetDetailFromCart);
//add cart to order details
feature7Router.post("/addCartToOrderDetailsOfDineIn/:userId/:venueId/:branchId/:reservationId",addCartToOrderDetailsOfDineIn);

export default feature7Router;
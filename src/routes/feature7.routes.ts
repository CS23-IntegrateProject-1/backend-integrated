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
    showOnGoingOrderDetails,
    showCompletedOrderDetails,
    checkMenuAvailabilityOfAllBranches,
    changeMenuAvailability,
    editMenu,
    addMenu,
    addMenuItemsToSetsInCookies,
    showMenuItemsInCookies,
    addSetWithMenuItems,
    clearSetItemsInCookies,
    deleteMenu,
    deleteSet,
    deleteMenuItemFromSet,
    editSet,
    getMenuByVenueNotInSet,
    deleteMenuItemBeforeAddingToSet,
    showMenuItemsInSet,
} from "../controllers/feature7.controller";
import { customVerifyCookie } from "../middlewares/verifyCookies";
import { clear } from "console";
import { get } from "http";

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
feature7Router.post("/addMenuToCookie/:menuId", customVerifyCookie,addMenuToCookie);
//add set to cart
feature7Router.post("/addSetToCookie/:setId", customVerifyCookie,addSetToCookie);
//show cart of user
feature7Router.get("/showCart",customVerifyCookie,showCart);
//Show menu detail from cart
feature7Router.get("/showMenuDetailFromCart/:menuId",customVerifyCookie,showMenuDetailFromCart);
//Show set detail from cart
feature7Router.get("/showSetDetailFromCart/:setId",customVerifyCookie,showSetDetailFromCart);
//add cart to order details
feature7Router.post("/addCartToOrderDetailsOfDineIn/:venueId/",customVerifyCookie,addCartToOrderDetailsOfDineIn);
//show Ongoing Order details
feature7Router.get("/showOngoingOrderDetails/:venueId",customVerifyCookie,showOnGoingOrderDetails);
//show Completed Order details
feature7Router.get("/showCompletedOrderDetails/:venueId",customVerifyCookie,showCompletedOrderDetails);
//show availability of menu of all branches
feature7Router.get("/checkMenuAvailabilityOfAllBranches/:menuId/:venueId",checkMenuAvailabilityOfAllBranches);
//Change menu availability
feature7Router.post("/changeMenuAvailability/:menuId/:venueId/:branchId",changeMenuAvailability);
//edit menu
feature7Router.post("/editMenu/:menuId",editMenu);
//add menu
 feature7Router.post("/addMenu/:venueId",addMenu);
 //add menu to set (cookies)
feature7Router.post("/addMenuItemsToSetsInCookies",addMenuItemsToSetsInCookies);
//add menu to set (cookies) (route for edit set)
feature7Router.post("/addMenuItemsToSetsInCookies/:setId",addMenuItemsToSetsInCookies);
//show all set items in cookies
feature7Router.get("/showMenuItemsInCookies",showMenuItemsInCookies);
//show all set items in cookies (route for edit set)
feature7Router.get("/showMenuItemsInCookies/:setId",showMenuItemsInCookies);
//add set
feature7Router.post("/addSetWithMenuItems/:venueId",addSetWithMenuItems);
//clear set items in cookies by venueid
feature7Router.post("/clearSetItemsInCookies",clearSetItemsInCookies);
//clear set items in cookies by venueid (route for edit set)
feature7Router.post("/clearSetItemsInCookies/:setId",clearSetItemsInCookies);
//delete menu
feature7Router.delete("/deleteMenu/:menuId",deleteMenu);
//delete set
feature7Router.delete("/deleteSet/:setId",deleteSet);
//delete menu item from set
feature7Router.delete("/deleteMenuItemFromSet/:setId/:menuId",deleteMenuItemFromSet);
//edit set
feature7Router.post("/editSet/:venueId/:setId",editSet);
//get menu by venue which are not included in specific set
feature7Router.get("/getMenuByVenueIdNotInSet/:venueId/:setId",getMenuByVenueNotInSet);
//delete menu item before adding to set
feature7Router.post("/deleteMenuItemBeforeAddingToSet",deleteMenuItemBeforeAddingToSet);
//show menu items in set
feature7Router.get("/showMenuItemsInSet/:setId",showMenuItemsInSet);
export default feature7Router;

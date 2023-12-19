import { Router } from "express";

// here import your controllers(function)
import {
    getMenuById,
    getMenusByVenueId,
    getSetsByVenueId,
    getSetById,
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
    onGoingOrderDetailsInBusiness,
    completedOrderDetailsInBusiness,
    changeOrderDetailStatusCompleted,
    getReceipt,
    deleteMenuFromCookie,
    deleteSetFromCookie,
    getReservationId,
    addMenuMIK,
    getAllMenus,
    getAllSets,
    deleteMenuItemBeforeAddingToSetForEdit,
    cancelDeleteMenuItemFromSet,
    changeOrderStatus,
} from "../controllers/feature7.controller";
import { customVerifyCookie } from "../middlewares/verifyCookies";
import { businessVerifyCookie } from "../middlewares/businessVerifyCookies";
import { reservationMW } from "../middlewares/reservationMW";
const feature7Router = Router();

// feature7Router.use("/addMenuToCookie/:userId/:menuId", customVerifyCookie );
// here define your routes

//-------------------Customer-------------------//

feature7Router.get("/getReservationId",reservationMW, getReservationId);
//get all menus
feature7Router.get("/getMenusByVenueId",reservationMW,getMenusByVenueId);
//get all sets
feature7Router.get("/getSetsByVenueId",reservationMW,getSetsByVenueId);
//get menu by id
feature7Router.get("/getMenuById/:id",getMenuById);
//get set by id
feature7Router.get("/getSetById/:id",getSetById);
//add menu to cart
feature7Router.post("/addMenuToCookie/:menuId/", customVerifyCookie,reservationMW,addMenuToCookie);
//delete menu from cart
feature7Router.delete("/deleteMenuFromCookie/:menuId/",reservationMW,deleteMenuFromCookie);
//add set to cart
feature7Router.post("/addSetToCookie/:setId/", customVerifyCookie,reservationMW,addSetToCookie);
//delete set from cart
feature7Router.delete("/deleteSetFromCookie/:setId/",reservationMW,deleteSetFromCookie);
//show cart of user
feature7Router.get("/showCart",customVerifyCookie,reservationMW,showCart);
//Show menu detail from cart
feature7Router.get("/showMenuDetailFromCart/:menuId",customVerifyCookie,reservationMW,showMenuDetailFromCart);
//Show set detail from cart
feature7Router.get("/showSetDetailFromCart/:setId",customVerifyCookie,reservationMW,showSetDetailFromCart);
//add cart to order details
feature7Router.post("/addCartToOrderDetailsOfDineIn/",customVerifyCookie,reservationMW,addCartToOrderDetailsOfDineIn);
//show Ongoing Order details
feature7Router.get("/showOngoingOrderDetails/",customVerifyCookie,reservationMW,showOnGoingOrderDetails);
//show Completed Order details
feature7Router.get("/showCompletedOrderDetails/",customVerifyCookie,reservationMW,showCompletedOrderDetails);
//change order status
feature7Router.patch("/changeOrderStatus/",changeOrderStatus);
//-------------------Business-------------------//

//get all menus of venue
feature7Router.get("/getAllMenus/",businessVerifyCookie,getAllMenus);
//get all sets of venue
feature7Router.get("/getAllSets/",businessVerifyCookie,getAllSets);
//show availability of menu of all branches
feature7Router.get("/checkMenuAvailabilityOfAllBranches/:menuId/",businessVerifyCookie,checkMenuAvailabilityOfAllBranches);
//Change menu availability
feature7Router.post("/changeMenuAvailability/:menuId/:branchId",businessVerifyCookie,changeMenuAvailability);
//edit menu
feature7Router.post("/editMenu/:menuId",editMenu);
//add menu
 feature7Router.post("/addMenu/",businessVerifyCookie,addMenu);
 //add menu to set (cookies)
feature7Router.post("/addMenuItemsToSetsInCookies",addMenuItemsToSetsInCookies);
//add menu to set (cookies) (route for edit set)
feature7Router.post("/addMenuItemsToSetsInCookies/:setId",addMenuItemsToSetsInCookies);
//show all set items in cookies
feature7Router.get("/showMenuItemsInCookies",showMenuItemsInCookies);
//show all set items in cookies (route for edit set)
feature7Router.get("/showMenuItemsInCookies/:setId",showMenuItemsInCookies);
//add set
feature7Router.post("/addSetWithMenuItems/",businessVerifyCookie,addSetWithMenuItems);
//clear set items in cookies 
feature7Router.post("/clearSetItemsInCookies",clearSetItemsInCookies);
//clear set items in cookies (route for edit set)
feature7Router.post("/clearSetItemsInCookies/:setId",clearSetItemsInCookies);
//delete menu
feature7Router.delete("/deleteMenu/:menuId",deleteMenu);
//delete set
feature7Router.delete("/deleteSet/:setId",deleteSet);
//delete menu item from set
feature7Router.delete("/deleteMenuItemFromSet/:setId/:menuId",deleteMenuItemFromSet);
//cancel delete menu item from set
feature7Router.post("/cancelDeleteMenuItemFromSet/",cancelDeleteMenuItemFromSet);
//edit set
feature7Router.post("/editSet/:setId",businessVerifyCookie,editSet);
//get menu by venue which are not included in specific set
feature7Router.get("/getMenuByVenueIdNotInSet/:setId",businessVerifyCookie,getMenuByVenueNotInSet);
//delete menu item before adding to set
feature7Router.post("/deleteMenuItemBeforeAddingToSet",deleteMenuItemBeforeAddingToSet);
//delete menu item before adding to set for edit set
feature7Router.post("/deleteMenuItemBeforeAddingToSet/:setId",deleteMenuItemBeforeAddingToSetForEdit);
//show menu items in set
feature7Router.get("/showMenuItemsInSet/:setId",showMenuItemsInSet);
//show ongoing order in business
feature7Router.get("/onGoingOrderDetailsInBusiness/",businessVerifyCookie,onGoingOrderDetailsInBusiness);
//show ongoing order in business
feature7Router.get("/completedOrderDetailsInBusiness/",businessVerifyCookie,completedOrderDetailsInBusiness);
//change orderdetails status completed
feature7Router.post("/changeOrderDetailsStatusCompleted/:orderDetailId/",changeOrderDetailStatusCompleted);
//get receipt
feature7Router.get("/getReceipt/",reservationMW,customVerifyCookie,getReceipt);
feature7Router.post("/addMenuMIK",addMenuMIK)
export default feature7Router;

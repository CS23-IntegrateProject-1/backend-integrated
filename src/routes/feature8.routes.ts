import { Router } from "express";

// here import your controllers(function)
import {
    getAllUser,
    getUserById,
    getfeature8,
    getAllAdvertisements,
    getAdvertisementById,
    getAllNotification,
    getAllTransaction,
    getTransactionById,
    getAllApptransaction,
    getApptransactionById,
    getAllAppTransactiondetail,
    getAppTransactiondetailById,
    getAllTransactionDetails, 
    getTransactionDetailById ,
    getVenuetransaction,
    getVenuetransactionById,
    getVenuetransactiondetail,
    getVenuetransactiondetailById,
    getCreditCardById,
    getCreditCardByUserId,
    getVenueCreditCardByVenueId,
    getVenuePromptpayByVenueId,
    getOrderbyId,
    getOrderdetailByOrderId,
    getMenuByMenuId,
    getReservationByVenueId,
    getTableIdsByVenueId,
    getTableNosByVenueId,
    getTableNoByReservationId,
    createTransactionDetail,
    addCreditCard,
    addVenueCreditCard,
    addVenuePromptpay,
    updateCreditCard,
    updateVenueCreditCard,
    getAllApptransactionByVenueId,
    getApptransactiondetailByTransactionId,
    getAllNotificationReservation,
    getAllNotificationOrder,
    getAllNotificationAdBusiness,
    getNotiReservationByReserveId,
    getBusinessIdByVenueId,
    getBusinessIdByVenueIdForReal,
    getAdBusinessbyAdvertisementIdAndBusinessId
} from "../controllers/feature8.controller";


const feature8Router = Router();

// here define your routes
// get method
feature8Router.get("/", getfeature8);
feature8Router.get("/users", getAllUser); 
feature8Router.get("/user", getUserById);
feature8Router.get("/advertisements", getAllAdvertisements); 
feature8Router.get("/advertisements/:advertisementId", getAdvertisementById);
feature8Router.get("/notifications", getAllNotification);
 
feature8Router.get("/creditcardU/:userId", getCreditCardByUserId);
feature8Router.get("/creditcard/:creditCardId", getCreditCardById);
feature8Router.get("/venuecreditcard/:venueId", getVenueCreditCardByVenueId);
feature8Router.get("/venuepromptpay/:venueId", getVenuePromptpayByVenueId);
feature8Router.get("/orders/:orderId", getOrderbyId);
feature8Router.get("/orderdetail/:orderId", getOrderdetailByOrderId);
feature8Router.get("/menu/:menuId", getMenuByMenuId);
feature8Router.get("/reservation/:venueId",getReservationByVenueId);
feature8Router.get("/reservation/:venueId/findtableid", getTableIdsByVenueId);
feature8Router.get("/reservation/:venueId/findtableno", getTableNosByVenueId)
feature8Router.get("/reservation/:venueId/:reservationId", getTableNoByReservationId)
feature8Router.get("/notifications/reservation", getAllNotificationReservation);
feature8Router.get("/notifications/order", getAllNotificationOrder);
feature8Router.get("/notifications/advertisement", getAllNotificationAdBusiness);
feature8Router.get("/notifications/reservation/:reserveId",getNotiReservationByReserveId)
feature8Router.get("/notifications/advertisementbizId", getBusinessIdByVenueId)
feature8Router.get("/notifications/advertisementbizId/:venueId", getBusinessIdByVenueIdForReal)
feature8Router.get("/notifications/advertisement/:advertisementId/:businessId", getAdBusinessbyAdvertisementIdAndBusinessId)
    //customer -> admin?
feature8Router.get("/transactions", getAllTransaction);
feature8Router.get("/transactions/:transactionId", getTransactionById);
feature8Router.get("/transaction_details", getAllTransactionDetails); 
feature8Router.get("/transaction_details/:transactionId", getTransactionDetailById);
    //admin
feature8Router.get("/apptransactions", getAllApptransaction);
feature8Router.get("/apptransactions/:venueId", getAllApptransactionByVenueId);
feature8Router.get("/apptransactions/:apptransactionId", getApptransactionById); //doesn't work
feature8Router.get("/apptransaction_details", getAllAppTransactiondetail);
feature8Router.get("/apptransaction_details/:apptransactionId", getAppTransactiondetailById); //doesn't work
feature8Router.get("/apptransaction_details/bytransactionId/:transactionId", getApptransactiondetailByTransactionId); 
    //business
feature8Router.get("/venuetransactions", getVenuetransaction);
feature8Router.get("/venuetransactions/:venuetransactionId", getVenuetransactionById);
feature8Router.get("/venuetransaction_details", getVenuetransactiondetail);
feature8Router.get("/venuetransaction_details/:venuetransactionId", getVenuetransactiondetailById);

// feature8Router.get("/updateorder", ShowUpdateOrder);
    // post method
feature8Router.post("/create_transaction_detail", createTransactionDetail);
feature8Router.post("/add_creditcard", addCreditCard);
feature8Router.post("/add_venue_creditcard", addVenueCreditCard);
feature8Router.post("/add_venue_promptpay", addVenuePromptpay);

// patch method
feature8Router.patch("/update_creditcard/:creditCardId", updateCreditCard);
feature8Router.patch("/update_venue_creditcard/:venueId", updateVenueCreditCard);

export default feature8Router;
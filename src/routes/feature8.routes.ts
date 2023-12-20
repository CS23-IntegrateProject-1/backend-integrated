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
    getAllNotificationAdBusinessByBusinessId,
    getAllNotificationAdBusinessMain,
    getTransactionByVenueId,
    getTransactionDetailsByVenueId,
    getTransactionDetailsByVenueAndDate,
    getVenueByVenueId,
    getTransactionDetailByReservationIsPayForTable,
    getTransactionDetailsByVenueAndDateForReservation,
    checkTransactionDetailForOrder,
    getTransactionDetailsByVenueAndDateForOrder,
    getTransactionDetailForDelivery,
    getTransactionDetailsByVenueAndDateForDelivery,
    getTransactionReserveIdByVenueIdAndEqualToStatusCompleted,
    createCheckoutSession,
    createDepositSession,
    createSeatSessionnn,
    getTransactionReserveIdByVenueIdAndEqualToStatusCompletedAndFiltered,
    getReceipt,
    getOrderIdByAppTransactionDetailId
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
feature8Router.get("/notifications/advertisement/:advertisementId", getAllNotificationAdBusinessByBusinessId)
feature8Router.get("/business/adall", getAllNotificationAdBusinessMain)
    //customer -> admin?
feature8Router.get("/transactions", getAllTransaction);
feature8Router.get("/transactions/:transactionId", getTransactionById);
feature8Router.get("/transaction_details", getAllTransactionDetails); 
feature8Router.get("/transaction_details/:transactionId", getTransactionDetailById);
feature8Router.get("/transactionsbyvenueId/:venueId", getTransactionByVenueId);
feature8Router.get("/transactiondetailbyvenueId/:venueId", getTransactionDetailsByVenueId);
feature8Router.get("/transactiondetailbyvenueIdandTime/:venueId", getTransactionDetailsByVenueAndDate);
feature8Router.get("/getTransactionReserveIdByVenueIdAndEqualToStatusCompleted/:venueId", getTransactionReserveIdByVenueIdAndEqualToStatusCompleted)
feature8Router.get("/getTransactionReserveIdByVenueIdAndEqualToStatusCompletedAndFiltered/:venueId", getTransactionReserveIdByVenueIdAndEqualToStatusCompletedAndFiltered)


    //admin
feature8Router.get("/apptransactions", getAllApptransaction);
feature8Router.get("/apptransactions/:venueId", getAllApptransactionByVenueId);
feature8Router.get("/apptransactions/:apptransactionId", getApptransactionById); //doesn't work
feature8Router.get("/apptransaction_details", getAllAppTransactiondetail);
feature8Router.get("/apptransaction_details/:apptransactionId", getAppTransactiondetailById); //doesn't work
feature8Router.get("/apptransaction_details/bytransactionId/:transactionId", getApptransactiondetailByTransactionId); 
feature8Router.get("/venue/:venueId/getReservationForAdmin", getTransactionDetailByReservationIsPayForTable);
feature8Router.get("/venue/:venueId/getReservationForAdminFiltered", getTransactionDetailsByVenueAndDateForReservation);
feature8Router.get("/checkTransactionDetailForOrder/:venueId", checkTransactionDetailForOrder);
feature8Router.get("/getTransactionDetailsByVenueAndDateForOrder/:venueId", getTransactionDetailsByVenueAndDateForOrder);
feature8Router.get("/getTransactionDetailForDelivery/:venueId", getTransactionDetailForDelivery);
feature8Router.get("/getTransactionDetailsByVenueAndDateForDelivery/:venueId", getTransactionDetailsByVenueAndDateForDelivery);
feature8Router.get("/getReceipt/:orderId", getReceipt)
feature8Router.get("/getOrderIdByAppTransactionDetailId/:appTransactionDetailId", getOrderIdByAppTransactionDetailId);
    //business
feature8Router.get("/venuetransactions", getVenuetransaction);
feature8Router.get("/venuetransactions/:venuetransactionId", getVenuetransactionById);
feature8Router.get("/venuetransaction_details", getVenuetransactiondetail);
feature8Router.get("/venuetransaction_details/:venuetransactionId", getVenuetransactiondetailById);
feature8Router.get("/venue/:venueId", getVenueByVenueId);

// feature8Router.get("/updateorder", ShowUpdateOrder);
    // post method
feature8Router.post("/create_transaction_detail", createTransactionDetail);
feature8Router.post("/add_creditcard", addCreditCard);
feature8Router.post("/add_venue_creditcard", addVenueCreditCard);
feature8Router.post("/add_venue_promptpay", addVenuePromptpay);
feature8Router.post("/create-checkout-session", createCheckoutSession);
feature8Router.post("/create-deposit-session", createDepositSession);
feature8Router.post("/create-seat-session", createSeatSessionnn);

// patch method
feature8Router.patch("/update_creditcard/:creditCardId", updateCreditCard);
feature8Router.patch("/update_venue_creditcard/:venueId", updateVenueCreditCard);

export default feature8Router;
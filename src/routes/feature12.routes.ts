import { Router } from "express";

// here import your controllers(function)
import {
  displayAllGQuestions,
  displayAnswer,
  displayAllDistinctCategory,
  displayAllDistinctName,
  displayAllQuestionsWrtName,
  displayAnswerWrtVenueID,
  getAllUsers,
  getFriendList,
  forDialogflow,
  // fetchData,
} from "../controllers/feature12.controller";
import { customVerifyCookie } from "../middlewares/verifyCookies";

const feature12Router = Router();
//CRUD
// feature12Router.post("/create", createGAnswer);
// feature12Router.get("/read", getAllGeneralQuestions);
// feature12Router.put("/update/:id", updateGQuestion);
//feature12Router.delete("/deleteGQuestion/:id", deleteGQuestion);

//Displaying all Questions
feature12Router.get("/printAllQuestions", displayAllGQuestions);
feature12Router.get("/printAnswer/:id", displayAnswer);

//Display Distinct Category
feature12Router.get("/displayCategory", displayAllDistinctCategory);
//Display Distinct name wrt category
feature12Router.get("/displayName/:category", displayAllDistinctName);
//Display All question wrt name
feature12Router.get("/displayQuestion/:id", displayAllQuestionsWrtName);
//Display answer wrt question
feature12Router.get("/displayAnswer/:id", displayAnswerWrtVenueID);
//Get all user
feature12Router.get("/displayUser", getAllUsers);
//Get Friend List
feature12Router.get("/displayFriendList",customVerifyCookie, getFriendList);

//dialogflow route
feature12Router.post("/dialogflow", forDialogflow);
// feature12Router.get("/fetchData", fetchData);
export default feature12Router;
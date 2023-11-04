import { Router } from "express";

// here import your controllers(function)
import {
  createGAnswer,
  getAllGeneralQuestions,
  updateGQuestion,
  displayAllGQuestions,
  displayAnswer,
} from "../controllers/feature12.controller";

const feature12Router = Router();

// here define your routes
feature12Router.post("/create", createGAnswer);
feature12Router.get("/read", getAllGeneralQuestions);
feature12Router.put("/update/:id", updateGQuestion);
//feature12Router.delete("/deleteGQuestion/:id", deleteGQuestion);

//Displaying all Questions
feature12Router.get("/printAllQuestions", displayAllGQuestions);
feature12Router.get("/printAnswer/:id", displayAnswer);


export default feature12Router;
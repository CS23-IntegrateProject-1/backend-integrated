import { Router } from "express";

// here import your controllers(function)
import {
    createGQuestions,
    getAllGeneralQuestions,
  } from "../controllers/feature12.controller";
  
  const feature12Router = Router();
  
  // here define your routes
  feature12Router.post("/", createGQuestions);
  feature12Router.get("/", getAllGeneralQuestions);
  
  
  export default feature12Router;
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// here import your controllers(function)
import {
    getfeature11,
} from "../controllers/feature11.controller";

const feature11Router = Router();
const prisma = new PrismaClient();

// here define your routes
feature11Router.get("/", getfeature11);

//const getAllUsers = async (req: Request, res: Response) => {
//  try {
//    const allUsers = await prisma.venue.findMany();

//    res.json(allUsers);
//  } catch (error) {
//    console.error("Error retrieving all users:", error);
//    res.status(500).json({ error: "Internal server error" });
//  }
//};

const addArticle = async (req: Request, res: Response) => {
  try {
    const { topic, content, category, venueId, userId } = req.body;

    const newArticle = await prisma.article.create({
      data: {
        topic,
        content,
        category,
        venueId,
        userId,
      },
    });

    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
  };

feature11Router.post("/addarticle", addArticle);
//feature11Router.get("/getAllUsers", getAllUsers);

export default feature11Router;
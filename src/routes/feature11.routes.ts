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

// not 100% finish
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

const addComment = async (req: Request, res: Response) => {
  try {
    const { content, userId, articleId, isReply } = req.body;

    const newComment = await prisma.comments.create({
      data: {
        content,
        userId,
        articleId,
        isReply,
      },
    });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
  };

const getArticleDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        Image: true,
        Article_tags: {
          include: {
            tag: true,
          },
        },
        Like: true,
      },
    });

    if (!article) {
      res.json({ error: "Article not found" });
    } else {
      res.json(article);
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

// not 100% finish -> how to get comment like by creator?
const getArticleComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comments.findMany({
      where: { articleId: parseInt(id) },
    });

    if (!comment) {
      res.json({ error: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

const getAllArticle = async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.findMany({
      include: {
        Image: true,
        Article_tags: {
          include: {
            tag: true,
          },
        },
        Like: true,
      },
    });

    if (!article) {
      res.json({ error: "Article not found" });
    } else {
      res.json(article);
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

feature11Router.post("/addArticle", addArticle);
feature11Router.post("/writeComment", addComment);
feature11Router.get("/fetchAllArticle", getAllArticle);

//parameter = article id
feature11Router.get("/fetchArticleDetail/:id", getArticleDetail);
feature11Router.get("/fetchArticleComment/:id", getArticleComment);

//feature11Router.get("/getAllUsers", getAllUsers);

export default feature11Router;
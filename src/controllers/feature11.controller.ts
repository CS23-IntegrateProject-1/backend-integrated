import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const feature11Client = new PrismaClient();
const prisma = new PrismaClient();

enum Category {
    Review = "Review",
    Blog = "Blog",
    Question = "Question",
}

interface CustomJwtPayload extends JwtPayload {
  userId: number;
}

interface ArticleCreateInput {
    topic: string;
    content: string;
    category: Category;
    author_name: string;
    userId: number;
    venudId: number;
}

interface CommentCreateInput {
  content: string;
  userId: number;
  articleId: number;
}

interface ArticleFind {
  id: number;
}

//export const getfeature11 = async (req: Request, res: Response) => {
    
//};

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
export const addArticle = async (req: Request, res: Response) => {
  try {
    const article: ArticleCreateInput = req.body;
    const { topic, content, category, venueId, author_name } = article;
    const userId = 1;

    const newArticle = await prisma.article.create({
      data: {
        topic,
        content,
        category,
        userId,
        author_name,
      },
    });

    // ! waiting for venue_article table
    //const article_venue = await prisma.article.

    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};
  
export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, articleId } = req.body;
    const secret: Secret = 'fwjjpjegjwpjgwej' || "";
    const token = req.cookies.token;
    if (!token)
      return res.json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    const userId = decoded.userId;

    const newComment = await prisma.comments.create({
      data: {
        content,
        userId,
        articleId,
      },
    });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
  };
  
export const getArticleDetail = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  // ! waiting for venue_article table
  // ! join all of the venue that was mentioned in the article
  try {
    const article = await prisma.article.findUnique({
      where: { articleId: parseInt(articleId) },
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
  
// ! not 100% finish -> how to get comment like by creator?
export const getArticleComment = async (req: Request, res: Response) => {
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

// ! waiting for venue_article table
// ! join all of the venue that was mentioned in the article
export const getAllArticle = async (req: Request, res: Response) => {
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

// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };
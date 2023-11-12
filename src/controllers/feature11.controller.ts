import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const feature11Client = new PrismaClient();
const prisma = new PrismaClient();

// * TODO : 
// * edit article / comment, 
// * change keyword to link, 
// * get comment like by creator
// * add comment like by creator

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
  articleId: number;
}

interface LikeCreateInput {
  articleId: number;
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

// ! if it doesn't work then the problem is at decoding userId
// ! other than that is working fine (alr test in postman)
// ! still cannot add image
export const addArticle = async (req: Request, res: Response) => {
  try {
    const article: ArticleCreateInput = req.body;
    const { topic, content, category, author_name } = article;
    const venueIds: number[] = req.body.venueIds;
    const tags: string[] = req.body.tags;

    const userId = 1;
    //const secret: Secret = 'fwjjpjegjwpjgwej' || "";
    //const token = req.cookies.token;
    //if (!token)
    //  return res.json({ error: 'Unauthorized' });

    //const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    //const userId = decoded.userId;

    const newArticle = await prisma.article.create({
      data: {
        topic,
        content,
        category,
        userId,
        author_name,
      },
    });

    for (const venueId of venueIds) {
      await prisma.article_venue.create({
        data: {
          articleId: newArticle.articleId,
          venueId: venueId
        },
      });
    }

    for (const tag of tags) {
      const newTag = await prisma.tag.create({
        data: {
          tag_name: tag,
        }
      })

      await prisma.article_tags.create({
        data: {
          articleId: newArticle.articleId,
          tagId: newTag.tagId,
        },
      });
    }

    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

// ! need to add delete image later
export const deleteArticle = async (req: Request, res: Response) => {
  const { articleId } = req.body;

  try {
    await prisma.article_venue.deleteMany({
      where: { articleId: parseInt(articleId) },
    });

    await prisma.article_tags.deleteMany({
      where: { articleId: parseInt(articleId) },
    });

    await prisma.like.deleteMany({
      where: { articleId: parseInt(articleId) },
    });

    const deletedArticle = await prisma.article.delete({
      where: { articleId: parseInt(articleId) },
    });

    res.json(deletedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment: CommentCreateInput = req.body;
    const { content, articleId } = comment;
    const secret: Secret = 'fwjjpjegjwpjgwej' || "";
    const token = req.cookies.token;
    if (!token)
      return res.json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    const userId = decoded.userId;
    //const userId = 2;

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

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.body;

  try {
    const deletedComment = await prisma.comments.delete({
      where: { commentId: parseInt(commentId) },
    });

    res.json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
  
export const getArticleDetail = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  // ! like should only show the count not all information that who like this article?
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
        Article_venue: {
          include: {
            venue: true,
          }
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

export const getAllArticle = async (req: Request, res: Response) => {
  // ! like should only show the count not all information that who like this article?
  try {
    const article = await prisma.article.findMany({
      include: {
        Image: true,
        Article_tags: {
          include: {
            tag: true,
          },
        },
        Article_venue: {
          include: {
            venue: true,
          }
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

export const addLike = async (req: Request, res: Response) => {
  //const secret: Secret = 'fwjjpjegjwpjgwej' || "";
  //const token = req.cookies.token;
  //if (!token)
  //  return res.json({ error: 'Unauthorized' });

  //const decoded = jwt.verify(token, secret) as CustomJwtPayload;
  //const userId = decoded.userId;
  const userId = 2;
  
  const like: LikeCreateInput = req.body;
  const { articleId } = like;

  try {
    const newLike = await prisma.like.create({
      data: {
        articleId,
        userId
      }
    })

    res.json(newLike);
  }
  catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}

export const deleteLike = async (req: Request, res: Response) => {
  const like: LikeCreateInput = req.body;
  const { articleId } = like;
  
  const secret: Secret = 'fwjjpjegjwpjgwej' || "";
  const token = req.cookies.token;
  if (!token)
    return res.json({ error: 'Unauthorized' });

  const decoded = jwt.verify(token, secret) as CustomJwtPayload;
  const userId = decoded.userId;

  try {
    const deletedLike = await prisma.like.delete({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    });

    res.json(deletedLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getAllVenueName = async (req: Request, res: Response) => {
  try {
    const venue = await prisma.venue.findMany({
      select: {
        venueId: true,
        name: true
      },
    });

    if (!venue) {
      res.json({ error: "Venue not found" });
    } else {
      res.json(venue);
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
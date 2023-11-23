import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import authService from "../services/auth/auth.service";
//import { startOfDay, endOfDay } from 'date-fns';
//const feature11Client = new PrismaClient();
const prisma = new PrismaClient();

// * TODO : 
// * edit article 
// * change keyword to link, 
// * upload image with req.file

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
}

interface CommentCreateInput {
  content: string;
  articleId: number;
}

interface LikeCreateInput {
  articleId: number;
}

interface ImageInput {
  url: string;
  description: string;
  //articleId: number;
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

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { articleId, tagId } = req.body;

    const deletedTag = await prisma.article_tags.delete({
      where: {
        tagId_articleId: {
          tagId: tagId,
          articleId: articleId,
        },
      },
    });
    
    const tags = await prisma.article_tags.findMany({
      where: { tagId: tagId }
    })

    var deleteWholeTag
    if (tags.length === 0) {
      deleteWholeTag = await prisma.tag.delete({
        where: { tagId: tagId }
      })
    }

    const overAllDelteResult = {
      ...deletedTag,
      WholeTagDeleted: deleteWholeTag,
    };

    res.json(overAllDelteResult)
  }
  catch (error) {
    res.json(error);
  }
}

// ! if it doesn't work then the problem is at decoding userId
// ! other than that is working fine (alr test in postman)
export const addArticle = async (req: Request, res: Response) => {
  try {
    const article: ArticleCreateInput = req.body;
    const { topic, content, category, author_name } = article;
    const venueIds: number[] = req.body.venueIds;
    const tags: string[] = req.body.tags;
    const imageDetails: ImageInput[] = req.body.images;

    const token = req.cookies.authToken;
    if (!token) {
      return res.json({ error: "No auth token" })
    }
    const decodedToken = authService.decodeToken(token)
    const userId = decodedToken.userId;

    const newArticle = await prisma.article.create({
      data: {
        topic,
        content,
        category,
        userId,
        //userId: parseInt(Id),
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

    for (const imageDetail of imageDetails) {
      await prisma.images.create({
        data: {
          url: imageDetail.url,
          description: imageDetail.description,
          articleId: newArticle.articleId,
        },
      });
    }

    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

// ! haven't test
export const editArticle = async (req: Request, res: Response) => {
  try {
    //const article: ArticleCreateInput = req.body;
    const { articleId, topic, content, category, author_name } = req.body;
    const venueIds: number[] = req.body.venueIds;
    const tags: string[] = req.body.tags;
    const imageDetails: ImageInput[] = req.body.images;

    //const userId = 1;
    //const secret: Secret = 'fwjjpjegjwpjgwej' || "";
    //const token = req.cookies.token;
    //if (!token)
    //  return res.json({ error: 'Unauthorized' });

    //const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    //const userId = decoded.userId;

    const newArticle = await prisma.article.update({
      where: { articleId: parseInt(articleId) },
      data: {
        topic,
        content,
        category,
        author_name,
      },
    });

    await prisma.article_venue.deleteMany({
      where: { articleId: parseInt(articleId) }
    })

    for (const venueId of venueIds) {
      const newVenue = await prisma.article_venue.create({
        data: {
          articleId,
          venueId
        }
      })
    }

    await prisma.article_tags.deleteMany({
      where: { articleId: parseInt(articleId) }
    })

    for (const tag of tags) {
      const newTag = await prisma.tag.create({
        data: {
          tag_name: tag,
        }
      })

      await prisma.article_tags.create({
        data: {
          articleId,
          tagId: newTag.tagId,
        },
      });
    }

    await prisma.images.deleteMany({
      where: { articleId: parseInt(articleId) }
    })

    for (const imageDetail of imageDetails) {
      await prisma.images.create({
        data: {
          url: imageDetail.url,
          description: imageDetail.description,
          articleId,
        },
      });
    }

    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}

export const deleteArticle = async (req: Request, res: Response) => {
  const { articleId } = req.body;

  try {
    await prisma.article_venue.deleteMany({
      where: { articleId: parseInt(articleId) },
    });

    await prisma.images.deleteMany({
      where: { articleId: parseInt(articleId) },
    })

    await prisma.article_tags.deleteMany({
      where: { articleId: parseInt(articleId) },
    });

    await prisma.like.deleteMany({
      where: { articleId: parseInt(articleId) },
    });

    await prisma.comments.deleteMany({
      where: { articleId: parseInt(articleId) },
    })

    const deletedArticle = await prisma.article.delete({
      where: { articleId: parseInt(articleId) },
    });

    res.json(deletedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  const { imageId } = req.body;

  try {
    const deletedImage = await prisma.images.delete({
      where: { imageId: parseInt(imageId) },
    })

    res.json(deletedImage);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}

export const deleteVenue = async (req: Request, res: Response) => {
  const { articleId, venueId } = req.body;

  try {
    const deletedVenue = await prisma.article_venue.delete({
      where: { articleId_venueId: {
        articleId,
        venueId,
      }, }
    })

    res.json(deletedVenue);
  } catch (error) {
    console.error(error);
    res.json({ error: "internal server error" });
  }
}

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment: CommentCreateInput = req.body;
    const { content, articleId } = comment;
    const token = req.cookies.authToken;
    if (!token) {
      return res.json({ error: "No auth token" })
    }
    const decodedToken = authService.decodeToken(token)
    const userId = decodedToken.userId;

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

export const editComment = async (req: Request, res: Response) => {
  const { commentId, content } = req.body;

  try {
    const editedComment = await prisma.comments.update({
      where: { commentId: parseInt(commentId), },
      data: {
        content
      },
    })

    res.json(editedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getArticleDetail = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const article = await prisma.article.findUnique({
      where: { articleId: parseInt(articleId) },
      include: {
        Image: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            tag: {
              select: { tag_name: true }
            },
          },
        },
        Article_venue: {
          include: {
            venue: {
              select: { name: true }
            },
          }
        },
      },
    });

    const like = await prisma.like.findMany({
      where: {
        articleId: parseInt(articleId),
        userId: userId
      }
    })

    var isLike
    if (like.length === 0)
      isLike = false;
    else
      isLike = true;

    if (!article) {
      res.json({ error: "Article not found" });
    }

    const likeCount = await prisma.like.count({
      where: { articleId: parseInt(articleId) },
    });

    const commentCount = await prisma.comments.count({
      where: { articleId: parseInt(articleId) }
    })
  
    // Add the like count to the article object
    const articleWithLikeCount = {
      ...article,
      Like: likeCount,
      CommentCount: commentCount,
      isLike: isLike
    };
  
    res.json(articleWithLikeCount);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};
  
export const getArticleComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const newcomment = await prisma.comments.findMany({
      where: { articleId: parseInt(id) },
      include: {
        user: {
          select: {
            username: true,
            profile_picture: true
          }
        }
      }
    });

    const commentWithLikeBy = await Promise.all(
      newcomment.map(async (comment) => {
        const isLikeByCreator = await prisma.comment_like_by_creator.findUnique({
          where: { commentId_articleId: { commentId: comment.commentId, articleId: parseInt(id) }}
        })
  
        // Add the like count to each article object
        return {
          ...comment,
          isLikeByCreator: Boolean(isLikeByCreator)
        };
      })
    );

    if (!commentWithLikeBy) {
      res.json({ error: "Comment not found" });
    } else {
      res.json(commentWithLikeBy);
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

export const getAllArticle = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const articles = await prisma.article.findMany({
      include: {
        Image: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            venue: {
              select: { name: true }
            }
          },
        },
        user: {
          select: {
            username: true,
            profile_picture: true,
          }
        }
      },
    });
  
    if (articles.length === 0) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
  
    const articlesWithLikeCount = await Promise.all(
      articles.map(async (article) => {
        const likeCount = await prisma.like.count({
          where: { articleId: article.articleId },
        });

        const commentCount = await prisma.comments.count({
          where: { articleId: article.articleId }
        })

        const isLike = await prisma.like.findUnique({
          where: { articleId_userId: { articleId: article.articleId, userId } },
        });
  
        // Add the like count to each article object
        return {
          ...article,
          Like: likeCount,
          Comment: commentCount,
          isLike: Boolean(isLike)
        };
      })
    );
  
    res.json(articlesWithLikeCount);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

export const addLike = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;
  
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
  
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

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

export const getArticleHistory = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const articles = await prisma.article.findMany({
      where: { userId },
      include: {
        Image: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            venue: {
              select: { name: true }
            }
          },
        },
        user: {
          select: {
            username: true,
            profile_picture: true,
          }
        }
      },
    });
  
    if (articles.length === 0) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
  
    const articlesWithLikeCount = await Promise.all(
      articles.map(async (article) => {
        const likeCount = await prisma.like.count({
          where: { articleId: article.articleId },
        });

        const commentCount = await prisma.comments.count({
          where: { articleId: article.articleId }
        })

        const isLike = await prisma.like.findUnique({
          where: { articleId_userId: { articleId: article.articleId, userId } },
        })
  
        // Add the like count to each article object
        return {
          ...article,
          Like: likeCount,
          Comment: commentCount,
          isLike: Boolean(isLike)
        };
      })
    );
  
    res.json(articlesWithLikeCount);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

export const getUserArticle = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const articles = await prisma.article.findMany({
      where: { userId },
      include: {
        Image: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            venue: {
              select: { name: true }
            }
          },
        },
        user: {
          select: {
            username: true,
            profile_picture: true,
          }
        }
      },
    });
  
    if (articles.length === 0) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
  
    const articlesWithLikeCount = await Promise.all(
      articles.map(async (article) => {
        const likeCount = await prisma.like.count({
          where: { articleId: article.articleId },
        });

        const commentCount = await prisma.comments.count({
          where: { articleId: article.articleId }
        })

        const isLike = await prisma.like.findUnique({
          where: { articleId_userId: { articleId: article.articleId, userId } },
        })
  
        // Add the like count to each article object
        return {
          ...article,
          Like: likeCount,
          Comment: commentCount,
          isLike: Boolean(isLike)
        };
      })
    );
  
    res.json(articlesWithLikeCount);
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

export const getCommentHistory = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const comment = await prisma.comments.findMany({
      where: { userId }
    })

    res.json(comment)
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}

//interface Comment_like_by_creatorCreateInput {
//  commentId: number,
//  articleId: number
//}

export const CreatorLikeComment = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const { commentId } = req.body;
    
    const thisArticle = await prisma.comments.findUnique({
      where: { commentId },
      include: {
        article: {
          include: {
            user: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (thisArticle && thisArticle.article && thisArticle.article.user.userId === userId) {
      const articleId = thisArticle.articleId || 0; // Assign a default value if articleId is undefined
      const newLike = await prisma.comment_like_by_creator.create({
        data: {
          commentId,
          articleId,
        },
      });

      res.json("Like successful")
    }
    else {
      res.json("This is not the creator")
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

export const deleteCommentLikeByCreator = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const { commentId } = req.body;
    
    const thisArticle = await prisma.comments.findUnique({
      where: { commentId },
      include: {
        article: {
          include: {
            user: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (thisArticle && thisArticle.article && thisArticle.article.user.userId === userId) {
      const articleId = thisArticle.articleId || 0; // Assign a default value if articleId is undefined
      const deleteLike = await prisma.comment_like_by_creator.delete({
        where: { commentId_articleId: { commentId, articleId }}
      })

      res.json("Delete like successful")
    }
    else {
      res.json("This is not the creator")
    }
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
}
// example of controller getAllAuthors
// export const getAllAuthors = async (req: Request, res: Response) => {
//   try {
//     const allAuthors = await feature1Client.modelName.findMany({
//   } catch (e) {
//     console.log(e);
//   }
// };

//export const getCountPerDay = async (req: Request, res: Response) => {
//  try {
//      const { venueId } = req.params;
//      const today = new Date();
//      const startOfToday = startOfDay(today); // Gets the start of the current day
//      const endOfToday = endOfDay(today); // Gets the end of the current day

//      console.log(today)
//      console.log(startOfDay)
//      console.log(endOfDay)

//      const reservationsToday = await prisma.reservation.findMany({
//        where: {
//          AND: [
//            {
//              reserved_time: {
//                gte: startOfToday,
//                lte: endOfToday,
//              },
//              venueId: parseInt(venueId)
//            },
//          ],
//        },
//        include: {
//          Reservation_table: true,
//        },
//      });

//      let count = 0;
//      reservationsToday.forEach((reservation) => {
//        count += reservation.Reservation_table.length;
//      });

//      res.json(count)
//  } catch (e) {
//      return res.status(500).json(e);
//  }
//};

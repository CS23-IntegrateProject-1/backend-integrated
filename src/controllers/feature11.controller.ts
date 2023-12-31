import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import authService from "../services/auth/auth.service";
import { MulterFile } from "multer"

//const feature11Client = new PrismaClient();
const prisma = new PrismaClient();

enum Category {
    Review = "Review",
    Blog = "Blog",
    Question = "Question",
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

// ! use for uploading multiple image
// Create a custom type to extend Express's Request interface

declare module 'express-serve-static-core' {
  interface Request {
    files?: MulterFile[]; // Augment Request interface to include 'files' property
  }
}

export const addArticle = async (req: Request, res: Response) => {
  try {      
    const article: ArticleCreateInput = req.body;
    const { topic, content, category, author_name } = article;
    // แก้แค่ตรงนี้ เพราะ frontend มีปัญหาการส่งรูป เลยเปลียนรูปแบบการส่งข้อมูลมาอยู๋ใน formData แล้วมันส่ง number[] มาไม่ได้ เลยส่งเป็น string[] มาก่อน แล้วมา convert ในนี้
    const venueIds: number[] = req.body.venueIds.map((id: string) =>  parseInt(id, 10));
    const tags: string[] = req.body.tags;
    
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
    
    let newTag;
    for (const tag of tags) {
      newTag = await prisma.tag.create({
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

    //for (const imageDetail of imageDetails) {
    //  await prisma.images.create({
    //    data: {
      //      url: imageDetail.url,
      //      description: imageDetail.description,
          //      articleId: newArticle.articleId,
    //    },
    //  });
    //}

    // ! upload image
    const imageFiles = req.files as MulterFile[];

    //var newImage;
    for (const file of imageFiles) {
      let imagePath;
      if (file.path.includes("/"))
        imagePath = "/uploads/" + file.path.substring(file.path.lastIndexOf('/') + 1);
      else if (file.path.includes("\\"))
        imagePath = "/uploads/" + file.path.substring(file.path.lastIndexOf('\\') + 1);
      const description = file.originalname
      console.log("file path --> ", imagePath)
      const newImage = await prisma.images.create({
        data: {
          url: imagePath,
          description: description,
          articleId: newArticle.articleId,
        },
      });
      console.log("res --> ", newImage);
    }

    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
};

//interface ImageInput {
//  url: string,
//  description: string
//}

export const editArticle = async (req: Request, res: Response) => {
  try {
    const { articleId, topic, content, category, author_name } = req.body;
    const venueIds: string[] = req.body.venueIds;
    const tags: string[] = req.body.tags;
    //const imageDetails: ImageInput[] = req.body.images;

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

    let newVenue;
    for (const venueId of venueIds) {
      newVenue = await prisma.article_venue.create({
        data: {
          articleId: parseInt(articleId),
          venueId: parseInt(venueId)
        }
      })
    }

    await prisma.article_tags.deleteMany({
      where: { articleId: parseInt(articleId) }
    })

    let updatedTag
    for (const tag of tags) {
      let tagUse;
      // * if we already have that tag in tag db
      // * if not --> it's a new tag
      const thisTag = await prisma.tag.findMany({
        where: {
          tag_name: tag
        }
      })

      if (thisTag.length != 0) {
        // * if alr have that tag
        // * check whether tag is use by the other article
        tagUse = await prisma.article_tags.findMany({
          where: {
            tagId: thisTag[0].tagId
          }
        })

        if (tagUse.length === 0)
        {
          updatedTag = await prisma.tag.update({
            where: { tagId: thisTag[0].tagId },
            data: {
              tag_name: tag
            }
          })

          await prisma.article_tags.create({
            data: {
              articleId: parseInt(articleId),
              tagId: updatedTag.tagId,
            },
          })
        } else {
          await prisma.article_tags.create({
            data: {
              articleId: parseInt(articleId),
              tagId: thisTag[0].tagId,
            },
          })
        }
      }
      else {
        const TagDB = await prisma.tag.create({
          data: {
            tag_name: tag
          }
        })

        await prisma.article_tags.create({
          data: {
            articleId: parseInt(articleId),
            tagId: TagDB.tagId
          }
        })
      }
    }

    
    const imageFiles = req.files as MulterFile[];
    console.log(imageFiles)
    if (imageFiles.length !== 0) {
      await prisma.images.deleteMany({
        where: { articleId: parseInt(articleId) }
      })
    }
    let newImage;
    for (const file of imageFiles) {
      let imagePath;
      if (file.path.includes("/"))
        imagePath = "/uploads/" + file.path.substring(file.path.lastIndexOf('/') + 1);
      else if (file.path.includes("\\"))
        imagePath = "/uploads/" + file.path.substring(file.path.lastIndexOf('\\') + 1);
      const description = file.originalname
      newImage = await prisma.images.create({
        data: {
          url: imagePath,
          description: description,
          articleId: parseInt(articleId),
        },
      });
    }

    //for (const imageDetail of imageDetails) {
    //  newImage = await prisma.images.create({
    //    data: {
    //        url: imageDetail.url,
    //        description: imageDetail.description,
    //            articleId: newArticle.articleId,
    //    },
    //  });
    //}

    const editedArticle = {
      ...newArticle,
      venues: newVenue,
      tags: updatedTag,
      images: newImage
    };

    res.json(editedArticle);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
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
    res.status(400).json({ error: "Internal server error" });
  }
}

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
    
    let deleteWholeTag
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
    res.status(400).json({ error: "Internal server error" });
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
    res.status(400).json({ error: "Internal server error" });
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
        Images: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            Tag: {
              select: { tag_name: true }
            },
          },
        },
        Article_venue: {
          include: {
            Venue: {
              select: { 
                venueId: true,
                name: true }
            },
          }
        },
        User: {
          select: {
            username: true,
            profile_picture: true,
          }
        }
      },
    });

    const like = await prisma.like.findMany({
      where: {
        articleId: parseInt(articleId),
        userId: userId
      }
    })

    let isLike
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
    res.status(400).json({ error: "Internal server error" });
  }
};
  
export const public_getArticleDetail = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  try {
    const article = await prisma.article.findUnique({
      where: { articleId: parseInt(articleId) },
      include: {
        Images: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            Tag: {
              select: { tag_name: true }
            },
          },
        },
        Article_venue: {
          include: {
            Venue: {
              select: { 
                venueId: true,
                name: true }
            },
          }
        },
      },
    });

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
    };
  
    res.json(articleWithLikeCount);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
};

export const getArticleComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const newcomment = await prisma.comments.findMany({
      where: { articleId: parseInt(id) },
      include: {
        User: {
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
    res.status(400).json({ error: "Internal server error" });
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
        Images: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            Tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            Venue: {
              select: { 
                venueId: true,
                name: true }
            }
          },
        },
        User: {
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
    res.status(400).json({ error: "Internal server error" });
  }
};

export const public_getAllArticle = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        Images: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            Tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            Venue: {
              select: { 
                venueId: true,
                name: true }
            }
          },
        },
        User: {
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
  
        // Add the like count to each article object
        return {
          ...article,
          Like: likeCount,
          Comment: commentCount,
        };
      })
    );
  
    res.json(articlesWithLikeCount);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
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
    res.status(400).json({ error: "Internal server error" });
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
    res.status(400).json({ error: "Internal server error" });
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
        Images: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            Tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            Venue: {
              select: { 
                venueId: true,
                name: true }
            }
          },
        },
        User: {
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
    res.status(400).json({ error: "Internal server error" });
  }
};

export const getUserArticle = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const thisUserId = decodedToken.userId;

  try {
    const { userId } = req.body;
    const articles = await prisma.article.findMany({
      where: { userId },
      include: {
        Images: {
          select: {
            url: true,
            description: true
          }
        },
        Article_tags: {
          include: {
            Tag: {
              select: {
                tag_name: true
              }
            },
          },
        },
        Article_venue: {
          include: {
            Venue: {
              select: { 
                venueId: true,
                name: true }
            }
          },
        },
        User: {
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
          where: { articleId_userId: { articleId: article.articleId, userId: thisUserId } },
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
    res.status(400).json({ error: "Internal server error" });
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
      where: { userId },
      include: {
        Article: {
          select: { topic: true }
        },
        User: {
          select: {
            username: true,
            profile_picture: true
          }
        }
      }
    })

    res.json(comment)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}

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
        Article: {
          include: {
            User: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (thisArticle && thisArticle.Article && thisArticle.Article.User.userId === userId) {
      const articleId = thisArticle.articleId || 0; // Assign a default value if articleId is undefined
      await prisma.comment_like_by_creator.create({
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
    res.status(400).json({ error: "Internal server error" });
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
        Article: {
          include: {
            User: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (thisArticle && thisArticle.Article && thisArticle.Article.User.userId === userId) {
      const articleId = thisArticle.articleId || 0; // Assign a default value if articleId is undefined
      await prisma.comment_like_by_creator.delete({
        where: { commentId_articleId: { commentId, articleId }}
      })

      res.json("Delete like successful")
    }
    else {
      res.json("This is not the creator")
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}

//-----------------------saved place---------------------------------------

export const getUserSavedPlace = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const savedPlace = await prisma.saved_place.findMany({
      where: { userId },
      include: {
        Venue: {
          select: {
            name: true,
            description: true,
            category: true,
            capacity: true,
            chatRoomId: true,
            Location: true,
            website_url: true,
            venue_picture: true,
          }
        }
      }})

      const venueRating = await Promise.all(
        savedPlace.map(async (save) => {
          const rate = await prisma.venue_branch.findMany({
            where: { venueId: save.venueId },
            include: {
              Venue_reviews: {
                select: {
                  rating: true,
                }
              }
            }
            })
    
            const allRatings = rate.flatMap((item) =>
            item.Venue_reviews.map((review) => review.rating)
          );
      
          // Calculating the average rating
          const sum = allRatings.reduce((acc, val) => acc + val, 0);
          const averageRating = sum / allRatings.length;
          const formattedRating = parseFloat(averageRating.toFixed(2));
          return {
            ...save,
            rating: formattedRating
          };
        })
      );

    res.json(venueRating)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}

export const CreateSavedPLace = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const { venueId } = req.body;

    const savedPlace = await prisma.saved_place.create({
      data: {
        userId,
        venueId: parseInt(venueId)
      }
    })

    res.json(savedPlace)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}

export const DeleteSavedPlace = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ error: "No auth token" })
  }
  const decodedToken = authService.decodeToken(token)
  const userId = decodedToken.userId;

  try {
    const { venueId } = req.body;

    const savedId = await prisma.saved_place.findFirst({
      where: {
        userId: userId,
        venueId: parseInt(venueId)
      }
    })

    let deletedPlace
    if (savedId?.id && typeof savedId.id === 'number') {
      deletedPlace = await prisma.saved_place.delete({
        where: {
          id: savedId.id
        },
      });
    }
        
    res.json(deletedPlace)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}
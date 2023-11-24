import { Router, Request, Response } from "express";

// here import your controllers(function)
import {
    //getfeature11
    addArticle,
    getAllArticle,
    addComment,
    getArticleDetail,
    getArticleComment,
    addLike,
    deleteArticle,
    deleteComment,
    deleteLike,
    getAllVenueName,
    editComment,
    deleteImage,
    deleteVenue,
    deleteTag,
    getArticleHistory,
    CreatorLikeComment,
    deleteCommentLikeByCreator,
    getUserArticle,
    getCommentHistory,
    public_getAllArticle,
    public_getArticleDetail
} from "../controllers/feature11.controller";
import feature1Router from "./feature1.routes";

const feature11Router = Router();

// here define your routes
// feature11Router.get("/", getfeature11);

// * POST
feature11Router.post("/addArticle", addArticle);
//feature11Router.post("/addArticle/:Id", addArticle);
feature11Router.post("/writeComment", addComment);
feature11Router.post("/addLike", addLike);
feature11Router.post("/addCommentByCreator", CreatorLikeComment)
feature11Router.post("/fetchUserArticle", getUserArticle)

// * DELETE
feature11Router.delete("/deleteArticle", deleteArticle);
feature11Router.delete("/deleteComment", deleteComment);
feature11Router.delete("/deleteLike", deleteLike);
feature11Router.delete("/deleteImage", deleteImage);
feature11Router.delete("/deleteVenue", deleteVenue);
feature11Router.delete("/deleteTag", deleteTag);
feature11Router.delete("/deleteCommentLikeByCreator", deleteCommentLikeByCreator)

// * UPDATE
feature11Router.patch("/editComment", editComment);

// * READ
feature11Router.get("/fetchAllArticle", getAllArticle);
feature11Router.get("/fetchAllArticle_nologin", public_getAllArticle);
feature11Router.get("/fetchAllVenueName", getAllVenueName);
feature11Router.get("/fetchArticleHistory", getArticleHistory)
feature11Router.get("/fetchCommentHistory", getCommentHistory)

// parameter = article id
feature11Router.get("/fetchArticleDetail/:articleId", getArticleDetail);
feature11Router.get("/fetchArticleDetail_nologin/:articleId", public_getArticleDetail);
feature11Router.get("/fetchArticleComment/:id", getArticleComment);

//feature11Router.get("/getAllUsers", getAllUsers);

export default feature11Router;
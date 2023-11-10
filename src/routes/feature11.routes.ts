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
    deleteLike
} from "../controllers/feature11.controller";

const feature11Router = Router();

// here define your routes
//feature11Router.get("/", getfeature11);

feature11Router.post("/addArticle", addArticle);
feature11Router.post("/writeComment", addComment);
feature11Router.post("/addLike", addLike);
feature11Router.delete("/deleteArticle", deleteArticle);
feature11Router.delete("/deleteComment", deleteComment);
feature11Router.delete("/deleteLike", deleteLike);
feature11Router.get("/fetchAllArticle", getAllArticle);

//parameter = article id
feature11Router.get("/fetchArticleDetail/:articleId", getArticleDetail);
feature11Router.get("/fetchArticleComment/:id", getArticleComment);

//feature11Router.get("/getAllUsers", getAllUsers);

export default feature11Router;
import { Router, Request, Response } from "express";

// here import your controllers(function)
import {
    //getfeature11
    addArticle,
    getAllArticle,
    addComment,
    getArticleDetail,
    getArticleComment
} from "../controllers/feature11.controller";

const feature11Router = Router();

// here define your routes
//feature11Router.get("/", getfeature11);

feature11Router.post("/addArticle", addArticle);
feature11Router.post("/writeComment", addComment);
feature11Router.get("/fetchAllArticle", getAllArticle);

//parameter = article id
feature11Router.get("/fetchArticleDetail/:id", getArticleDetail);
feature11Router.get("/fetchArticleComment/:id", getArticleComment);

//feature11Router.get("/getAllUsers", getAllUsers);

export default feature11Router;
import express from "express";
import {getHashtags, getPostsFromHashtag} from "../controllers/hashtagsController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js";

const router = express.Router();

router.get('/hashtags', isAuthenticated, getHashtags);
router.get('/hashtag/:hashtag', isAuthenticated, getPostsFromHashtag);

export default router;
import express from "express";
import {getHashtags, getPostFromHashtag} from "../controllers/hashtagsController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js";

const router = express.Router();

router.get('/hashtags', getHashtags);
//router.get('/hashtags', isAuthenticated, getHashtags);
router.get('hashtag/:hashtag', getPostFromHashtag);
//router.get('hashtags/:hashtags', isAuthenticated, getPostFromHashtag);

export default router;
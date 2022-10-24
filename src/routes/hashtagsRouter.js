import express from "express";
import {getHashtags, getPostsFromHashtag, newHashtag, postHashtagId} from "../controllers/hashtagsController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js";

const router = express.Router();

router.get('/hashtags', isAuthenticated, getHashtags);
router.get('/hashtag/:hashtag', isAuthenticated, getPostsFromHashtag);
router.post('/hashtags', isAuthenticated, newHashtag);
router.post('/postHashtag', isAuthenticated, postHashtagId)

export default router;
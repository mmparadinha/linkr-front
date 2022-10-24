import express from "express";
import {getHashtags, getPostsFromHashtag, newHashtag, postHashtagId} from "../controllers/hashtagsController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js";

const router = express.Router();

router.get('/hashtags', getHashtags);
router.get('/hashtag/:hashtag', getPostsFromHashtag);
router.post('/hashtags', newHashtag);
router.post('/postHashtag', postHashtagId)

export default router;
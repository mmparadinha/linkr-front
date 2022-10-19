import { Router } from "express";
import { getPosts, newPost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get('/timeline', getPosts);
postsRouter.post('/timeline', newPost);

export default postsRouter;
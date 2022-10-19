import { Router } from "express";
import { getPosts, newPost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get('/posts', getPosts);
postsRouter.post('/posts', newPost);

export default postsRouter;
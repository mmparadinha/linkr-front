import { Router } from "express";
import { getPosts, newPost } from "../controllers/postsController.js";
import { hasUser } from "../middlewares/linkrMiddlewares.js";

const postsRouter = Router();

postsRouter.use(hasUser);

postsRouter.get('/timeline', getPosts);
postsRouter.post('/timeline', newPost);

export default postsRouter;
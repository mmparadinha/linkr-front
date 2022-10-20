import { Router } from "express";
import { getPosts, newPost } from "../controllers/postsController.js";
import { hasUser, isAuthenticated } from "../middlewares/linkrMiddlewares.js";

const postsRouter = Router();

// postsRouter.use(isAuthenticated);
// postsRouter.use(hasUser);

postsRouter.get('/timeline', getPosts);
postsRouter.post('/timeline', newPost);

export default postsRouter;
import { Router } from "express";
import { hasUser, isAuthenticated } from "../middlewares/linkrMiddlewares.js";
import {
  getPosts,
  deletePost,
  newPost,
} from "../controllers/postsController.js";

const postsRouter = Router();
postsRouter.use(isAuthenticated);
postsRouter.use(hasUser);

postsRouter.get("/timeline", getPosts);
postsRouter.post("/timeline", newPost);
postsRouter.delete("/timeline/post/delete/:id", deletePost);

export default postsRouter;

import { Router } from "express";
import { hasUser, isAuthenticated } from "../middlewares/linkrMiddlewares.js";
import { validaEditPost } from "../middlewares/validationEditPost.js";
import {
  getPosts,
  deletePost,
  newPost,
  updatePost,
} from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/timeline", getPosts);
postsRouter.delete("/timeline/post/delete/:id", deletePost);
postsRouter.put("/timeline/post/edit/:id", validaEditPost, updatePost);

postsRouter.use(isAuthenticated);
postsRouter.use(hasUser);

postsRouter.post("/timeline", newPost);

export default postsRouter;

import { Router } from "express";
import { hasUser, isAuthenticated } from "../middlewares/linkrMiddlewares.js";
import {
  validaEditPost,
  validaComment,
} from "../middlewares/validationEditPost.js";
import {
  getPosts,
  deletePost,
  newPost,
  updatePost,
  countNewPosts,
  postComment,
} from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.use(isAuthenticated);
postsRouter.use(hasUser);

postsRouter.get("/timeline", getPosts);
postsRouter.delete("/timeline/post/delete/:id", deletePost);
postsRouter.put("/timeline/post/edit/:id", validaEditPost, updatePost);
postsRouter.get("/timeline/update", countNewPosts);
postsRouter.post("/timeline", newPost);
postsRouter.post(
  "/timeline/post/comment/:postId/:userId",
  validaComment,
  postComment
);

export default postsRouter;

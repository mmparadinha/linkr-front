import { Router } from "express";
import {
  getPosts,
  newPost,
  deletePost,
} from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/timeline", getPosts);
postsRouter.post("/timeline", newPost);
postsRouter.delete("/timeline/post/delete/:id", deletePost);

export default postsRouter;

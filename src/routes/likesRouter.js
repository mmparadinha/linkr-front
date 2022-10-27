import { Router } from "express";
import { likeAndUnlike, getLikes, likesCounter } from "../controllers/likesController.js";
import { isAuthenticated } from "../middlewares/linkrMiddlewares.js"

const likesRouter = Router();

likesRouter.post('/likes/:postId', isAuthenticated, likeAndUnlike);
likesRouter.get('/likes/:postId', isAuthenticated, getLikes);
likesRouter.get("/likes/count/:postId", likesCounter);
// likesRouter.get("/likes/names/:postId", isAuthenticated, getLikeNames);

export default likesRouter;
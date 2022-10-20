import { Router } from "express";
import { likeAndUnlike } from "../controllers/likesController.js";
import { isAuthenticated } from "../middlewares/linkrMiddlewares.js"

const likesRouter = Router();

likesRouter.post('/likes/:postId', isAuthenticated, likeAndUnlike);
// likesRouter.get('/likes/:postId', getLikes);
// router.get("/likes/count/:postId", validateParam, getCountLikes);
// router.get("/likes/names/:postId", tokenValidator, validateParam, getLikeNames);

export default likesRouter;
import { Router } from "express";
import { getUserLinkrs, isFollowed, startFollowing, stopFollowing} from "../controllers/userController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js"

const userRouter = Router();

userRouter.get('/user/:id', getUserLinkrs);
userRouter.get('/followers/:followedId', isAuthenticated, isFollowed);
userRouter.post('/followers/:followedId', isAuthenticated, startFollowing);
userRouter.delete('/followers/:followedId', isAuthenticated, stopFollowing);

export default userRouter;
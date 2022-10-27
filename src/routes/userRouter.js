import { Router } from "express";
import { getUserData, isFollowed, startFollowing, stopFollowing} from "../controllers/userController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js"

const userRouter = Router();

userRouter.get('/user/:id', isAuthenticated, getUserData);
userRouter.get('/followers/:followedId', isAuthenticated, isFollowed);
userRouter.post('/followers/:followedId', isAuthenticated, startFollowing);
userRouter.delete('/followers/:followedId', isAuthenticated, stopFollowing);

export default userRouter;
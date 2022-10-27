import { Router } from "express";
import { getUserLinkrs, isFollowed, startFollowing, stopFollowing} from "../controllers/userController.js";
import {isAuthenticated} from "../middlewares/linkrMiddlewares.js"

const userRouter = Router();

userRouter.get('/user/:id', getUserLinkrs);
userRouter.get('/followers/:followedId', isAuthenticated, isFollowed); //checar se um usuário segue o outro
userRouter.post('/followers/:followedId', isAuthenticated, startFollowing); //começar a seguir o usuario
userRouter.delete('/followers/:followedId', isAuthenticated, stopFollowing);

export default userRouter;
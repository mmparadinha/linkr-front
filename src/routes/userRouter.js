import { Router } from "express";
import { getUserData } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/linkrMiddlewares.js";

const userRouter = Router();

userRouter.get('/user/:id', isAuthenticated, getUserData);

export default userRouter;

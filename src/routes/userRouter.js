import { Router } from "express";
import { getUserLinkrs } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/user/:id', getUserLinkrs);

export default userRouter;

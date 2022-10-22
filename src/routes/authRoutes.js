import express from 'express';
import { signupPost } from '../controllers/signupControlls.js';
import { loginPost } from '../controllers/loginController.js';

const authRouter = express.Router();

authRouter.post("/signup", signupPost);
authRouter.post("/", loginPost);

export default authRouter;
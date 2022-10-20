import express from 'express';
import { signupPost } from '../controllers/signupControlls.js';
import { loginPost } from '../controllers/loginController.js';

const router = express.Router();

router.post("/signup", signupPost);
router.post("/", loginPost);


export { router };
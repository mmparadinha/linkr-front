import express from 'express';
import { signupPost } from '../controllers/signupControlls.js';

const router = express.Router();

router.post("/signup", signupPost);
router.post("/");


export { router };
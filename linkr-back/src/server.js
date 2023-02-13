import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoutes.js'
import postsRouter from './routes/postsRouter.js';
import searchRouter from './routes/searchRouter.js';
import likesRouter from './routes/likesRouter.js';
import hashtagsRouter from './routes/hashtagsRouter.js';
import userRouter from "./routes/userRouter.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

// auth
server.use(authRouter);

// likes
server.use(likesRouter);

// posts
server.use(postsRouter);

//user page
server.use(userRouter);

// hashtags
server.use(hashtagsRouter);

//search
server.use(searchRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}.`);
});

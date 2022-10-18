import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';
import urlsRouter from './routes/urlsRouter.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(usersRouter);
server.use(urlsRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}.`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/authRoutes.js'

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.unsubscribe(router);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}.`);
});
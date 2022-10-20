import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import postsRouter from "./routes/postsRouter.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

// auth
server.use(authRouter);
// posts
server.use(postsRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}.`);
});

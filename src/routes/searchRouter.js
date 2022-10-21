import { Router } from "express";
import { getSearchedUsers } from "../controllers/searchController.js";
import { searchMiddleware } from "../middlewares/searchMiddleware.js";

const searchRouter = Router();

searchRouter.get('/search', searchMiddleware, getSearchedUsers);

export default searchRouter;

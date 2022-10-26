import { Router } from "express";
import { getSearchedUsers } from "../controllers/searchController.js";
import { isAuthenticated } from "../middlewares/linkrMiddlewares.js";

const searchRouter = Router();

searchRouter.get('/search', isAuthenticated, getSearchedUsers);

export default searchRouter;

import { Router } from "express";
import { getSearchedUsers } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get('/search', getSearchedUsers);

export default searchRouter;

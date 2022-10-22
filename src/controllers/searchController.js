import searchUsers from "../repositories/searchRepository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getSearchedUsers(req, res) {
    try {
        const users = await searchUsers();
        res.status(STATUS_CODE.SUCCESSOK).send(users.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    };
}
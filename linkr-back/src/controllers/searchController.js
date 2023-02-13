import searchUsers from "../repositories/searchRepository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getSearchedUsers(req, res) {
    const { token } = res.locals;
    const { searchedText } = req.query;

    try {
        const users = await searchUsers(token, searchedText);
        res.status(STATUS_CODE.SUCCESSOK).send(users.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    };
}
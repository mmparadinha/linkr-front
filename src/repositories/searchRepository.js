import connection from "../database/database.js";

export default async function searchUsers(searchedText) {
    return connection.query(`
        SELECT
            users.username,
            users."pictureUrl"
        FROM users
        WHERE users.username
        LIKE $1
    ;`, [`%${searchedText}%`])
};
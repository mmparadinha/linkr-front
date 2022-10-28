import connection from "../database/database.js";

export default async function searchUsers(userToken, searchedText) {
    return connection.query(`
        SELECT
            users.id,
            users.username,
            users."pictureUrl",
            followers."followerId"
        FROM users
        LEFT JOIN followers ON users.id=followers."followedId"
        LEFT JOIN sessions ON followers."followerId"=sessions."userId"
        WHERE (sessions.token=$1 OR sessions.token IS NULL) AND users.username ILIKE $2
        ORDER BY sessions.token
    ;`, [userToken, `%${searchedText}%`])
}
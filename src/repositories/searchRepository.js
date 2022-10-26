import connection from "../database/database.js";

export default async function searchUsers(userToken) {
    return connection.query(`
        SELECT
            users.id,
            users.username,
            users."pictureUrl",
            followers."followerId"
        FROM users
        LEFT JOIN followers ON users.id=followers."followedId"
        LEFT JOIN sessions ON followers."followerId"=sessions."userId"
        WHERE sessions.token=$1 OR sessions.token IS NULL
        ORDER BY sessions.token
    ;`, [userToken])
}
import connection from "../database/database.js";

export default async function searchUsers() {
    return connection.query(`
        SELECT
            users.id,
            users.username,
            users."pictureUrl"
        FROM users
    ;`)
}
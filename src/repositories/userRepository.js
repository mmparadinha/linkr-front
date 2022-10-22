import connection from "../database/database.js";

export default async function userPostsRepository(id) {
    return connection.query(`
    SELECT
    	users.id as "userId",
        users.username,
        users."pictureUrl",
        posts.id as "postId",
        posts.comment,
        posts.url
    FROM
        posts
    JOIN users ON posts."userId" = users.id
    WHERE posts."userId" = $1
    ORDER BY
        posts."createdAt" DESC
    LIMIT
        20;`, [id]);
};
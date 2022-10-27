import connection from "../database/database.js";

async function getPosts(userToken) {
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
    LEFT JOIN followers ON users.id=followers."followedId"
    LEFT JOIN sessions ON followers."followerId"=sessions."userId"
    WHERE sessions.token=$1
    ORDER BY
        posts."createdAt" DESC
    LIMIT
        20;`, [userToken]);
};

async function followsAnyone(userToken) {
    return connection.query(`
        SELECT
            users.id,
            users.username,
            users."pictureUrl",
            followers."followerId"
        FROM users
        LEFT JOIN followers ON users.id=followers."followedId"
        LEFT JOIN sessions ON followers."followerId"=sessions."userId"
        WHERE sessions.token=$1
        ORDER BY sessions.token
    ;`, [userToken])
}

async function newPost(userId, url, comment) {
    return connection.query('INSERT INTO posts ("userId", url, comment, "createdAt") VALUES ($1,$2,$3,NOW()) RETURNING id;', [userId, url, comment]);
};

async function newPostsNumber(token, postId) {
    return connection.query(`
        SELECT
            COUNT(posts.id)
        FROM
            posts
        JOIN users ON posts."userId" = users.id
        LEFT JOIN followers ON users.id=followers."followedId"
        LEFT JOIN sessions ON followers."followerId"=sessions."userId"
        WHERE sessions.token=$1 AND posts.id > $2
        ;`, [token, postId]);
};

export const postRepository = {
    getPosts, followsAnyone, newPost, newPostsNumber
};
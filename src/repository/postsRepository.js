import connection from "../database/database.js";

async function getPosts() {
    return connection.query('SELECT users.username, users."pictureUrl", posts.comment, posts.url FROM posts JOIN users ON posts."userId"=users.id ORDER BY posts."createdAt" DESC LIMIT 20; ');
};

async function newPost() {
    return connection.query('INSERT INTO posts ("userId", url, comment, "createdAt") VALUES ($1,$2,$3,NOW())', [userId, url, comment])
};

export const postRepository = {
    getPosts, newPost
};
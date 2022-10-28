import connection from '../database/database.js';

async function likePost(userId, postId) {
    return connection.query(
        `INSERT 
        INTO likes ("userId", "postId") 
        VALUES ($1, $2)`,
        [userId, postId]
    );
}

async function unlikePost(userId, postId) {
    return connection.query(
        `DELETE 
        FROM likes 
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}

async function checkLikedPost(userId, postId) {
    return connection.query(
        `SELECT * from likes WHERE "userId" = $1 AND "postId" = $2`, 
        [userId, postId]
    );
}

async function checkExistentPost(postId) {
    return connection.query(
        `SELECT * from posts WHERE id = $1`, 
        [postId]
    );
}

async function getPostIdLikes(postId, userId) {
    return connection.query(
        `SELECT u.username
        FROM users u
        JOIN likes 
        ON "userId" = u.id
        WHERE likes."postId" = $1 
        AND likes."userId" = $2
        `, [postId, userId]
    );
}

async function getlikesCount(postId) {
    return connection.query(
        `
        SELECT COUNT(id) FROM likes
        WHERE "postId" = $1
        `, [postId]
    );
}

async function getLikesNames(postId, userId) {
    return connection.query(
      `
         SELECT users.username FROM likes 
         JOIN users
         ON likes."userId" = users.id
         WHERE likes."postId" = $1 AND likes."userId" != $2
         LIMIT 2
      `,
      [postId, userId]
    );
  }

export const likesRepository = {
    likePost,
    unlikePost,
    checkLikedPost,
    checkExistentPost,
    getPostIdLikes,
    getlikesCount,
    getLikesNames
}
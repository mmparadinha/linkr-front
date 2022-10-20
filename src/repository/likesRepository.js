import connection from '../database/database.js';

async function likePost(userId, postId){
    return connection.query(
        `INSERT 
        INTO likes ("userId", "postId") 
        VALUES ($1, $2)`,
        [userId, postId]
    );
}

async function unlikePost(userId, postId){
    return connection.query(
        `DELETE 
        FROM likes 
        WHERE "userId" = $1 AND "postId" = $2`,
        [userId, postId]
    );
}

async function checkLikedPost(userId, postId){
    return connection.query(
        `SELECT * from likes WHERE "userId" = $1 AND "postId" = $2`, 
        [userId, postId]
    );
}

async function checkExistentPost(postId){
    return connection.query(
        `SELECT * from posts WHERE id = $1`, 
        [postId]
    );
}

export const likesRepository = {
    likePost,
    unlikePost,
    checkLikedPost,
    checkExistentPost
}
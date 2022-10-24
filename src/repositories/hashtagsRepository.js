import connection from "../database/database.js";

async function getListHashtags(){
    return connection.query(
        'SELECT hashtags.name AS name, COUNT(hashtags.name) AS count FROM hashtags GROUP BY hashtags.name ORDER BY count DESC LIMIT 10;'
    );
}

async function getListPostsFromHashtag(hashtag){
    return connection.query(
        `SELECT 
        users.username AS username,
        users."pictureUrl" AS "pictureUrl",
        hashtags.name AS hashtag,
        posts."userId" AS "userId",
        posts.url AS url,
        posts.comment AS comment,
        posts.id AS "postId"
        FROM posts 
        JOIN "postHashtags" 
        ON "postHashtags"."postId" = posts.id 
        JOIN hashtags 
        ON hashtags.id = "postHashtags"."hashtagId"
        JOIN users 
        ON users.id = posts."userId"
        WHERE hashtags.name = $1
        ORDER BY posts."createdAt" DESC;`,
        [hashtag]
    );
}

async function postHashtagId(postId, hashtagId){
    return connection.query('INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2);',
    [postId, hashtagId]);
}

async function newHashtag(name){
    return connection.query(
        'INSERT INTO hashtags ("name") VALUES ($1) RETURNING id;',
        [name]
    );
}

export {getListHashtags, getListPostsFromHashtag, newHashtag, postHashtagId};

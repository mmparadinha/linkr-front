import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import * as hashtagsRepository from "../repository/hashtagsRepository.js";

async function getHashtags(req, res){
    try {
        const listHashtags = (await hashtagsRepository.getListHashtags()).rows;

        return res.send(STATUS_CODE.SUCCESSOK).send(listHashtags);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    }
}

async function getPostFromHashtag(req,res){
    const {hashtag} = req.params;

    try {
        const listPosts = await connection.query(
            `SELECT 
            users.username AS username,
            users."pictureUrl" AS "pictureUrl",
            hashtags.name AS hashtag,
            posts."userId" AS "userId",
            posts.url AS url,
            posts.comment AS comment
            FROM posts 
            JOIN "postHashtags" 
            ON "postHashtags"."postId" = posts.id 
            JOIN hashtags 
            ON hashtags.id = "postHashtags"."hashtagId"
            JOIN users 
            ON users.id = posts."userId"
            ORDER BY posts."createdAt" DESC
            WHERE hashtags.name = $1;`,
            [{hashtag}]
        );

        return res.status(STATUS_CODE.SUCCESSOK).send(listPosts.rows);

    } catch (error) {
        
    }
}

export {getHashtags, getPostFromHashtag};
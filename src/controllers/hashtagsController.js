import { STATUS_CODE } from "../enums/statusCode.js";
import * as hashtagsRepository from "../repositories/hashtagsRepository.js";
import urlMetadata from "url-metadata";
import {stripHtml} from "string-strip-html";

async function getHashtags(req, res){
    try {
        const listHashtags = (await hashtagsRepository.getListHashtags()).rows;

        return res.status(STATUS_CODE.SUCCESSOK).send(listHashtags);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    }
}

async function getPostsFromHashtag(req,res){
    const {hashtag} = req.params;

    try {
        const listPosts = (await hashtagsRepository.getListPostsFromHashtag(hashtag)).rows;

        await Promise.all(
            listPosts.map(async (post) => {
                const {title, image, description} = await urlMetadata(post.url);
                post.urlTitle = title;
                post.urlImage = image;
                post.urlDescription = description;
            })
        );

        return res.status(STATUS_CODE.SUCCESSOK).send(listPosts);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    }
}

async function newHashtag(req, res){
    const {name} = req.body;

    try {
        await hashtagsRepository.newHashtag(name);

        return res.sendStatus(STATUS_CODE.SUCCESSCREATED);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    }
}

async function postHashtagId(req, res){
    const {postId, hashtagId} = req.body;

    try {
        await hashtagsRepository.postHashtagId(postId, hashtagId);

        return res.sendStatus(STATUS_CODE.SUCCESSCREATED);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
    }
}

export {getHashtags, getPostsFromHashtag, newHashtag, postHashtagId};
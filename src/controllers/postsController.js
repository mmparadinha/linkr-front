import { postRepository } from "../repository/postsRepository.js";

export async function getPosts(req, res) {

    try {
        const posts = await postRepository.getPosts();

        res.status(200).send(posts.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export async function newPost(req, res) {
    const { url, comment } = req.body;
    const { user } = res.locals;

    try {
        await postRepository.newPost(user.id, url, comment);

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};


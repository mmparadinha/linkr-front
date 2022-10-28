import { likesRepository } from '../repositories/likesRepository.js';

export async function likeAndUnlike(req, res) {
    const { userId } = req.body;
    const { postId } = req.params;

    try {
        const isPostExistent = await likesRepository.checkExistentPost(postId);
        
        if(isPostExistent.rows.length === 0){
            return res.status(404).send("Publicação não encontrada");
        }

        const isPostAlreadyLiked = await likesRepository.checkLikedPost(userId, postId);
        
        if(isPostAlreadyLiked.rows.length > 0){
            await likesRepository.unlikePost(userId, postId);
            return res.sendStatus(200);
        }

        await likesRepository.likePost(userId, postId);
        res.sendStatus(201);

    } catch(err) {
        return res.status(500).send(err);
    }
}

export async function getLikes(req, res) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const userLike = await likesRepository.getPostIdLikes(postId, userId);
        return res.status(201).send(userLike.rows);
    } catch(err) {
        return res.status(500).send(err)
    }
}

export async function likesCounter(req, res) {
    const { postId } = req.params;

    try {
        const { rows: likesCount } = await likesRepository.getlikesCount(postId);
        console.log(likesCount);

    try {
        const { rows: likesCount } = await likesRepository.getlikesCount(postId);
        return res.status(201).send(likesCount[0]);
    } catch(err) {
        return res.status(500).send(err)
    }
}

export async function getLikesNames(req, res) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const { rows: likesName } = await likesRepository.getLikesNames(postId, userId);
        return res.status(201).send(likesName);
    } catch(err) {
        return res.status(500).send(err)
    }
}

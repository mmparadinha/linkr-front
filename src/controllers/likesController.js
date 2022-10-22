import { likesRepository } from '../repository/likesRepository.js';

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

    }catch(err){
        return res.status(500).send(err);
    }
}

export async function getLikes(req, res) {
    const { postId } = req.params;
    
    try {
        return res.sendStatus(503)
    }catch(err){
        return res.status(500).send(err)
    }
}
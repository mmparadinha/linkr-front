import { postRepository } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";
import { newPostSchema } from "../schemas/validationSchemas.js";
import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getPosts(req, res) {
  const { token } = res.locals;
  const { per_page, start, order } = req.query;
  try {
    const listFollows = (await postRepository.followsAnyone(token)).rows;
    if (listFollows.length === 0) {
      return res.sendStatus(STATUS_CODE.SUCCESSNOCONTENT);
    }

    const listPosts = (await postRepository.getPosts(token, per_page, start)).rows;
    // console.log(listPosts)

    await Promise.all(
      listPosts.map(async (post) => {
        try {
          const { title, image, description } = await urlMetadata(post.url);
          post.urlTitle = title;
          post.urlImage = image;
          post.urlDescription = description;
        } catch (error) {
          console.error(error, post);
          post.urlTitle = "";
          post.urlImage = "";
          post.urlDescription = "";
        }
      })
    );

    res.status(STATUS_CODE.SUCCESSOK).send(listPosts);
  } catch (error) {
    console.error(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export async function newPost(req, res) {
  const { url, comment, userId } = req.body;

  try {
    const isValid = newPostSchema.validate({ url, comment });

    if (isValid.error) {
      const errors = isValid.error.details.map((detail) => detail.message);

      return res
        .status(STATUS_CODE.ERRORUNPROCESSABLEENTITY)
        .send({ message: errors });
    }

    const postId = (await postRepository.newPost(userId, url, comment)).rows[0]
      .id;

    res.status(STATUS_CODE.SUCCESSCREATED).send({ postId });
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    await postRepository.deletePost(id, userId);

    res.sendStatus(STATUS_CODE.SUCCESSCREATED);
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODE.ERRORMETHODNOTALLOWED)
      .send("não foi possivel deletar o post");
  }
}

export async function updatePost(req, res) {
  const { url, comment } = req.body;
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    await postRepository.updatePost(url, comment, id, userId);
    res.sendStatus(STATUS_CODE.SUCCESSCREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export async function countNewPosts(req, res) {
  const { postId } = req.query;
  const { token } = res.locals;

  try {
    const { rows } = await postRepository.newPostsNumber(token, postId);

    res.status(STATUS_CODE.SUCCESSOK).send({ count: rows[0].count });
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export async function postComment(req, res) {
  const { userId, comment, pictureUrl, username } = req.body;
  const follow = false;
  const { postId } = req.params;
  try {
    await postRepository.postComment(
      userId,
      postId,
      comment,
      pictureUrl,
      follow,
      username
    );
    res.sendStatus(STATUS_CODE.SUCCESSCREATED);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

export async function getComment(req, res) {
  const { postId } = req.params;
  try {
    const comments = await postRepository.getComment(postId);
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}

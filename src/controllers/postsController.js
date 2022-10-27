import { postRepository } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";
import { newPostSchema } from "../schemas/validationSchemas.js";
import connection from "../database/database.js";

export async function getPosts(req, res) {
  const { token } = res.locals;
  try {
    const listFollows = (await postRepository.followsAnyone(token)).rows;
    if (listFollows.length === 0) { return res.sendStatus(204); }

    const listPosts = (await postRepository.getPosts(token)).rows;

    await Promise.all(
      listPosts.map(async (post) => {
        try {
          const { title, image, description } = await urlMetadata(post.url);
          post.urlTitle = title;
          post.urlImage = image;
          post.urlDescription = description;
        } catch (error) {
          console.error(error, post);
          post.urlTitle = '';
          post.urlImage = '';
          post.urlDescription = '';
        }
      })
    );

    res.status(200).send(listPosts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
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

    const postId = (await postRepository.newPost(userId, url, comment)).rows[0].id;

    res.status(201).send({ postId });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization?.replace("Bearer ", "");
  const verifyToken = await connection.query(
    `SELECT * FROM sessions WHERE token LIKE $1;`,
    [token]
  );
  if (verifyToken.rows.length === 0 || verifyToken.rows[0].active == false)
    return res.sendStatus(401);
  const userId = verifyToken.rows[0].userId;

  try {
    await connection.query(
      `DELETE FROM posts WHERE id = $1 AND "userId" = $2`,
      [id, userId]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(405).send("não foi possivel deletar o post");
  }
}

export async function updatePost(req, res) {
  const { url, comment } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization?.replace("Bearer ", "");
  const verifyToken = await connection.query(
    `SELECT * FROM sessions WHERE token LIKE $1;`,
    [token]
  );
  if (verifyToken.rows.length === 0 || verifyToken.rows[0].active == false)
    return res.sendStatus(401);
  const userId = verifyToken.rows[0].userId;

  try {
    await connection.query(
      `UPDATE posts SET url = $1, comment = $2 WHERE id = $3 AND "userId" = $4;`,
      [url, comment, id, userId]
    )
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function countNewPosts(req, res) {
  const { postId } = req.query;
  const { token } = res.locals;

  try {
    const { rows } = (await postRepository.newPostsNumber(token, postId));

    res.status(200).send({ count: rows[0].count });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  };
};



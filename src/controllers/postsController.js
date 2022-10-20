import { postRepository } from "../repository/postsRepository.js";

export async function getPosts(req, res) {
  try {
    const posts = await postRepository.getPosts();

    res.status(200).send(posts.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function newPost(req, res) {
  const { url, comment } = req.body;
  const { user } = res.locals;

  try {
    await postRepository.newPost(user.id, url, comment);

    res.sendStatus(201);
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

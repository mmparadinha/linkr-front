import userPostsRepository from "../repositories/userRepository.js";
import urlMetadata from "url-metadata";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getUserPosts(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await userPostsRepository.getPosts(id);

    await Promise.all(
      rows.map(async (post) => {
        const { title, image, description } = await urlMetadata(post.url);
        post.urlTitle = title;
        post.urlImage = image;
        post.urlDescription = description;
      })
    );

    res.status(STATUS_CODE.SUCCESSOK).send(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
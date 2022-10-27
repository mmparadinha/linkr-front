import { getUserPosts, getUserInfo } from "../repositories/userRepository.js";
import urlMetadata from "url-metadata";
import { STATUS_CODE } from "../enums/statusCode.js";

export async function getUserData(req, res) {
  const { id } = req.params;

  try {
    const userInfo = (await getUserInfo(id)).rows;
    const userPosts = (await getUserPosts(id)).rows;

    const { username, pictureUrl } = userInfo[0];

    await Promise.all(
      userPosts.map(async (post) => {
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

    res.status(STATUS_CODE.SUCCESSOK).send({
      username,
      pictureUrl,
      userPosts
    });

  } catch (error) {
    console.error(error);
    res.sendStatus(STATUS_CODE.SERVERERRORINTERNAL);
  }
}
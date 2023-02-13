import connection from "../database/database.js";

async function getPosts(userToken, per_page, start) {
    return connection.query(`
    SELECT
    	users.id as "userId",
        users.username,
        users."pictureUrl",
        posts.id as "postId",
        posts.comment,
        posts.url
    FROM
        posts
    JOIN users ON posts."userId" = users.id
    LEFT JOIN followers ON users.id=followers."followedId"
    LEFT JOIN sessions ON followers."followerId"=sessions."userId"
    WHERE sessions.token=$1
    ORDER BY
        posts."createdAt" DESC
    LIMIT $2
    OFFSET $3;`, [userToken, per_page, start]);
};

async function followsAnyone(userToken) {
  return connection.query(
    `
        SELECT
            users.id,
            users.username,
            users."pictureUrl",
            followers."followerId"
        FROM users
        LEFT JOIN followers ON users.id=followers."followedId"
        LEFT JOIN sessions ON followers."followerId"=sessions."userId"
        WHERE sessions.token=$1
        ORDER BY sessions.token
    ;`,
    [userToken]
  );
}

async function newPost(userId, url, comment) {
  return connection.query(
    'INSERT INTO posts ("userId", url, comment, "createdAt") VALUES ($1,$2,$3,NOW()) RETURNING id;',
    [userId, url, comment]
  );
}

async function newPostsNumber(token, postId) {
  return connection.query(
    `
        SELECT
            COUNT(posts.id)
        FROM
            posts
        JOIN users ON posts."userId" = users.id
        LEFT JOIN followers ON users.id=followers."followedId"
        LEFT JOIN sessions ON followers."followerId"=sessions."userId"
        WHERE sessions.token=$1 AND posts.id > $2
        ;`,
    [token, postId]
  );
}

async function getComment(postId) {
  return connection.query(`SELECT * FROM comments WHERE postId = $1;`, [
    postId,
  ]);
}

async function deletePost(id, userId) {
  return connection.query(`DELETE FROM posts WHERE id = $1 AND "userId" = $2`, [
    id,
    userId,
  ]);
}

async function updatePost(url, comment, id, userId) {
  return connection.query(
    `UPDATE posts SET url = $1, comment = $2 WHERE id = $3 AND "userId" = $4;`,
    [url, comment, id, userId]
  );
}

async function postComment(
  userId,
  postId,
  comment,
  pictureUrl,
  follow,
  username
) {
  return connection.query(
    'INSERT INTO comments ("userId", "postId", comment, "pictureUrl", follow, username) VALUES ($1,$2,$3,$4,$5,$6);',
    [userId, postId, comment, pictureUrl, follow, username]
  );
}

export const postRepository = {
  getPosts,
  followsAnyone,
  newPost,
  newPostsNumber,
  deletePost,
  updatePost,
  postComment,
  getComment,
};

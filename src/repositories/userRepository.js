import connection from "../database/database.js";

export async function getUserPosts(id) {
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
    WHERE posts."userId" = $1
    ORDER BY
        posts."createdAt" DESC
    LIMIT
        20;`, [id]);
};

export async function getUserInfo(id) {
    return connection.query(`
    SELECT
        users.username,
        users."pictureUrl"
    FROM users
    WHERE users.id=$1
    ;`, [id]);
};

async function isFollowed(userId, followedId){
    return connection.query(
       `SELECT 
            * 
        FROM 
            followers 
        WHERE "followerId" = $1 
        AND "followedId" = $2;`,
        [userId, followedId]
      );
}

async function startFollowing(userId, followedId){
    return connection.query(`
    INSERT INTO 
        followers 
    ("followerId", "followedId") 
    VALUES ($1, $2);`,
    [userId, followedId]);
}

async function stopFollowing(userId, followedId){
    return connection.query(`
    DELETE FROM 
      followers
    WHERE "followerId" = $1 
    AND "followedId" = $2;`,
    [userId, followedId]
    );
}

export {
    getUserPosts,
    getUserInfo,
    isFollowed,
    startFollowing,
    stopFollowing
}
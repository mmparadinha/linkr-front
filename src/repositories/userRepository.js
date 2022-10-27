import connection from "../database/database.js";

async function getUserData(id) {
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
    getUserData,
    isFollowed,
    startFollowing,
    stopFollowing
}
import connection from "../database/database.js";
import {STATUS_CODE} from "../enums/statusCode.js";

async function getListHashtags(){
    return connection.query(
        'SELECT hashtags.name as name, COUNT("postHashtags"."hashtagId") as "hashtagCount" FROM hashtags JOIN "postHashtags" ON hashtags.id = "postHashtags"."hashtagId" GROUP BY hashtags.name ORDER BY "hashtagCount" DESC LIMIT 10;'
    );
}

export {getListHashtags};

import connection from "../database/database.js";
import {STATUS_CODE} from "../enums/statusCode.js";

async function getListHashtags(){
    return connection.query(
        'SELECT hashtags.name AS name, COUNT(hashtags.name) AS count FROM hashtags GROUP BY hashtags.name ORDER BY count DESC LIMIT 10;'
    );
}

export {getListHashtags};

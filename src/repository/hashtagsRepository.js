import connection from "../database/database.js";
import {STATUS_CODE} from "../enums/statusCode.js";

async function getListHashtags(){
    return connection.query(
        'SELECT '
    );
}

export {getListHashtags};

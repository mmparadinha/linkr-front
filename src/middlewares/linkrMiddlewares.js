import connection from '../database/database.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function isAuthenticated(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        if (!token) {
            return res.status(STATUS_CODE.ERRORUNAUTHORIZED).send({
                "message": "Header não enviado ou inválido!"
            });
        }

        const authenticated = await connection.query(
            `SELECT * FROM 
                sessions
            WHERE token = $1;`,
            [token]);

        if (authenticated.rows.length === 0) {
            return res.status(STATUS_CODE.ERRORUNAUTHORIZED).send({
                "message": "Usuário não autorizado!"
            });
        }

        req.body.userId = authenticated.rows[0].userId;
        next();
    } catch (error) {
        res.status(STATUS_CODE.SERVERERRORINTERNAL).send(error.message);
    };
};

async function hasUser(req, res, next) {
    const { userId } = req.body;

    try {
        const isUser = await connection.query(
            `SELECT * FROM 
                users
            WHERE id = $1;
            `,
            [userId]);

        if (isUser.rows.length === 0) {
            return res.sendStatus(STATUS_CODE.ERRORNOTFOUND);
        };
        console.log('passou');
        next();
    } catch (error) {
        res.status(STATUS_CODE.SERVERERRORINTERNAL).send(error.message);
    }
}

export { isAuthenticated, hasUser };
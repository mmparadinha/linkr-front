import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { loginSchema } from '../schemas/validationSchemas.js';

async function loginPost(req, res) {
    const { email, password } = req.body;

    try {
        const isValid = loginSchema.validate({
            email, password
        });

        if (isValid.error) {
            const errors = isValid.error.details.map(detail => detail.message);

            return res.status(STATUS_CODE.ERRORUNPROCESSABLEENTITY).send("teste", { "message": errors });
        }

        const verification = await connection.query(
            `SELECT * FROM 
                users
            WHERE email = $1 
            limit 1;`, [email]
        );

        if (!(verification.rows).length) {
            res.status(STATUS_CODE.ERRORUNAUTHORIZED).send({
                "message": "Preencha os dados corretamente!"
            })
        }

        const encrypetPassword = await bcrypt.compare(password, verification.rows[0]?.password);

        if (!encrypetPassword) {
            res.status(STATUS_CODE.ERRORUNAUTHORIZED).send({
                "message": "Senha ou usuário inválidos, tente novamente!"
            });
            return;
        }

        const token = uuid();
        await connection.query(
            `INSERT INTO
                sessions ("userId", token)
            VALUES ($1, $2);`,
            [verification.rows[0]?.id, token]
        );

        return res.send({ token });
    } catch (error) {
        res.status(STATUS_CODE.SERVERERRORINTERNAL).send(error.message);
        return;
    }
}

export { loginPost }
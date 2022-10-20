import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { STATUS_CODE } from '../enums/statusCode.js';
import { signUpSchema } from '../schemas/validationSchemas.js';

async function signupPost (req, res) {
    const { email, password, username, pictureUrl } = req.body;

    try {
        const isValid = signUpSchema.validate({
            email, password, username, pictureUrl
        });

        if(isValid.error) {
            const errors = isValid.error.details.map(detail => detail.message);

            return res.status(STATUS_CODE.ERRORUNPROCESSABLEENTITY).send({"message": errors});
        }

        const emailExist = await connection.query("SELECT * FROM users WHERE email=($1);", [email]);

        if((emailExist.rows).length) {
            res.status(STATUS_CODE.ERRORCONFLICT).send({
                "message": "Preencha os dados corretamente!"
            });
            return;
        }

        const excrypetPassword = await bcrypt.hash(password, 12);

        await connection.query(`INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4);`, [email, excrypetPassword, username, pictureUrl]);

        return res.sendStatus(STATUS_CODE.SUCCESSCREATED);
    } catch (error) {
        res.status(STATUS_CODE.SERVERERRORINTERNAL).send(error.message);
        return;
    }
}

export { signupPost }
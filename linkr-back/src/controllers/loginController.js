import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { STATUS_CODE } from '../enums/statusCode.js';
import { loginSchema } from '../schemas/validationSchemas.js';
import { loginUser, checkEmail, getUserData } from '../repositories/authRepository.js';

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

        const verification = await checkEmail(email);

        if (!(verification.rows).length) {
            res.status(STATUS_CODE.ERRORUNAUTHORIZED).send({
                "message": "Preencha os dados corretamente!"
            });
            return;
        }

        const encrypetPassword = await bcrypt.compare(password, verification.rows[0]?.password);

        if (!encrypetPassword) {
            res.status(STATUS_CODE.ERRORUNAUTHORIZED).send({
                "message": "Senha ou usuário inválidos, tente novamente!"
            });
            return;
        }

        const userData = (await getUserData(email)).rows[0];

        const token = uuid();
        await loginUser(verification, token);

        res.send({token, ...userData});
    } catch (error) {
        res.status(STATUS_CODE.SERVERERRORINTERNAL).send(error.message);
    }
}

export { loginPost }

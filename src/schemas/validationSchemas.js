import joi from 'joi';

const urlRegex = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');

const signUpSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'br']}}).required().messages({
        'string.base': `"email" should be of type 'string'`,
        'string.empty': `"email" Não pode ser um campo vazio!`,
        'any.required': `"email" É um campo obrigatório`,
    }),
    password: joi.string().required().messages({
        'string.base': `"password" should be of type 'string'`,
        'string.empty': `"password" Não pode ser um campo vazio!`,
        'any.required': `"password" É um campo obrigatório`,
    }),
    username: joi.string().required().messages({
        'string.base': `"username" should be of type 'string'`,
        'string.empty': `"username" Não pode ser um campo vazio!`,
        'any.required': `"username" É um campo obrigatório`,
    }),
    pictureUrl: joi.string().regex(urlRegex).required().messages({
        'string.base': `"pictureUrl" should be of type 'string'`,
        'string.empty': `"pictureUrl" Não pode ser um campo vazio!`,
        'any.required': `"pictureUrl" É um campo obrigatório`,
    }),
});

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.base': `"email" should be of type 'string'`,
        'string.empty': `"email" Não pode ser um campo vazio!`,
        'any.required': `"email" É um campo obrigatório`,
    }),
    password: joi.string().required().messages({
        'string.base': `"password" should be of type 'string'`,
        'string.empty': `"password" Não pode ser um campo vazio!`,
        'any.required': `"password" É um campo obrigatório`,
    }),
});

export { signUpSchema, loginSchema }
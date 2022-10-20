import joi from 'joi';

const urlRegex = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');

const signUpSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).required(),
    password: joi.string().required(),
    username: joi.string().required(),
    pictureUrl: joi.string().regex(urlRegex).required(),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const newPostSchema = joi.object({
    url: joi.string().regex(urlRegex).required(),
    comment: joi.string()
});

export { signUpSchema, loginSchema, newPostSchema }
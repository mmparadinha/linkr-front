import Joi from "joi";

const urlRegex = new RegExp(
  "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
);
export async function validaEditPost(req, res, next) {
  const validation = schemaTextPost.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    console.log("mid");
    return res.status(422).send(validation.error.message);
  }

  next();
}

const schemaTextPost = Joi.object().keys({
  url: Joi.string().regex(urlRegex).required(),
  comment: Joi.string(),
});

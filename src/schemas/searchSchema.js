import Joi from "joi";

export const searchSchema = Joi.object({
    search: Joi.string().required().trim()
});
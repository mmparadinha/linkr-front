import Joi from "joi";

export const searchSchema = Joi.string().required().trim();
import Joi from "joi";

export const validateUsername = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[A-Za-z0-9_-]*$"))
    .message({ "string.pattern.base": "Invalid username" })
    .min(5)
    .max(30)
    .required(),
});

export const validatePassword = Joi.object({
  password: Joi.string()
    .pattern(new RegExp("^[A-Za-z0-9_@./#&+-]*$"))
    .message({ "string.pattern.base": "Invalid password" })
    // .min(6)
    .max(20)
    .required(),
});

import Joi from "joi";

export const validateName = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

export const validateDescription = Joi.object({
  description: Joi.string().min(20).required(),
});

export const validateLocation = Joi.object({
  location: Joi.string().required(),
});


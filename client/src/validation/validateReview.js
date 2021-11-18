import Joi from "joi";

const schema = Joi.object({
  content: Joi.string().required(),
});

export default schema;

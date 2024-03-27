const Joi = require("joi");
const { handleError } = require("./handle.validation");

exports.ValidationRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Name");
      }),
    email: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Email");
      }),
    password: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Password");
      }),
    identity_type: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Identity_type");
      }),
    identity_number: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Identity_number");
      }),
    address: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Address");
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
exports.ValidationLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Email");
      }),
    password: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "Password");
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

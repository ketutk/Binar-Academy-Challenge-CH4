const Joi = require("joi");
const { handleError } = require("./handle.validation");

exports.ValidationAccount = (data) => {
  const schema = Joi.object({
    bank_name: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "bank_name");
      }),
    bank_account_number: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "bank_account_number");
      }),
    balance: Joi.number()
      .required()
      .error((errors) => {
        return handleError(errors, "balance");
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

const Joi = require("joi");
const { handleError } = require("./handle.validation");

exports.ValidationTransaction = (data) => {
  const schema = Joi.object({
    source_account_id: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "source_account_id");
      }),
    destination_account_id: Joi.string()
      .required()
      .error((errors) => {
        return handleError(errors, "destination_account_id");
      }),
    amount: Joi.number()
      .required()
      .error((errors) => {
        return handleError(errors, "amount");
      }),
  });

  return schema.validate(data, { abortEarly: false });
};

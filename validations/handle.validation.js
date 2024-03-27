exports.handleError = (errors, object) => {
  errors.forEach((err) => {
    switch (err.code) {
      case "any.required":
        err.message = `${object} can not be empty!`;
        break;
      case "string.empty":
        err.message = `${object} can not be empty!`;
        break;
      case "string.max":
        err.message = `${object} cannot be more than ${err.local.limit} characters!`;
        break;
      case "number.base":
        err.message = `${object} must be a number`;
      // negatif
      case "number.positive":
        err.message = `${object} must be a positive number`;
      default:
        break;
    }
  });
  return errors;
};

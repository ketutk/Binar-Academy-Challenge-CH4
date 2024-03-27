const { createAccount, getMyAccounts, getAccounts, getAccountById } = require("../services/accounts.service");
const { ValidationAccount } = require("../validations/accounts.validation");

exports.createAccount = async (req, res) => {
  try {
    const { error: validate } = ValidationAccount(req.body);
    if (validate) {
      return res.status(400).json({
        status: 400,
        message: validate.details,
        data: null,
      });
    }
    const response = await createAccount(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
exports.getMyAccounts = async (req, res) => {
  try {
    const response = await getMyAccounts(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const response = await getAccounts(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const response = await getAccountById(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

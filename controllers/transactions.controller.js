const { addTransaction, getTransactions, getMyTransactions, getTransactionById } = require("../services/transactions.service");
const { ValidationTransaction } = require("../validations/transactions.validation");

exports.addTransaction = async (req, res) => {
  try {
    const { error: validate } = ValidationTransaction(req.body);
    if (validate) {
      return res.status(400).json({
        status: 400,
        message: validate.details,
        data: null,
      });
    }
    const response = await addTransaction(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const response = await getTransactions(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
exports.getMyTransactions = async (req, res) => {
  try {
    const response = await getMyTransactions(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
exports.getTransactionById = async (req, res) => {
  try {
    const response = await getTransactionById(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

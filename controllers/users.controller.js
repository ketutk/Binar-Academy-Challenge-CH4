const { check, validationResult } = require("express-validator");
const { ValidationRegister, ValidationLogin } = require("../validations/users.validation");
const { registerUser, loginUser, getUsers, getUserById } = require("../services/users.service");

exports.registerUser = async (req, res, next) => {
  try {
    const { error: validate } = ValidationRegister(req.body);
    if (validate) {
      return res.status(400).json({
        status: 400,
        message: validate.details,
        data: null,
      });
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Please input valid email",
        data: null,
      });
    }
    const response = await registerUser(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { error: validate } = ValidationLogin(req.body);
    if (validate) {
      return res.status(400).json({
        status: 400,
        message: validate.details,
        data: null,
      });
    }
    const response = await loginUser(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const response = await getUsers(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
exports.getUserById = async (req, res) => {
  try {
    const response = await getUserById(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

const jsonwebtoken = require("jsonwebtoken");
module.exports = {
  middleware: (req, res, next) => {
    try {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
        req.user_data = decoded;
        // apakah akun verified dengan cari di data
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: "Authentication failed, please login.",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        status: 401,
        message: error.message,
        data: null,
      });
    }
  },
};

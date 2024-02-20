const { CustomErrorAPI } = require("../error/errorClass");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res
      .status(err.statusCode)
      .json({ status: "error", msg: err.message });
  }

  res.status(500).json({ status: "error", msg: err.message });
};

module.exports = errorHandler;

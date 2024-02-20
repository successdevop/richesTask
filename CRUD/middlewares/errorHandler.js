const errorHandler = (err, req, res, next) => {
  res.status(500).json({ status: "failed", msg: "An error occurred..." });
};

module.exports = errorHandler;

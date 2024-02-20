class CustomErrorAPI extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customError = (message, statusCode) => {
  return new CustomErrorAPI(message, statusCode);
};

module.exports = { CustomErrorAPI, customError };

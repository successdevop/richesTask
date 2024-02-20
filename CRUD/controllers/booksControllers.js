const fs = require("fs");
const asyncWrapper = require("../middlewares/asynWrappers");

const getAllBooks = asyncWrapper((req, res, next) => {
  res.send("All books");
});

const createABook = asyncWrapper((req, res, next) => {});

const getSingleBook = asyncWrapper((req, res, next) => {});

const updateABook = asyncWrapper((req, res, next) => {});

const deleteABook = asyncWrapper((req, res, next) => {});

const deleteAllBooks = asyncWrapper((req, res, next) => {});

module.exports = {
  getAllBooks,
  createABook,
  getSingleBook,
  updateABook,
  deleteABook,
  deleteAllBooks,
};

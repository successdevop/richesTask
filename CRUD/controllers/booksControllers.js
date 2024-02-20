const fs = require("fs");
const asyncWrapper = require("../middlewares/asynWrappers");
const { customError } = require("../error/errorClass");

const getAllBooks = asyncWrapper((req, res, next) => {
  fs.readFile("./database.json", "utf8", (err, json) => {
    if (err) {
      next(customError(err.message, 400));
      return;
    }

    const data = JSON.parse(json);
    if (data.length < 1) {
      return res.status(200).json({
        status: "success",
        msg: "There are no books in the database. Try adding a book!",
      });
    }

    res.status(200).json({ data, nbHits: data.length });
  });
});

const createABook = asyncWrapper((req, res, next) => {
  const { bookName, bookAuthor } = req.body;
  if (!bookName || !bookAuthor) {
    next(
      customError("book name/title and author's name must be provided", 400)
    );
    return;
  }

  const getId = () => {
    return `ATFR${new Date().getTime()}WER${Math.trunc(Math.random() * 1000)}`;
  };
  const id = getId();

  const newData = {
    id,
    Book: bookName.trim(),
    author: bookAuthor.trim(),
  };

  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(customError(err.message, 400));
      return;
    }

    const dataDB = [...JSON.parse(data), newData];
    fs.writeFile("./database.json", JSON.stringify(dataDB), (err) => {
      if (err) {
        next("Error writing file", 404);
        return;
      }

      res
        .status(201)
        .json({ status: "success", msg: "Book added successfully" });
    });
  });
});

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

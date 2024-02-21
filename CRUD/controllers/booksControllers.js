const fs = require("fs");
const asyncWrapper = require("../middlewares/asynWrappers");
const { customError } = require("../error/errorClass");

const getAllBooks = asyncWrapper((req, res, next) => {
  fs.readFile("./database.json", "utf8", (err, json) => {
    if (err) {
      next(customError(err, 400));
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
    next(customError("book title and author's name must be provided", 400));
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
      next(customError(err, 400));
      return;
    }

    const dataDB = [...JSON.parse(data), newData];
    fs.writeFile("./database.json", JSON.stringify(dataDB), (err) => {
      if (err) {
        next(customError("Error writing file", 400));
        return;
      }

      res.status(201).json({
        status: "success",
        msg: "Book added successfully",
        data: newData,
      });
    });
  });
});

const getSingleBook = asyncWrapper((req, res, next) => {
  const { id } = req.params;
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(err, 400);
      return;
    }

    const book = JSON.parse(data).find((bk) => bk.id == id);

    if (!book) {
      next(customError(`Book with id (${id}) does not exist!!!`, 400));
      return;
    }

    res.status(200).json({ status: "success", book });
  });
});

const updateABook = asyncWrapper((req, res, next) => {
  const { id } = req.params;
  const { bookName, bookAuthor } = req.body;
  if (!bookName || !bookAuthor) {
    next(customError("book title and author's name must be provided", 400));
    return;
  }

  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(customError(err, 400));
      return;
    }
    const book = JSON.parse(data).find((bk) => bk.id === id);
    if (!book) {
      next(customError(`Book with id (${id}) does not exist!!!`, 400));
      return;
    }
    const { bookName, bookAuthor } = book;
    console.log(bookName);
    const dataDB = [...JSON.parse(data), book];
    fs.writeFile("./database.json", JSON.stringify(dataDB), (err) => {
      if (err) {
        next(customError("Error writing file", 400));
        return;
      }

      res.status(200).json({
        status: "success",
        msg: "Book updated successfully",
        data: newData,
      });
    });
  });
});

const deleteABook = asyncWrapper((req, res, next) => {
  const { id } = req.params;
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(customError(err, 400));
      return;
    }
    // check for the presence of book
    const book = JSON.parse(data).find((bk) => bk.id === id);
    if (!book) {
      next(customError(`Book with id (${id}) does not exist!!!`, 400));
      return;
    }
    // delete a single book if present
    const newData = JSON.parse(data).filter((bks) => bks.id !== id);
    // write back our available book to database(json)
    fs.writeFile("./database.json", JSON.stringify(newData), (err) => {
      if (err) {
        next(customError("Error writing file", 400));
        return;
      }

      res.status(200).json({
        status: "success",
        msg: `Book with id (${id}) deleted successfully`,
      });
    });
  });
});

const deleteAllBooks = asyncWrapper((req, res, next) => {
  fs.unlink("./database.json", (err) => {
    if (err) {
      next(customError("could not delete file", 500));
    }
    res.status(200).json({ status: "success", msg: "File deleted" });
  });
});

module.exports = {
  getAllBooks,
  createABook,
  getSingleBook,
  updateABook,
  deleteABook,
  deleteAllBooks,
};

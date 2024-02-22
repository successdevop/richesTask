const fs = require("fs");
const asyncWrapper = require("../middlewares/asynWrappers");
const { customError } = require("../error/errorClass");

// get all books
const getAllBooks = asyncWrapper((req, res, next) => {
  fs.readFile("./database.json", "utf8", (err, json) => {
    if (err) {
      next(customError(err, 500));
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

// post/create a new book
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
      next(customError(err, 500));
      return;
    }

    const dataDB = [...JSON.parse(data), newData];
    fs.writeFile("./database.json", JSON.stringify(dataDB), (err) => {
      if (err) {
        next(customError("Error writing file", 500));
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

// get a single book by id
const getSingleBook = asyncWrapper((req, res, next) => {
  const { id } = req.params;
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(err, 400);
      return;
    }

    const book = JSON.parse(data).find((bk) => bk.id === id);

    if (!book) {
      next(customError(`Book with id (${id}) does not exist!!!`, 400));
      return;
    }

    res.status(200).json({ status: "success", book });
  });
});

// update a single book by id
const updateABook = asyncWrapper((req, res, next) => {
  const { id } = req.params;
  const { bookName, bookAuthor } = req.body;
  if (!bookName || !bookAuthor) {
    next(customError("book title and author's name must be provided", 400));
    return;
  }

  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(customError(err, 500));
      return;
    }
    const book = JSON.parse(data).find((bk) => bk.id === id);
    if (!book) {
      next(customError(`Book with id (${id}) does not exist!!!`, 400));
      return;
    }

    const newData = JSON.parse(data).map((bk) => {
      if (bk.id === id) {
        return {
          id,
          Book: bookName,
          author: bookAuthor,
        };
      }
      return bk;
    });

    fs.writeFile("./database.json", JSON.stringify(newData), (err) => {
      if (err) {
        next(customError("Error writing file", 500));
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

// update a single book (method 2)
const updateABook2 = asyncWrapper((req, res, next) => {
  const { id } = req.params;
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(customError(err, 500));
      return;
    }

    data = JSON.parse(data);
    let bookIndex = data.findIndex((index) => index.id === id);
    if (bookIndex !== -1) {
      data[bookIndex] = { ...data[bookIndex], ...req.body };
      fs.writeFile("./database.json", JSON.stringify(data), (err) => {
        if (err) {
          next(customError("Error writing file", 500));
          return;
        }
        return res
          .status(200)
          .json({ status: "Success", data: data[bookIndex] });
      });
    } else {
      res
        .status(400)
        .json({ status: "Error", msg: `Book with id (${id}) does not exist` });
    }
  });
});

// delete a single book by id
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

// delete all books
const deleteAllBooks = asyncWrapper((req, res, next) => {
  fs.readFile("./database.json", "utf8", (err, data) => {
    if (err) {
      next(customError(err, 500));
    }

    if (JSON.parse(data).length < 1) {
      return res.status(200).json({
        status: "success",
        msg: "There are no books in the database",
      });
    }

    let newArray = [];
    fs.writeFile("./database.json", JSON.stringify(newArray), (err) => {
      if (err) {
        next(customError("Error writing file", 400));
        return;
      }
      res
        .status(200)
        .json({
          status: "Success",
          msg: "Books deleted successfully",
          data: newArray,
        });
    });
  });
});

module.exports = {
  getAllBooks,
  createABook,
  getSingleBook,
  updateABook,
  updateABook2,
  deleteABook,
  deleteAllBooks,
};

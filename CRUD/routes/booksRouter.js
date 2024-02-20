const express = require("express");
const {
  getAllBooks,
  createABook,
  deleteAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
} = require("../controllers/booksControllers");
const router = express.Router();

router.route("/").get(getAllBooks).post(createABook).delete(deleteAllBooks);
router.route("/:id").get(getSingleBook).put(updateABook).delete(deleteABook);

module.exports = router;

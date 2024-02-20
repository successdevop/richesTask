const express = require("express");
const app = express();

const bookRouter = require("./routes/booksRouter");
const notFoundError = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Middlewares
app.use(express.json());
// app routes
app.use("/api/v1/books", bookRouter);
// not found error
app.use(notFoundError);
// server error handler
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port : ${PORT}...`));

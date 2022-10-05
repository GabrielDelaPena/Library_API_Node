const express = require("express");

const bookController = require("../controller/book");

const router = express.Router();

// GET /books
router.get("/books", bookController.getBooks);

// POST /book
router.post("/book", bookController.addBook);

// GET /book/bookId
router.get("/book/:bookId", bookController.getBook);

// DELETE /book/bookId
router.delete("/book/:bookId", bookController.deleteBook);

// PUT /book/bookId
router.put("/book/:bookId", bookController.updateBook);

module.exports = router;

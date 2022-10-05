const Book = require("../models/book");

// Get all books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books: books });
    console.log("FETCHED ALL BOOKS");
  } catch (error) {
    console.log(err);
  }
};

// Get single book
exports.getBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    const fetchedBook = await Book.findById(bookId);
    if (!fetchedBook) {
      const error = new Error("Book could not find.");
      error.status = 404;
      throw error;
    }
    console.log("BOOK FETCHED");
    res
      .status(200)
      .json({ message: "Get single book successfully", book: fetchedBook });
  } catch (error) {
    console.log(error);
  }
};

// Add new book
exports.addBook = async (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const imageUrl = req.body.imageUrl;
  const year = req.body.year;
  const description = req.body.description;

  const book = new Book({
    title: title,
    author: author,
    imageUrl: imageUrl,
    year: year,
    description: description,
  });

  try {
    const existingBook = await Book.findOne({ title: title });
    if (existingBook) {
      const error = new Error("Book already exist.");
      error.status = 500;
      throw error;
    }

    const result = await book.save();
    console.log("BOOK ADDED");
    res
      .status(200)
      .json({ message: "New book added successfully", book: result });
  } catch (error) {
    console.log(error);
  }
};

// Delete single book
exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;

  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      const error = new Error("Book could not find. Delete unsuccessful.");
      error.status = 404;
      throw error;
    }

    const result = await Book.findByIdAndRemove(bookId);
    console.log("BOOK DELETED");
    res
      .status(200)
      .json({ message: "Book deleted successfully", result: result });
  } catch (error) {
    console.log(error);
  }
};

// Update single book
exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const title = req.body.title;
  const author = req.body.author;
  const imageUrl = req.body.imageUrl;
  const year = req.body.year;
  const description = req.body.description;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error("Book could not find. Update unsuccessful");
      error.status = 404;
      throw error;
    }

    book.title = title;
    book.author = author;
    book.imageUrl = imageUrl;
    book.year = year;
    book.description = description;

    const result = await book.save();
    console.log("BOOK UPDATED");
    res
      .status(200)
      .json({ message: "Book successfully updated.", result: result });
  } catch (error) {
    console.log(error);
  }
};

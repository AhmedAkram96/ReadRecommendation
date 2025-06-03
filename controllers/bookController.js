const bookService = require('../services/bookService');
const ApiError = require('../utils/ApiError');

const createBook = async (req, res, next) => {
  const book = await bookService.createBook(req.body);
  res.status(201).json(book);
};

const updateBook = async (req, res, next) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  if (!book) {
    return next(new ApiError(404, 'Book not found'));
  }
  res.status(200).json(book);
};

const getBook = async (req, res, next) => {
  const book = await bookService.getBook(req.params.id);
  if (!book) {
    return next(new ApiError(404, 'Book not found'));
  }
  res.status(200).json(book);
};

const getAllBooks = async (req, res, next) => {
  const books = await bookService.getAllBooks();
  res.status(200).json(books);
};

const getTopReadBooks = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 5;
  const books = await bookService.getTopReadBooks(limit);
  
  res.status(200).json({
    status: 'success',
    data: books
  });
};

module.exports = {
  createBook,
  updateBook,
  getBook,
  getAllBooks,
  getTopReadBooks
}; 
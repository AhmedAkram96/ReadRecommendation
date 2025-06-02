const Book = require('../models/Book');

class BookRepository {
  async create(bookData) {
    return await Book.create(bookData);
  }

  async update(id, bookData) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return await book.update(bookData);
  }

  async findById(id) {
    return await Book.findByPk(id);
  }

  async findAll() {
    return await Book.findAll();
  }
}

module.exports = new BookRepository(); 
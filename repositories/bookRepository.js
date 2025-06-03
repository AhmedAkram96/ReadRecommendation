const {Book, BookReadingStats} = require('../models');

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

  async getTopReadBooks(limit = 5) {
    return await Book.findAll({
      order: [
        ['totalReadPages', 'DESC'],
        ['createdAt', 'DESC'] // Secondary sort by creation date for books with same read pages
      ],
      limit
    });
  }
}

module.exports = new BookRepository(); 
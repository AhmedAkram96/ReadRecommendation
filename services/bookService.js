const bookRepository = require('../repositories/bookRepository');

class BookService {
  async createBook(bookData) {
    // Validate book data
    if (!bookData.name || !bookData.NoOfPages) {
      throw new Error('Name and number of pages are required');
    }

    if (bookData.NoOfPages <= 0) {
      throw new Error('Number of pages must be greater than 0');
    }

    return await bookRepository.create(bookData);
  }

  async updateBook(id, bookData) {
    // Validate book data
    if (bookData.NoOfPages && bookData.NoOfPages <= 0) {
      throw new Error('Number of pages must be greater than 0');
    }

    return await bookRepository.update(id, bookData);
  }

  async getBook(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  async getAllBooks() {
    return await bookRepository.findAll();
  }
}

module.exports = new BookService(); 
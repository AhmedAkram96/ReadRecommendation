const readingRepository = require('../repositories/readingRepository');
const bookRepository = require('../repositories/bookRepository');
const bookReadingStatsService = require('./bookReadingStatsService');
const ApiError = require('../utils/ApiError');

const createReading = async (readingData) => {
  // Validate that the book exists
  const book = await bookRepository.findById(readingData.bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  // Validate page numbers
  if (readingData.startPage > readingData.endPage) {
    throw new ApiError(400, 'Start page cannot be greater than end page');
  }

  if (readingData.endPage > book.NoOfPages) {
    throw new ApiError(400, 'End page cannot be greater than total book pages');
  }

  // Create the reading record
  const reading = await readingRepository.createReading(readingData);

  // Update book reading statistics
  await bookReadingStatsService.updateBookReadingStats(
    readingData.bookId,
    readingData.startPage,
    readingData.endPage
  );

  return reading;
};

const getReadingById = async (id) => {
  const reading = await readingRepository.getReadingById(id);
  if (!reading) {
    throw new ApiError(404, 'Reading record not found');
  }
  return reading;
};

const getUserReadings = async (userId) => {
  return await readingRepository.getUserReadings(userId);
};

const getBookReadings = async (bookId) => {
  // Validate that the book exists
  const book = await bookRepository.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }
  return await readingRepository.getBookReadings(bookId);
};

module.exports = {
  createReading,
  getReadingById,
  getUserReadings,
  getBookReadings
}; 
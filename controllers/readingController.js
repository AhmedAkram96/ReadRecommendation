const readingService = require('../services/readingService');
const ApiError = require('../utils/ApiError');

const createReading = async (req, res, next) => {
  const { bookId, startPage, endPage } = req.body;
  const userId = req.user.userId; // Get from authenticated user

  if (!bookId || !startPage || !endPage) {
    return next(new ApiError(400, 'Book ID, start page, and end page are required'));
  }

  const reading = await readingService.createReading({
    bookId,
    userId,
    startPage,
    endPage
  });

  res.status(201).json({
    status: 'success',
    data: reading
  });
};

const getReadingById = async (req, res, next) => {
  const { id } = req.params;
  const reading = await readingService.getReadingById(id);
  res.status(200).json({
    status: 'success',
    data: reading
  });
};

const getUserReadings = async (req, res, next) => {
  const userId = req.user.userId; // Get from authenticated user
  const readings = await readingService.getUserReadings(userId);
  res.status(200).json({
    status: 'success',
    data: readings
  });
};

const getBookReadings = async (req, res, next) => {
  const { bookId } = req.params;
  const readings = await readingService.getBookReadings(bookId);
  res.status(200).json({
    status: 'success',
    data: readings
  });
};

module.exports = {
  createReading,
  getReadingById,
  getUserReadings,
  getBookReadings
}; 
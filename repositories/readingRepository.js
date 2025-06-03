const {Reading} = require('../models');

const createReading = async (readingData) => {
  return await Reading.create(readingData);
};

const getReadingById = async (id) => {
  return await Reading.findByPk(id);
};

const getUserReadings = async (userId) => {
  return await Reading.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });
};

const getBookReadings = async (bookId) => {
  return await Reading.findAll({
    where: { bookId },
    order: [['createdAt', 'DESC']]
  });
};

module.exports = {
  createReading,
  getReadingById,
  getUserReadings,
  getBookReadings
}; 
const {BookReadingStats, Book} = require('../models');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');

// Helper function to merge overlapping ranges
const mergeRanges = (ranges) => {
  if (!ranges || ranges.length === 0) return [];
  
  // Sort ranges by start page
  const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged = [];
  let current = sortedRanges[0];

  for (let i = 1; i < sortedRanges.length; i++) {
    const currentEnd = current[1];
    const nextStart = sortedRanges[i][0];
    const nextEnd = sortedRanges[i][1];

    if (currentEnd >= nextStart) {
      // Ranges overlap, merge them
      current = [current[0], Math.max(currentEnd, nextEnd)];
    } else {
      // No overlap, add current to merged and update current
      merged.push(current);
      current = sortedRanges[i];
    }
  }
  merged.push(current);
  return merged;
};

// Helper function to calculate total pages from ranges
const calculateTotalPages = (ranges) => {
  if (!ranges || ranges.length === 0) return 0;
  
  // First merge any overlapping ranges
  const mergedRanges = mergeRanges(ranges);
  
  // Calculate total pages from merged ranges
  return mergedRanges.reduce((total, range) => {
    const [start, end] = range;
    if (isNaN(start) || isNaN(end)) return total;
    return total + (end - start + 1);
  }, 0);
};

const updateBookReadingStats = async (bookId, startPage, endPage) => {
  // Get or create stats for the book
  let [stats, created] = await BookReadingStats.findOrCreate({
    where: { bookId },
    defaults: {
      readRanges: []
    }
  });

  // Get existing ranges and add new range
  let ranges = [...stats.readRanges];
  ranges.push([startPage, endPage]);
  
  // Merge overlapping ranges
  const mergedRanges = mergeRanges(ranges);
  
  // Calculate new total
  const totalReadPages = calculateTotalPages(mergedRanges);
  
  // Update both BookReadingStats and Book
  await Promise.all([
    stats.update({
      readRanges: mergedRanges
    }),
    Book.update(
      { totalReadPages },
      { where: { id: bookId } }
    )
  ]);

  return stats;
};

const getBookReadingStats = async (bookId) => {
  const stats = await BookReadingStats.findOne({
    where: { bookId }
  });

  if (!stats) {
    throw new ApiError(404, 'Reading statistics not found for this book');
  }

  return stats;
};

module.exports = {
  updateBookReadingStats,
  getBookReadingStats
}; 
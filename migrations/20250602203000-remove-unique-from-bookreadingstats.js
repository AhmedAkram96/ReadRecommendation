'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, drop the unique constraint
    await queryInterface.removeConstraint(
      'BookReadingStats',
      'BookReadingStats_bookId_key'
    );

    // Then, drop the unique index if it exists
    await queryInterface.removeIndex(
      'BookReadingStats',
      'BookReadingStats_bookId_key'
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the unique constraint
    await queryInterface.addConstraint('BookReadingStats', {
      fields: ['bookId'],
      type: 'unique',
      name: 'BookReadingStats_bookId_key'
    });
  }
}; 
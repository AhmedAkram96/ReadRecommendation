'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, drop the existing column
    await queryInterface.removeColumn('BookReadingStats', 'readRanges');

    // Then add the new column with the correct type
    await queryInterface.addColumn('BookReadingStats', 'readRanges', {
      type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
      allowNull: false,
      defaultValue: []
    });
  },

  down: async (queryInterface, Sequelize) => {
    // First, drop the new column
    await queryInterface.removeColumn('BookReadingStats', 'readRanges');

    // Then add back the original column
    await queryInterface.addColumn('BookReadingStats', 'readRanges', {
      type: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.INTEGER)),
      allowNull: false,
      defaultValue: []
    });
  }
}; 
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('BookReadingStats', 'totalReadPages');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('BookReadingStats', 'totalReadPages', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  }
}; 
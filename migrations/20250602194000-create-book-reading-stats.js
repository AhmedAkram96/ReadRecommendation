'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BookReadingStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Books',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      readRanges: {
        type: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.INTEGER)),
        allowNull: false,
        defaultValue: []
      },
      totalReadPages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add index for bookId
    await queryInterface.addIndex('BookReadingStats', ['bookId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BookReadingStats');
  }
}; 
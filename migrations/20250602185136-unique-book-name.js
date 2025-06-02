'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, remove any duplicate names if they exist
    await queryInterface.sequelize.query(`
      DELETE FROM "Books" a USING (
        SELECT MIN(id) as id, name
        FROM "Books"
        GROUP BY name
        HAVING COUNT(*) > 1
      ) b
      WHERE a.name = b.name AND a.id != b.id
    `);

    // Then add the unique constraint
    await queryInterface.addConstraint('Books', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_book_name'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique constraint
    await queryInterface.removeConstraint('Books', 'unique_book_name');
  }
};

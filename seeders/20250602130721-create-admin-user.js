'use strict';
const bcrypt = require('bcrypt'); // Hash the password

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin', 10);

    const [results, metadata] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "Users";`
    );

    if (parseInt(results[0].count) === 0) {
      return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: hashedPassword,
        userLevel: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    } else {
      console.log('⚠️ Users table already has data. Skipping seed.');
      return Promise.resolve();
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};

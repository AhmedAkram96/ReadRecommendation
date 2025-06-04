const request = require('supertest');
const app = require('../../index');
const { sequelize } = require('../setup');

const testUtils = {
  // Helper to make HTTP requests
  request: () => request(app),

  // Helper to create test data
  createTestData: async (model, data) => {
    return await model.create(data);
  },

  // Helper to clean up test data
  cleanupTestData: async (model) => {
    await model.destroy({ where: {}, force: true });
  },

  // Helper to get database connection
  getDbConnection: () => sequelize,

  // Helper to run database transactions
  runInTransaction: async (callback) => {
    const transaction = await sequelize.transaction();
    try {
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  // Helper to generate test JWT token
  generateTestToken: (user) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign(
      { userId: user.id, username: user.username, userLevel: user.userLevel },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  },
};

module.exports = testUtils; 
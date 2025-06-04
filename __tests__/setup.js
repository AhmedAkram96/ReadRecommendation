const { Sequelize } = require('sequelize');
const { execSync } = require('child_process');
const path = require('path');
const config = require('../config/config');

// Test database configuration
const sequelize = new Sequelize(config.test);

// Helper function to wait for database to be ready
const waitForDatabase = async (maxRetries = 30) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      return true;
    } catch (error) {
      console.log(`Waiting for database to be ready... Attempt ${i + 1}/${maxRetries}`);
      console.log('Connection error:', error.message);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Increased wait time
    }
  }
  throw new Error('Database connection failed after maximum retries');
};

// Global setup - runs once before all tests
beforeAll(async () => {
  try {
    // Wait for database to be ready
    await waitForDatabase();

    // Run migrations
    console.log('Running migrations...');
    execSync('npx sequelize-cli db:migrate', {
      env: {
        ...process.env,
        NODE_ENV: 'test'
      },
      stdio: 'inherit'
    });

    // Run seeders if needed
    // execSync('npx sequelize-cli db:seed:all', {
    //   env: {
    //     ...process.env,
    //     NODE_ENV: 'test'
    //   },
    //   stdio: 'inherit'
    // });
  } catch (error) {
    console.error('Error in global setup:', error);
    throw error;
  }
}, 120000); // Increased timeout to 2 minutes

// Global teardown - runs once after all tests
afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Error in global teardown:', error);
    throw error;
  }
}, 30000);

// Before each test - runs before each test
beforeEach(async () => {
  // Clear all tables
  const models = require('../models');
  for (const model of Object.values(models)) {
    if (model.destroy) {
      await model.destroy({ where: {}, force: true });
    }
  }
});

// Export sequelize instance for use in tests
module.exports = {
  sequelize,
}; 
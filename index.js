// index.js
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const readingRoutes = require('./routes/readingRoutes');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const config = require('./config/config');


// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Only exit in non-test environment
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

// Routes
app.get('/', (req, res) => {
  res.send('Read recommendation Server is running!');
});
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/readings', readingRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server only in non-test environment
if (process.env.NODE_ENV !== 'test') {
  testConnection().then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Read recommendation Server is running on port ${process.env.PORT || 3000}`);
    });
  });
}

// shutdown function
const shutdown = async () => {
  console.log('Received shutdown signal, closing server...');
  server.close(async () => {
    try {
      await sequelize.close();
      console.log('Database connection closed.');
      console.log('Server closed, exiting process.');
      process.exit(0);
    } catch (error) {
      console.error('Error closing database connection:', error);
      process.exit(1);
    }
  });

  // Force exit if server doesn't close in 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = app;
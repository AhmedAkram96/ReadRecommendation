// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const sequelize = require('./config/database');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Read recommendation Server is running!');
});
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

// Database connection and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Sync database (creates tables if they don't exist)
    await sequelize.sync();
    console.log('Database synchronized successfully');

    // Start the server
    server.listen(PORT, () => {
      console.log(`Read recommendation Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

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
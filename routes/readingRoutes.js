const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');
const {authenticate} = require('../middlewares/authnMiddleware');

// All routes require authentication
router.use(authenticate);

// Create a new reading record
router.post('/', readingController.createReading);

// Get a specific reading record
router.get('/:id', readingController.getReadingById);

// Get all readings for the authenticated user
router.get('/user/me', readingController.getUserReadings);

// Get all readings for a specific book
router.get('/book/:bookId', readingController.getBookReadings);

module.exports = router; 
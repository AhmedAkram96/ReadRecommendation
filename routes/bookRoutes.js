// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authnMiddleware');
const { authorize } = require('../middlewares/authzMiddleware');
const { Roles } = require('../middlewares/authzMiddleware');

const router = express.Router();

// Protected routes
router.use(authenticate);

// Admin only routes
router.post('/', authorize(Roles.admin), bookController.createBook);
router.put('/:id', authorize(Roles.admin), bookController.updateBook);

// User routes
router.get('/top-read', bookController.getTopReadBooks);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);

module.exports = router; 
// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authnMiddleware');
const { authorize } = require('../middlewares/authzMiddleware');
const { Roles } = require('../middlewares/authzMiddleware');

const router = express.Router();

// Authenticated user routes
router.get('/', authenticate, authorize(Roles.user), bookController.getAllBooks);
router.get('/:id', authenticate, authorize(Roles.user), bookController.getBook);

// Protected routes (admin only)
router.post('/', authenticate, authorize(Roles.admin), bookController.createBook);
router.put('/:id', authenticate, authorize(Roles.admin), bookController.updateBook);

module.exports = router; 
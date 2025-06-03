const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Sequelize unique constraint violations
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0].path;
    const value = err.errors[0].value;
    err = new ApiError(409, `${field} with value '${value}' already exists`);
  }

  // Handle PostgreSQL unique constraint violations
  if (err.code === '23505') {
    const field = err.constraint.split('_')[1]; // Extract field name from constraint name
    const value = err.parameters[0];
    err = new ApiError(409, `${field} with value '${value}' already exists`);
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message).join(', ');
    err = new ApiError(400, message);
  }

  // Handle Sequelize foreign key violations
  if (err.code === '23503') {
    err = new ApiError(400, 'Referenced record does not exist');
  }

  // Handle Sequelize not found errors
  if (err.name === 'SequelizeEmptyResultError') {
    err = new ApiError(404, 'Record not found');
  }

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode
    if (err.isOperational) {
      // Operational, trusted error: send message to client
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // Programming or other unknown error: don't leak error details
      console.error('ERROR', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }
};

module.exports = errorHandler; 
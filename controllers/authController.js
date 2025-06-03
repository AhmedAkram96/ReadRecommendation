// controllers/authController.js
const authService = require('../services/authService');
const ApiError = require('../utils/ApiError');

const signup = async (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return next(new ApiError(400, 'Username and password are required'));
  }

  const user = await authService.signup(username, password);
  const { password: _, ...safeUser } = user.toJSON();
  res.status(201).json({ message: 'User created', safeUser });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ApiError(400, 'Username and password are required'));
  }

  const { user, token } = await authService.login(username, password);
  const { password: _, ...safeUser } = user.toJSON();
  res.status(200).json({ message: 'Login successful', safeUser, token });
};

module.exports = {
  signup,
  login,
};
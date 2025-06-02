// repositories/userRepository.js
const User = require('../models/User');

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

const findUserById = async (userId) => {
  return await User.findByPk(userId);
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById
};
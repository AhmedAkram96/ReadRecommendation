// services/authService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser({ 
    username, 
    password: hashedPassword, 
    userLevel: 'user' 
  });
};

const login = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, username: user.username, userLevel: user.userLevel },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};

module.exports = {
  signup,
  login,
};
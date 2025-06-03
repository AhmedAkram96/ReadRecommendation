// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Reading = require('./Reading');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userLevel: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true
});

module.exports = User;


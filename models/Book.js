const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Book extends Model {}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  NoOfPages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalReadPages: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'Books',
  timestamps: true
});

module.exports = Book; 
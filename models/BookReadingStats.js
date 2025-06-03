const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BookReadingStats extends Model {}

BookReadingStats.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id'
    }
  },
  readRanges: {
    type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
    allowNull: false,
    defaultValue: []
  }
}, {
  sequelize,
  modelName: 'BookReadingStats',
  tableName: 'BookReadingStats',
  timestamps: true
});

module.exports = BookReadingStats; 
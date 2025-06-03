const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Reading extends Model {}

Reading.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id'
    }
  },
  startPage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  endPage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
}, {
  sequelize,
  modelName: 'Reading',
  tableName: 'Readings',
  timestamps: true
});

module.exports = Reading; 
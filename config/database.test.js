require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'mydb_test',
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'mydb_test',
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}; 
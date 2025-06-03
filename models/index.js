const Book = require('./Book');
const BookReadingStats = require('./BookReadingStats');
const Reading = require('./Reading'); // if you have it
const User = require('./User');

Book.hasMany(BookReadingStats, { foreignKey: 'bookId', as: 'readingStats' });
BookReadingStats.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

Book.hasMany(Reading, { foreignKey: 'bookId', as: 'bookReadings' });
Reading.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

User.hasMany(Reading, { foreignKey: 'userId', as: 'userReadings' });
Reading.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  Book,
  BookReadingStats,
  Reading,
  User
};

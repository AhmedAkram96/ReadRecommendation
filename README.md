# Read Recommendation System

A robust book recommendation system built with Node.js, Express, and PostgreSQL, following the N-Tier architecture pattern. This system allows users to track their reading progress, get book recommendations, and manage their reading lists.

## Features

- **User Management**
  - User registration and authentication
  - Role-based access control (Admin/User)
  - JWT-based authentication

- **Book Management**
  - CRUD operations for books
  - Book metadata tracking (pages, read status)
  - Reading progress tracking

- **Reading Statistics**
  - Track reading progress
  - Calculate reading statistics
  - View reading history

- **Top Rating Logic**
  - Track unique page ranges for each book
  - Merge overlapping reading ranges
  - Calculate total unique pages read
  - Update book statistics automatically

  The system implements a sophisticated algorithm for tracking reading progress:
  1. Each book maintains a collection of unique page ranges
  2. When a user submits a new reading:
     - System retrieves all existing unique ranges for the book
     - New reading range is merged with existing ranges
     - Overlapping ranges are consolidated
     - Total unique pages are recalculated
     - Book's reading statistics are updated

## Technology Stack

- **Backend**
  - Node.js
  - Express.js
  - Sequelize ORM
  - PostgreSQL
  - JWT Authentication

- **Testing**
  - Jest
  - Supertest
  - Docker for test environment

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:AhmedAkram96/ReadRecommendation.git
   cd readrecommendation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   # Development environment
   cp .env
   
   # Test environment
   cp .env.test
   ```

4. Configure environment variables in `.env` and `.env.test` files.

## Running the Application

### Development Mode

1. Start the application using Docker:
   ```bash
   docker-compose up --build
   ```

2. Or run locally:
   ```bash
   npm start
   ```

The server will start on port 3000 by default.

### Testing

1. Run tests with Docker:
   ```bash
   npm run test:docker
   ```

2. Run tests locally:
   ```bash
   npm test
   ```

## Project Structure

```
readrecommendation/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middlewares/        # Custom middleware
├── models/            # Database models
├── repositories/      # Data access layer
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Utility functions
├── migrations/        # Database migrations
├── seeders/          # Database seeders
└── __tests__/        # Test files
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book (Admin only)
- `PUT /books/:id` - Update book (Admin only)

### Readings
- `POST /readings` - Create reading record
- `GET /readings/user` - Get user's reading history
- `GET /readings/book/:id` - Get book's reading records

## Testing Strategy

The project uses Jest for testing with the following test types:
- Unit tests for individual components
- Integration tests for API endpoints

Test environment uses a separate PostgreSQL database in Docker to ensure test isolation.

## Database Migrations

Run migrations:
```bash
npx sequelize-cli db:migrate
```

Undo migrations:
```bash
npx sequelize-cli db:migrate:undo
```


## 🔍 Error Handling

The application uses a centralized error handling system:
- Custom `ApiError` class for consistent error responses
- Error logging middleware
- Proper HTTP status codes

## Security

- JWT-based authentication
- Password hashing
- Input validation
- SQL injection prevention through Sequelize

note: If you tried to run the app after testing, make sure ti run the following commands to avoid network issues:

- docker-compose -f docker-compose.test.yml down -v
- docker-compose down -v
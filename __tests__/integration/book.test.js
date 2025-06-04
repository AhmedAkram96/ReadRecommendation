const testUtils = require('../helpers/testUtils');
const { User, Book } = require('../../models');
const { Roles } = require('../../middlewares/authzMiddleware');
const request = require('supertest');
const app = require('../../index');

describe('Book API Integration Tests', () => {
  let adminToken;
  let userToken;
  let testBook;
  let adminUser;
  let regularUser;
  
  // Static test book data matching the Book model
  const testBookData = {
    name: 'Test Book',
    NoOfPages: 200,
    totalReadPages: 0
  };

  // Setup test data before all tests
  beforeAll(async () => {
    // Create test users
    adminUser = await User.create({
      username: 'admin',
      password: 'adminpass',
      userLevel: 'admin'
    });

    regularUser = await User.create({
      username: 'user',
      password: 'userpass',
      userLevel: 'user'
    });

    adminToken = testUtils.generateTestToken(adminUser);
    userToken = testUtils.generateTestToken(regularUser);
  });

  // Setup test data before each test
  beforeEach(async () => {
    // Create a test book before each test
    testBook = await Book.create(testBookData);
  });

  // Clean up after each test
  afterEach(async () => {
    await Book.destroy({ where: {} });
  });

  // Clean up after all tests
  afterAll(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /books', () => {
    it('should create a new book when admin is authenticated', async () => {
      const newBookData = {
        name: 'Another Test Book',
        NoOfPages: 300,
        totalReadPages: 0
      };

      const response = await testUtils.request()
        .post('/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBookData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newBookData.name);
      expect(response.body.NoOfPages).toBe(newBookData.NoOfPages);
      expect(response.body.totalReadPages).toBe(newBookData.totalReadPages);
    });

    it('should return 403 when non-admin user tries to create a book', async () => {
      const response = await testUtils.request()
        .post('/books')
        .set('Authorization', `Bearer ${userToken}`)
        .send(testBookData);

      expect(response.status).toBe(403);
    });
  });

  describe('GET /books', () => {
    it('should return all books for authenticated user', async () => {
      const response = await testUtils.request()
        .get('/books')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      // Verify our test book is in the response
      expect(response.body.some(book => book.name === testBookData.name)).toBe(true);
    });

    it('should return 401 when no token is provided', async () => {
      const response = await testUtils.request()
        .get('/books');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /books/:id', () => {
    it('should return a specific book by id', async () => {
      const response = await testUtils.request()
        .get(`/books/${testBook.id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(testBook.id);
      expect(response.body.name).toBe(testBookData.name);
      expect(response.body.NoOfPages).toBe(testBookData.NoOfPages);
      expect(response.body.totalReadPages).toBe(testBookData.totalReadPages);
    });

    it('should return 404 for non-existent book', async () => {
      const response = await testUtils.request()
        .get('/books/99999')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book when admin is authenticated', async () => {
      const updateData = {
        name: 'Updated Book Name',
        NoOfPages: 250,
        totalReadPages: 50
      };

      const response = await testUtils.request()
        .put(`/books/${testBook.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
      expect(response.body.NoOfPages).toBe(updateData.NoOfPages);
      expect(response.body.totalReadPages).toBe(updateData.totalReadPages);
    });

    it('should return 403 when non-admin user tries to update a book', async () => {
      const updateData = {
        name: 'Unauthorized Update',
        NoOfPages: 400
      };

      const response = await testUtils.request()
        .put(`/books/${testBook.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData);

      expect(response.status).toBe(403);
    });
  });
}); 
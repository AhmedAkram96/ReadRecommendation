# ReadRecommendation

This is the proposed solution for the task provided by Octane

## User Functionality

1. Admin can add/update books
2. All users can view all or one book
3. All users can submit readings
4. All users can ask for top read book (by unique pages)

### top rating logic:
- we keep track of all the submitted readings for the same book as unique ranges.
- Whenever the user submit a new reading:
    - We get all that book unique ranges
    - Insert the new reading in a way that keeps all the ranges unique (unique range merge technique)
    - Count all the unique pages represented by these unqiue ranges and update the Book unique pages.


## Development Functionality:

1. Node.js and Express server
2. Postgresql as DB
3. Authentication provided using JWT
4. Authorization middleware to enforce user level permissions
5. Error handling Middleware to catch thrown errors in the application layer
6. Seeding script to create admin user
7. Containerized dev app using docker-compose:
    - Server container
    - Database container
8. Containerized test app using docker-compose:
    - Database container
9. Test cases sample for booking creation (to be extended)

## How to run

### Run app locally:
1. Open temrinal in the root of the app and run `docker-compose up --build`
2. use the `postmanCollection/Octane.json` collection to test the server endpoints

### Test app:
1. Run `npm run test:docker`


note: If you tried to run the app after testing, make sure ti run the following commands to avoid network issues:
- `docker-compose -f docker-compose.test.yml down -v`
- `docker-compose down -v`


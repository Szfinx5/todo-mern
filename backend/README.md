# TODO App Backend Documentation

## Project Description
This project is a backend for a TODO application built with Node.js, Express, and MongoDB using Mongoose. It provides API endpoints for CRUD operations (Create, Read, Update, Delete) and implements routes for user authentication and task management. Middleware is used for authorization to ensure only authorized requests can perform certain operations.

## API Endpoints

### User Routes
- **POST /api/user/register**: Register a new user.
- **POST /api/user/login**: Log in an existing user.
- **GET /api/user/logout**: Log out the current user.
- **GET /api/user/me**: Get the details of the logged-in user (requires authentication).

### Task Routes
- **GET /api/task/**: Retrieve all tasks for the logged-in user (requires authentication).
- **POST /api/task/**: Add a new task for the logged-in user (requires authentication).
- **PATCH /api/task/:id**: Edit an existing task by ID (requires authentication).
- **DELETE /api/task/:id**: Delete an existing task by ID (requires authentication).

## Authentication
Authentication is handled using JWT (JSON Web Tokens). The token is stored in an HTTP-only cookie to enhance security. The `auth` middleware is used to protect routes that require authentication.

### Middleware
- **authMiddleware.js**: Middleware to authenticate the user based on the JWT token stored in the cookie. If the authentication is successful, the userId is added to the request object for further use.

## Utilities
- **helpers.js**: Contains helper functions such as `isEmpty`, `logger`, `formatBody`, and `generateToken`.
- **config.js**: Contains the function to connect to the MongoDB database.

## Models
- **user.js**: Defines the User schema with fields for name, email, and password.
- **task.js**: Defines the Task schema with fields for userId, category, description, priority, and completed status.

## Controllers
- **userController.js**: Contains functions for user registration, login, logout, and verification.
- **taskController.js**: Contains functions for fetching, adding, editing, and deleting tasks.

## Running the Project
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with the following environment variables:
   - `MONGODB_URI`: MongoDB connection string.
   - `JWT_SECRET`: digital
   - `PORT`: Port number for the server (default is 5000).
4. Start the server using `npm start`.

## Docker
The project can be containerized using Docker. Ensure you have Docker installed and follow the steps below:
1. Build the Docker image: `docker build -t todo-app-backend .`
2. Run the Docker container: `docker run -p 5000:5000 todo-app-backend`
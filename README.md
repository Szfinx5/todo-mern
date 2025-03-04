# TODO App Full Stack Documentation

## Project Description
This project is a full stack TODO application built with Node.js, Express, MongoDB, and Next.js. It supports separate user accounts and allows users to manage their tasks. Each task contains a category, description, and status (Complete/Incomplete). The application is responsive and usable on various screen sizes.

## Backend
More details can be found in the backend folder: https://github.com/bloc-digital/Gabor-Havasi-fs-take-home/tree/todo-app-container/backend

### Tech stack
1. Node.js
2. Express.js
3. bcryptjs
4. JWT
5. MongoDB

### Running the Backend locally
1. Clone the repository.
2. Install MongoDB locally if you don't already have it.
3. Navigate to the backend directory: `cd backend`.
4. Install dependencies using `npm install`.
5. Create a `.env` file with the following environment variables:
   - `MONGODB_URI`: MongoDB connection string.
   - `JWT_SECRET`: digital
   - `PORT`: Port number for the server (default is 5000).
6. Start the server using `npm start`.

### Docker for Backend
1. Build the Docker image: `docker build -t todo-app-backend .`
2. Run the Docker container: `docker run -p 5000:5000 todo-app-backend`

## Frontend
For more information, check the frontend folder: https://github.com/bloc-digital/Gabor-Havasi-fs-take-home/tree/todo-app-container/frontend

### Tech stack
1. Next.js
2. Axios
3. Universal-cookies

### Running the Frontend
1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`.
3. Install dependencies using `npm install`.
4. Create a `.env.local` file with the following environment variables:
   - `NEXT_PUBLIC_API_URL`: URL of the backend API.
5. Start the development server using `npm run dev`.

### Docker for Frontend
1. Build the Docker image: `docker build -t todo-app-frontend .`
2. Run the Docker container: `docker run -p 3000:3000 todo-app-frontend`

## Docker Compose
The project can be run using Docker Compose. Follow the steps below:
1. Navigate to the project root directory.
2. Run `docker-compose up --build` to build and start the services.

## Future Improvements
Given more time, I would have implemented the reverse proxy requirement as well. Additionally, I would have created a hybrid or fully cloud-native application if I was given a free hand to put together the requirement. This approach would have resulted in a more robust, highly available, and less maintenance-intensive application.
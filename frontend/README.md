# TODO App Frontend Documentation

## Project Description
This project is a frontend for a TODO application built with Next.js. It provides a simple user interface with components to display data from the backend API. Users can register, log in, and manage their tasks. The application is responsive and usable on various screen sizes.

## Pages

### Tasks Page
- **Path**: `/tasks`
- **Description**: Displays the list of tasks for the logged-in user. Users can add, delete, and mark tasks as complete or incomplete. Tasks can be filtered, sorted, and searched.

### Register Page
- **Path**: `/register`
- **Description**: Provides a form for new users to register an account.

### Login Page
- **Path**: `/login`
- **Description**: Provides a form for existing users to log in.

### Not Found Page
- **Path**: `/404`
- **Description**: Displays a message when the user navigates to a non-existent page.

### App Component
- **Path**: `/_app`
- **Description**: The root component that wraps all pages. It includes global styles and metadata.

## Components

### Tasks
- **Path**: `/components/Tasks`
- **Description**: Fetches and displays the list of tasks. Allows users to add new tasks, filter, sort, and search tasks.

### TaskItem
- **Path**: `/components/TaskItem`
- **Description**: Represents a single task item. Allows users to mark tasks as complete or incomplete and delete tasks.

### Register
- **Path**: `/components/Register`
- **Description**: Provides a form for new users to register an account.

### Navbar
- **Path**: `/components/NavBar`
- **Description**: Displays the navigation bar with links to login, register, or logout.

### Login
- **Path**: `/components/Login`
- **Description**: Provides a form for existing users to log in.

## Helpers

### useVerifyUser
- **Path**: `/helpers`
- **Description**: Custom hook to verify if the user is logged in.

## Running the Project
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env.local` file with the following environment variables:
   - `NEXT_PUBLIC_API_URL`: http://localhost:5000/api.
4. Start the development server using `npm run dev`.

## Docker
The project can be containerized using Docker. Ensure you have Docker installed and follow the steps below:
1. Build the Docker image: `docker build -t todo-app-frontend .`
2. Run the Docker container: `docker run -p 3000:3000 todo-app-frontend`
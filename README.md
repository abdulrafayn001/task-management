# Task Management API

This project provide RESTful API suit for User and Project management built with Node.js, Express.js, TypeScript, and SQLite. It features Role-Based Access Control (RBAC) and secure task management.

## Features

- User authentication and authorization
- Role-Based Access Control (RBAC) with four user roles:
  - Super Admin
  - Admin
  - Editor
  - Viewer
- Task management with user-specific access control
- RESTful API design
- SQLite database for data storage

## Prerequisites

- Node.js v20.16.0
- npm (Node Package Manager)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/abdulrafayn001/task-management.git

   cd task-management
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_here
   SUPER_USER_EMAIL=superadmin@example.com
   SUPER_USER_PASSWORD=your_secure_password_here
   ```
   You can change the PORT number if needed. Set NODE_ENV to 'production' for production environments. Make sure to set a secure password for the SUPER_USER_PASSWORD.

4. Build the TypeScript files:
   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```

   For development with auto-restart on file changes:
   ```
   npm run start:dev
   ```

The server will start running at `http://localhost:3000` (or the port you specified in the `secrets.ts` file).

## Super User Setup

During the initial database setup, a super user will be automatically created using the email and password specified in the .env file. This super user has full access to all functionalities of the API.

If you need to change the super user's password after initial setup, you can do so by logging in as the super user and using the user update endpoint.

## API Endpoints

### Authentication

- `POST /api/register`: Register a new user
- `POST /api/login`: Login and receive a JWT

### User Management

- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user
- `PUT /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user

### Task Management

- `POST /api/tasks`: Create a new task
- `GET /api/tasks`: Get all tasks for the authenticated user
- `GET /api/tasks/:id`: Get a specific task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

## Role-Based Access Control (RBAC)

The API implements RBAC with four user roles:

1. Super Admin: Has full access to all functionalities
2. Admin: Can manage users and has full access to tasks but cannot change user role
3. Editor: Can create, read, update, and delete their own tasks
4. Viewer: Can only view their own tasks

Users can only access and modify their own tasks, regardless of their role.

## Authentication

To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios:

- 200: Successful operation
- 201: Resource created successfully
- 400: Bad request or validation error
- 401: Unauthorized access
- 403: Forbidden (insufficient permissions)
- 404: Resource not found
- 500: Internal server error

## Data Validation

The API implements data validation for all input data to ensure data integrity and prevent invalid data from being processed or stored.

## Security Measures

- Password hashing using bcrypt
- JWT for secure authentication
- Input validation to prevent injection attacks
- Role-based access control for authorization

## Future Improvements

- Implement rate limiting to prevent abuse
- Add unit and integration tests
- Implement database migrations for easier schema management
- Add API documentation using tools like Swagger
- Implement pagination and sorting for the task list
- Add the ability to search and filter tasks based on various criteria (e.g., title, status, user)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

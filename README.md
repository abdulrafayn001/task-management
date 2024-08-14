# Task Management API

This is a RESTful API for User and Task management built with Node.js, Express.js, and SQLite.

## Prerequisites

- Node.js (v20.16.0)
- npm (Node Package Manager)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd task-management-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=jwt_secret
   ```
   You can change the PORT number if needed.
   Set NODE_ENV to 'production' for production environments.

4. Start the server:
   ```
   npm run start:dev
   ```

The server will start running at `http://localhost:3000` (or the port you specified in the .env file).

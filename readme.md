# CookstoriaCulinary Backend

This is the backend server for CookstoriaCulinary, built using Express.js and MongoDB. The backend manages user authentication, recipe management, admin controls, and premium membership features. It follows a modular architecture and includes global error handling for a robust, maintainable structure.

## Features

- **User Authentication & Management:**

  - Custom login, registration, password reset, and profile update functionality.
  - Role-based access control (regular users, admins).

- **Recipe Management:**

  - Users can create, update, and delete their own recipes.
  - Admins can manage all user recipes.
  - Users can **upvote**, **downvote**, **rate**, and **comment** on recipes also **follow** and **unfollow** other users, encouraging community interaction.

- **Admin Controls:**

  - Admins can manage users, promote users to admin, and oversee recipe content.

- **Global Error Handling:**

  - Unified error handling mechanism with structured responses across the entire application.

- **Modular Architecture:**
  - Separation of concerns through modules for users, recipes, authentication, and admin functionality.

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB using Mongoose for data modeling
- **Authentication:** JWT (JSON Web Tokens) for secure authentication
- **Error Handling:** Centralized middleware for global error handling

## Project Structure

The backend follows a modular architecture to keep the codebase organized and maintainable:

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/webashraf/cookstoria-server
   ```

2. Navigate to the project directory:

   ```bash
   cd cookstoria-server

   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables in a `.env` file:

   ```bash
   PORT=5000
   NODE_ENV=development
   BCRYPT_SALT=12
   JWT_ACCESS_SECRET=--
   JWT_REFRESH_SECRET=--
   JWT_ACCESS_EXPIRE_IN=7d
   JWT_REFRESH_EXPIRE_IN=1y
   CLOUDINARY_NAME=--
   CLOUDINARY_API_KEY=--
   CLOUDINARY_SECRET=--
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. The backend will be running at `http://localhost:5000`.

# MERN Authentication & Profile Management System

A full-stack user authentication and profile management system built using the MERN stack. The application allows users to register, log in securely, manage their profiles, change their passwords, and log out.

## Features

* User registration
* Secure password hashing using bcrypt
* Duplicate email prevention
* User login with JWT authentication
* Protected API routes
* Get logged-in user profile
* Update user profile
* Change password
* User logout
* Protected frontend routes
* Authentication token management
* Session persistence after page refresh
* API validation and error handling
* Responsive user interface using Tailwind CSS

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* CORS
* dotenv

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* React Router
* Axios
* Vite

## Project Structure

```text
mern-auth-app/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── ChangePassword.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── App.tsx
│   └── package.json
│
├── .gitignore
└── README.md
```

## Environment Variables

Create a `.env` file inside the `backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

A `.env.example` file is included in the repository as a reference.

> Never commit the actual `.env` file or expose database credentials and JWT secrets.

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd mern-auth-app
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create the `.env` file using the variables described above.

### 3. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Start the frontend

```bash
npm run dev
```

The frontend runs on the Vite development server, normally:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

| Method | Endpoint    | Description           | Protected |
| ------ | ----------- | --------------------- | --------- |
| POST   | `/register` | Register a new user   | No        |
| POST   | `/login`    | Login and receive JWT | No        |
| POST   | `/logout`   | Logout user           | Yes       |

### Profile

| Method | Endpoint           | Description                  | Protected |
| ------ | ------------------ | ---------------------------- | --------- |
| GET    | `/profile`         | Get logged-in user's profile | Yes       |
| PUT    | `/profile`         | Update name and email        | Yes       |
| PUT    | `/change-password` | Change user password         | Yes       |

Protected requests require a JWT:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Frontend Pages

### Register

Allows new users to create an account using:

* Name
* Email
* Password

### Login

Authenticates the user and stores the returned JWT token in browser local storage.

### Dashboard

Displays the logged-in user's information and provides navigation to:

* Profile
* Change Password
* Logout

### Profile

Allows the authenticated user to:

* View their profile
* Update their name
* Update their email

### Change Password

Allows the authenticated user to:

* Enter their current password
* Set a new password
* Confirm the new password

## Authentication Flow

```text
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in MongoDB
   ↓
Login
   ↓
JWT generated
   ↓
JWT stored in localStorage
   ↓
Protected Route
   ↓
JWT attached to Axios requests
   ↓
Backend authMiddleware verifies JWT
   ↓
Authenticated API access
```

## Security

* Passwords are never stored as plain text.
* Passwords are hashed using bcrypt.
* JWT is used to authenticate protected API requests.
* Duplicate email registration is prevented.
* Protected frontend routes require an authentication token.
* Protected backend routes verify the JWT before processing requests.
* Environment variables are used for sensitive configuration.

## Validation & Error Handling

The application validates required request fields and returns appropriate HTTP status codes for common scenarios, including:

* Missing required fields
* Invalid credentials
* Duplicate email
* Incorrect old password
* Unauthorized requests
* User not found
* Server errors

The frontend displays relevant API validation and error messages to the user.

## Testing

The backend APIs were tested using Thunder Client.

The following flows were verified:

* User registration
* User login
* JWT generation and storage
* Protected dashboard access
* Profile retrieval
* Profile update
* Password change
* Logout
* Protected route access after logout
* Session persistence after page refresh

## Author

Rishi Panchal

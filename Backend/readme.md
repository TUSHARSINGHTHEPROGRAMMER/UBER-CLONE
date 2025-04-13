# Uber Clone Backend API

This is the backend API for the Uber Clone application. It provides endpoints for user registration, authentication, and other features.

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [POST /register](#post-register)
  - [POST /login](#post-login)
  - [GET /profile](#get-profile)
  - [GET /logout](#get-logout)
- [Error Handling](#error-handling)
- [License](#license)

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **bcrypt**: For password hashing.
- **jsonwebtoken**: For generating authentication tokens.
- **express-validator**: For validating request payloads.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/uber-clone-backend.git
   cd uber-clone-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### POST /register

**Description**: Registers a new user.

**URL**: `/register`

**Method**: `POST`

**Request Body**:
```json
{
    "fullname": {
        "firstname": "test_firstname",
        "lastname": "test_lastname"
    },
    "email": "test@gmail.com",
    "password": "test_1234"
}
```

**Validation Rules**:
- `fullname.firstname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 3 characters long.

**Response**:
- **Success (200)**:
  ```json
  {
      "token": "your_generated_jwt_token",
      "user": {
          "_id": "user_id",
          "fullname": {
              "firstname": "test_firstname",
              "lastname": "test_lastname"
          },
          "email": "test@gmail.com",
          "password": "hashed_password",
          "socketID": null
      }
  }
  ```
- **Validation Error (400)**:
  ```json
  {
      "errors": [
          {
              "msg": "give a bigger first name",
              "param": "fullname.firstname",
              "location": "body"
          }
      ]
  }
  ```
- **Duplicate Email Error (400)**:
  ```json
  {
      "error": "Duplicate key error: Email or username already exists."
  }
  ```

**Notes**:
- Passwords are hashed before being stored in the database.
- A JWT token is generated upon successful registration.

---

### POST /login

**Description**: Authenticates an existing user.

**URL**: `/login`

**Method**: `POST`

**Request Body**:
```json
{
    "email": "test@gmail.com",
    "password": "test_1234"
}
```

**Validation Rules**:
- `email`: Must be a valid email address.
- `password`: Must be at least 3 characters long.

**Response**:
- **Success (200)**:
  ```json
  {
      "token": "your_generated_jwt_token",
      "user": {
          "_id": "user_id",
          "fullname": {
              "firstname": "test_firstname",
              "lastname": "test_lastname"
          },
          "email": "test@gmail.com",
          "socketID": null
      }
  }
  ```
- **Invalid Credentials (401)**:
  ```json
  {
      "message": "invalid email or password"
  }
  ```
- **Validation Error (400)**:
  ```json
  {
      "errors": [
          {
              "msg": "give a valid email",
              "param": "email",
              "location": "body"
          }
      ]
  }
  ```

**Notes**:
- The login endpoint verifies the provided email and password.
- A JWT token is generated upon successful authentication.
- The user’s password is not returned in the response.

---

### GET /profile

**Description**: Retrieves the profile of the authenticated user.

**URL**: `/profile`

**Method**: `GET`

**Headers**:
- Requires the JWT token to be provided either in a cookie or the `Authorization` header.

**Response**:
- **Success (200)**:
  ```json
  {
      "_id": "user_id",
      "fullname": {
          "firstname": "test_firstname",
          "lastname": "test_lastname"
      },
      "email": "test@gmail.com",
      "socketID": null
  }
  ```
- **Unauthorized (401)**:
  ```json
  {
      "message": "unauthorized"
  }
  ```

---

### GET /logout

**Description**: Logs out the user by clearing the authentication cookie and blacklisting the token.

**URL**: `/logout`

**Method**: `GET`

**Behavior**:
- Clears the `token` cookie.
- Adds the token to the blacklist to prevent further use.

**Response**:
- **Success (200)**:
  ```json
  {
      "message": "logged out successfully"
  }
  ```
- **Unauthorized (401)**:
  ```json
  {
      "message": "unauthorized"
  }
  ```

**Notes**:
- After logging out, attempts to access protected endpoints (i.e., `/profile`) with the blacklisted token will result in an unauthorized error.

---

## Error Handling

The API uses consistent error handling to provide meaningful error messages to the client. Common error responses include:
- **400 Bad Request**: Validation errors or missing fields.
- **401 Unauthorized**: Invalid authentication credentials or unauthorized access.
- **500 Internal Server Error**: Unexpected server errors.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
# Social Media Backend REST-API

## Overview

This project is a robust social media backend REST-API built using Node.js, Express.js, and MongoDB. It provides functionalities for user authentication, post management, commenting, liking, friendship features, and OTP-based password reset for enhanced security.

## Features

- **User Authentication**: Signup, login, logout, and logout from all devices.
- **User Profile**: Update user details and upload avatar.
- **Post Management**: Create, read, update, and delete posts with captions and image URLs.
- **Comment System**: Add, update, and delete comments on posts.
- **Like Functionality**: Like/unlike posts and comments.
- **Friendship Features**: Manage friends and friend requests.
- **OTP-Based Password Reset**: Send OTPs, verify OTPs, and reset passwords.

## Technology Stack

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Nodemailer**: Email sending library.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/social-media-backend.git
   cd social-media-backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes

- `POST /api/users/signup`: Register a new user account.
- `POST /api/users/signin`: Log in as a user.
- `POST /api/users/logout`: Log out the currently logged-in user.
- `POST /api/users/logout-all-devices`: Log out the user from all devices.

### User Profile Routes

- `GET /api/users/get-details/:userId`: Retrieve user information.
- `GET /api/users/get-all-details`: Retrieve information for all users.
- `PUT /api/users/update-details/:userId`: Update user details.

### Post Routes

- `GET /api/posts`: Retrieve all posts.
- `GET /api/posts/user`: Retrieve all posts for the logged-in user.
- `GET /api/posts/:postId`: Retrieve a specific post by ID.
- `POST /api/posts`: Create a new post.
- `PUT /api/posts/:postId`: Update a specific post.
- `DELETE /api/posts/:postId`: Delete a specific post.

### Comment Routes

- `GET /api/comments/:postId`: Get comments for a specific post.
- `POST /api/comments/:postId`: Add a comment to a specific post.
- `PUT /api/comments/:commentId`: Update a specific comment.
- `DELETE /api/comments/:commentId`: Delete a specific comment.

### Like Routes

- `GET /api/likes/:id`: Get likes for a specific post or comment.
- `POST /api/likes/toggle/:id`: Toggle like on a post or comment.

### Friendship Routes

- `POST /api/friends/send-request/:friendId`: Send a friend request.
- `POST /api/friends/respond-request/:friendId`: Accept or reject a friend request.
- `GET /api/friends/get-friends`: Get a user's friends.
- `GET /api/friends/get-pending-requests`: Get pending friend requests.

### OTP Routes

- `POST /api/otp/send`: Send an OTP for password reset.
- `POST /api/otp/verify`: Verify an OTP.
- `POST /api/otp/reset-password`: Reset the user's password.

## Error Handling

The application includes error handling middleware that captures and logs errors, sending a generic error response to the client.

## Logging

A request logging middleware is included to log incoming requests for debugging and monitoring purposes.

## Testing

Thoroughly test the API endpoints using Postman or a similar tool. Make sure to fork the provided Postman collection and adjust parameters as needed.

## Documentation

The code is documented with comments explaining the purpose of each function and module. Consider using a tool like Swagger to generate API documentation.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
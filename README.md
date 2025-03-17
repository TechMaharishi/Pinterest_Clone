# Pinterest Clone

A full-stack Pinterest clone application built with Node.js, Express, MongoDB, and EJS templating engine. This application allows users to create accounts, share images, create boards, and interact with other users' content.

## Features

- **User Authentication**
  - Register with email and password
  - Login/Logout functionality
  - Password reset capability
  - Session management

- **User Profiles**
  - Customizable profile pictures
  - Personal boards management
  - View and manage posted content

- **Post Management**
  - Upload images
  - Create and organize boards
  - View posts in feed
  - Interactive post viewing

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Passport.js (Authentication)

- **Frontend**
  - EJS (Embedded JavaScript templates)
  - Tailwind CSS
  - JavaScript

- **File Handling**
  - Multer (File uploads)

- **Additional Packages**
  - connect-flash (Flash messages)
  - express-session (Session management)
  - dotenv (Environment variables)
  - uuid (Unique identifiers)

## Prerequisites

- Node.js (v12 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Pinterest_Clone.git
   cd Pinterest_Clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add your environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Visit `http://localhost:3000` in your browser

## Project Structure

```
├── bin/
│   └── www                 # Application entry point
├── public/                 # Static files
│   ├── images/            # Image assets
│   ├── javascripts/       # Client-side JavaScript
│   └── stylesheets/       # CSS files
├── routes/                # Route handlers
│   ├── index.js          # Main routes
│   ├── users.js          # User-related routes
│   ├── post.js           # Post-related routes
│   └── multer.js         # File upload configuration
├── views/                 # EJS templates
│   ├── partials/         # Reusable template parts
│   ├── add.ejs           # Add post page
│   ├── feed.ejs          # Main feed page
│   ├── index.ejs         # Login page
│   ├── profile.ejs       # User profile page
│   └── register.ejs      # Registration page
├── app.js                 # Express application setup
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Features Implementation

### Authentication
- Uses Passport.js with local strategy
- Session-based authentication
- Password hashing for security

### File Upload
- Multer middleware for handling file uploads
- Supports image file formats
- Stores files in public/images/uploads

### Database Schema

**User Model:**
- Email
- Username
- Name
- Phone
- Password (hashed)
- Profile Picture
- Boards (Array)
- Posts (Array of references)

## Deployment

This application is ready to be deployed on platforms like Vercel, Heroku, or any Node.js hosting service. Make sure to:

1. Set up environment variables on your hosting platform
2. Configure MongoDB connection string
3. Set up proper build commands if needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pinterest for inspiration
- Node.js community
- Express.js framework
- MongoDB database

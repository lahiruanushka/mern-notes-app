# Notes App 📝

## Overview
Notes App is a web application built with TypeScript, providing a type-safe and robust solution for managing personal notes. Users can securely register, authenticate, and perform comprehensive note management operations.

## Screenshots

### User Registration
![User Registration](/screenshots/signup.png)

### Login Screen
![Login Screen](/screenshots/login.png)

### Notes Dashboard
![Notes Dashboard](/screenshots/notes-page.png)

### Create/Edit Note Modal
![Create Note](/screenshots/note-modal.png)

## Features
- Secure user registration and login
- Comprehensive note management
  - Create new notes
  - View existing notes
  - Edit note contents
  - Delete unwanted notes
- Session-based authentication for enhanced security
- Fully responsive design
- Type-safe implementation with TypeScript

## Technologies Used

### Frontend
- **React**: Core library for building user interface
- **TypeScript**: Adds static typing to JavaScript
- **React Bootstrap**: Responsive UI components
- **React Router**: Handling application routing

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Provides type safety and enhanced developer experience
- **MongoDB**: NoSQL database for storing user and note data

### Authentication
- **Session-based authentication**
- Secure user login and data protection

### Type Definitions
- Comprehensive type definitions for:
  - User models
  - Note interfaces
  - API request/response types

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- TypeScript
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/lahiruanushka/mern-notes-app.git
cd mern-notes-app
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables
- Create a `.env` file in the backend directory
- Add necessary configurations:
  ```
  MONGODB_URI=your_mongodb_connection_string
  SESSION_SECRET=your_session_secret
  PORT=port_number
  ```

4. Compile TypeScript
```bash
# In frontend directory
npm run build

# In backend directory
npm run build
```

5. Run the application
```bash
# Start backend (from backend directory)
npm run start

# Start frontend (from frontend directory)
npm run dev
```

## Project Structure
```
mern-notes-app/
│
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── tsconfig.json
│   └── package.json
│
└── backend/                # Node.js TypeScript backend
    ├── src/
    │   ├── models/
    │   ├── routes/
    │   ├── controllers/
    │   ├── util/
    │   ├── app.ts
    │   └── server.ts
    ├── tsconfig.json
    └── package.json
```

## Future Enhancements
- Add rich text editing with type-safe implementations
- Implement note tagging with strong typing
- Enable note sharing with robust type definitions
- Develop mobile application using React Native with TypeScript

## Contributing
Contributions are welcome! Please follow these guidelines:
- Maintain TypeScript best practices
- Ensure type safety
- Write comprehensive type definitions

## License
This project is licensed under the MIT License.
# AXIOM Hackathon Backend API

Backend server for the Medicine Locator Healthcare Platform built with Express.js and MongoDB.

## 🚀 Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Role-Based Access**: Support for both patients and doctors
- **MongoDB Integration**: Cloud-based database with MongoDB Atlas
- **Password Security**: Bcrypt password hashing
- **Protected Routes**: JWT middleware for secure endpoints
- **RESTful API**: Clean and organized API structure

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 🏃 Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Test Database Connection:
```bash
npm run test:db
```

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── models/
│   └── User.js              # User schema and model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── userRoutes.js        # User-related routes
├── .env                     # Environment variables (not committed)
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
├── server.js               # Main application entry point
└── testDbConnection.js     # Database connection test script
```

## 🔐 Authentication API

### Endpoints

#### Register a New User
- **POST** `/api/auth/register`
- Body: `{ name, email, password, isDoctor, specialization?, licenseNumber? }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`

#### Get Current User (Protected)
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`

See [API_TESTING.md](./API_TESTING.md) for detailed API documentation and examples.

## 🧪 Testing the API

You can test the API using:
- **Postman**: Import the endpoints and test
- **cURL**: Use command-line examples from API_TESTING.md
- **Thunder Client** (VS Code Extension)
- **REST Client** (VS Code Extension)

## 🔧 Technologies Used

- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **nodemon**: Development auto-reload

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Environment variable management
- CORS enabled for frontend integration

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| NODE_ENV | Environment mode | development/production |

## 🚨 Common Issues

### Connection Refused
- Ensure MongoDB Atlas cluster is running
- Check if your IP is whitelisted in MongoDB Atlas
- Verify MONGODB_URI is correct in .env

### Authentication Failed
- Check if JWT_SECRET is set in .env
- Verify token is sent in Authorization header
- Token format: `Bearer <token>`

## 📄 License

ISC

## 👥 Authors

Phantom Recursion Team - AXIOM SJBIT Hackathon 2025

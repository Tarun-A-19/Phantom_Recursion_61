# Authentication API Testing Guide

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. Register a New Patient
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "isDoctor": false
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isDoctor": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Register a New Doctor
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "Dr. Smith",
  "email": "drsmith@example.com",
  "password": "password123",
  "isDoctor": true,
  "specialization": "Cardiologist",
  "licenseNumber": "DOC12345"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "Dr. Smith",
    "email": "drsmith@example.com",
    "isDoctor": true,
    "specialization": "Cardiologist",
    "licenseNumber": "DOC12345"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isDoctor": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4. Get Current User Profile (Protected)
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response (Success):**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isDoctor": false,
    "createdAt": "2025-11-07T00:00:00.000Z",
    "updatedAt": "2025-11-07T00:00:00.000Z"
  }
}
```

---

## Testing with cURL

### Register a Patient:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "isDoctor": false
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (replace YOUR_TOKEN with actual token):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Testing with Postman

1. **Register**: 
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body: raw JSON
   
2. **Login**: 
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body: raw JSON
   
3. **Get Profile**: 
   - Method: GET
   - URL: `http://localhost:5000/api/auth/me`
   - Headers: `Authorization: Bearer YOUR_TOKEN`

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide name, email, and password"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "error details"
}
```

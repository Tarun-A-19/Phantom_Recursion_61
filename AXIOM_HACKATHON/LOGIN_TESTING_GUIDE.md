# Login System Testing Guide

## 🚀 Setup

Make sure both frontend and backend servers are running:

### Backend (Port 5000):
```bash
cd server
npm run dev
```

### Frontend (Port 5173):
```bash
npm run dev
```

---

## ✅ Testing the Login System

### 1. **Register a New Patient**

1. Open http://localhost:5173 in your browser
2. Select **"I am a Patient"**
3. Click **"Sign Up"** tab
4. Fill in the form:
   - Name: `John Doe`
   - Email: `john@test.com`
   - Password: `password123`
5. Click **"Register as Patient"**
6. You should be logged in automatically

### 2. **Register a New Doctor**

1. Select **"I am a Doctor"**
2. Click **"Sign Up"** tab
3. Fill in the form:
   - Full Name: `Dr. Jane Smith`
   - Email: `drjane@test.com`
   - Password: `password123`
   - Phone: `9876543210`
   - Specialty: Select from dropdown (e.g., `Cardiologist`)
   - Qualification: `MBBS, MD`
   - Experience: `10 years`
   - Medical License Number: `DOC12345`
4. Click **"Register as Doctor"**
5. You should be logged in automatically

### 3. **Login with Existing Account**

1. Click **"Sign In"** tab
2. Enter:
   - Email: `john@test.com`
   - Password: `password123`
3. Click **"Sign In"**
4. You should be logged in

### 4. **Demo Login**

You can still use the demo login feature:
- Click **"Try Demo Patient Login"** for quick patient access
- Click **"Try Demo Doctor Login"** for quick doctor access

---

## 🧪 Test Cases

### ✅ Successful Registration
- Create new patient account
- Create new doctor account with all required fields
- Auto-login after registration
- Token stored in localStorage
- User data stored in sessionStorage

### ✅ Successful Login
- Login with valid credentials
- Token stored in localStorage
- User redirected to appropriate dashboard

### ❌ Error Handling

**Validation Errors:**
- Empty email → "Email is required"
- Invalid email → "Email is invalid"
- Short password → "Password must be at least 6 characters"
- Missing doctor fields → Field-specific errors

**API Errors:**
- Duplicate email → "User already exists with this email"
- Wrong password → "Invalid email or password"
- Non-existent user → "Invalid email or password"

---

## 🔍 Debugging

### Check if Backend is Running
Open http://localhost:5000 - Should show:
```json
{
  "message": "Welcome to AXIOM HACKATHON API"
}
```

### Check Browser Console
- Open Developer Tools (F12)
- Check Console tab for any errors
- Check Network tab to see API requests

### Check localStorage
In browser console:
```javascript
// Check if token exists
localStorage.getItem('token')

// Check user data
localStorage.getItem('user')

// Clear authentication (logout)
localStorage.clear()
```

---

## 📊 Expected Behavior

### After Successful Login/Registration:

1. **Token Storage**: JWT token saved in localStorage
2. **User Data**: User info saved in both localStorage and sessionStorage
3. **Redirect**: User sees appropriate dashboard
   - Patients → Medicine search interface
   - Doctors → Doctor dashboard

### Security Features:

- Passwords are hashed with bcrypt
- JWT tokens expire after 30 days
- Tokens sent in Authorization header
- Protected routes require valid token

---

## 🐛 Common Issues

### "Network Error" or "Connection Refused"
- Backend server not running
- Check if port 5000 is available
- Verify MONGODB_URI in .env file

### "Invalid email or password"
- Check credentials are correct
- Email is case-insensitive
- Password must match exactly

### "User already exists"
- Email already registered
- Try different email or login instead

### Form not submitting
- Check validation errors
- Ensure all required fields are filled
- Check browser console for errors

---

## 🎯 Next Steps

After successful authentication testing:

1. **Logout Functionality**: Add logout button that clears tokens
2. **Protected Routes**: Ensure routes check authentication
3. **Token Refresh**: Implement token refresh before expiry
4. **Password Reset**: Add forgot password feature
5. **Email Verification**: Add email verification step

---

## 📝 Notes

- Demo login doesn't require backend (uses local data)
- Real authentication requires MongoDB connection
- Tokens are stored in browser and persist across sessions
- Clear localStorage to "logout" during testing

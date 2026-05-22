# 🔐 MERN Authentication System

Complete auth system with Register, Login, Forgot Password, Reset Password & Protected Dashboard.

## 📁 Project Structure
```
auth-system/
├── backend/              ← Node.js + Express API
│   ├── config/db.js      ← MongoDB connection
│   ├── middleware/auth.js ← JWT middleware
│   ├── models/User.js    ← User schema + bcrypt
│   ├── routes/auth.js    ← All auth routes
│   ├── server.js         ← Entry point
│   └── .env.example      ← Environment template
│
└── frontend/             ← React + Vite
    └── src/
        ├── api/axios.js       ← Axios instance
        ├── context/AuthContext.jsx
        ├── components/ProtectedRoute.jsx
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            ├── ForgotPassword.jsx
            ├── ResetPassword.jsx
            └── Dashboard.jsx
```

---

## 🚀 How to Run

### STEP 1 – Install Node.js
Download from: https://nodejs.org (LTS version)

### STEP 2 – Setup Backend

Open terminal in VS Code, then:
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:
```
MONGO_URI=mongodb://localhost:27017/auth_system
JWT_SECRET=any-random-secret-key-here
PORT=5000
CLIENT_URL=http://localhost:5173
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
```

Start backend:
```bash
npm run dev
```
→ Backend runs at http://localhost:5000

### STEP 3 – Setup Frontend

Open a NEW terminal:
```bash
cd frontend
npm install
npm run dev
```
→ Frontend runs at http://localhost:5173

### STEP 4 – Open Browser
Go to: **http://localhost:5173**

---

## 📌 Features
- ✅ User Registration with unique Client ID
- ✅ Secure Login with JWT
- ✅ Forgot Password (email reset link)
- ✅ Reset Password with token (15 min expiry)
- ✅ Protected Dashboard (JWT required)
- ✅ bcrypt password hashing (12 salt rounds)
- ✅ Real-time error handling
- ✅ Fully responsive design

## 🔌 API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/forgot-password | Send reset email |
| POST | /api/auth/reset-password/:token | Reset password |
| GET  | /api/auth/me | Get profile (protected) |

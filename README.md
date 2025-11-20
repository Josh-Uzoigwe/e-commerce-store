# Jojo's Web-Store 🛍️

A luxury e-commerce platform built with React, TypeScript, Tailwind CSS, and Node.js.

## Features
- **Full Stack**: Node.js + MongoDB Backend with React Frontend.
- **Offline Capable**: Falls back to LocalStorage if the backend is offline.
- **AI Powered**: Gemini-powered Product Concierge and Support Agent.
- **Auth**: Google Sign-In + JWT Authentication.
- **Admin Dashboard**: Manage products (Add, Edit, Delete).

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: Installed.
- **MongoDB**: Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community). Ensure it is running on port 27017.

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory:
```env
VITE_API_KEY=your_gemini_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
# Optional: Default is mongodb://127.0.0.1:27017/jojos_store
MONGO_URI=mongodb://127.0.0.1:27017/jojos_store 
```

### 4. Start the Backend
This runs the Express server and connects to MongoDB.
```bash
node server/server.js
```
*Note: Ensure your MongoDB service is running before starting the server.*

### 5. Start the Frontend
Open a new terminal terminal and run:
```bash
npm run dev
```

## 📦 Build for Production
```bash
npm run build
```

## 🔑 Admin Access
- **Email**: `admin@jojos.com`
- **Password**: `admin123`

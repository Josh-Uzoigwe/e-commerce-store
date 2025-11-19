# Jojo's Web-Store 🛍️

A luxury e-commerce platform built with React, TypeScript, Tailwind CSS, and Node.js.

## Features
- **Full Stack**: Node.js + SQLite Backend with React Frontend.
- **Offline Capable**: Falls back to LocalStorage if the backend is offline.
- **AI Powered**: Gemini-powered Product Concierge and Support Agent.
- **Auth**: Google Sign-In + JWT Authentication.
- **Admin Dashboard**: Manage products (Add, Edit, Delete).

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
VITE_API_KEY=your_gemini_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Start the Backend
This runs the Express server and initializes the SQLite database.
```bash
node server/server.js
```

### 4. Start the Frontend
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

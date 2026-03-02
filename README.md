<div align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge&logo=google" alt="Google GenAI">
  <img src="https://img.shields.io/badge/React-18-cyan?style=for-the-badge&logo=react" alt="React">
  
  # 🧠 AI-Powered Learning Assistant App
  
  *A robust, intelligent full-stack web application designed to supercharge your learning and study experiences by leveraging advanced AI for document processing, summarization, flashcards, and quizzes.*
</div>

---

## ✨ Features

- **🛡️ Secure Authentication**: Full user signup and login flow protected by JWT and hashed passwords.
- **📄 Smart Document Processing**: Upload your PDF documents and securely extract their text utilizing local storage buffers.
- **🤖 Deep AI Integrations**: Seamlessly integrated with Google's GenAI (Gemini) API to give you context-aware insights.
- **💬 Chat with Document**: Built-in interactive chat to ask direct questions about the content of your document.
- **📚 Interactive Study Sets**: Auto-generate robust Flashcards and multiple-choice Quizzes straight from your reading material.
- **🎨 Premium UI/UX**: Designed to look stunning on every platform using React, standard Tailwind CSS, modern glass-morphism, and Lucide Icons.

---

## 🛠️ Architecture & Tech Stack

**Backend System**
- **Core Framework**: Node.js & Express.js
- **Database**: MongoDB (Local/Atlas) managed with Mongoose ODM
- **Security**: JWT tokens, bcrypt.js for passwords
- **Intelligence Core**: `@google/genai` (Gemini 2.5 Flash SDK)
- **File & Extraction Handling**: Multer, PDF-Parse, and custom logical chunking

**Frontend Experience**
- **Core Engine**: React.js driven by Vite tooling
- **Routing**: `react-router-dom` v6
- **State & Data Fetching**: Context API & Axios
- **CSS Architecture**: Tailwind CSS
- **Polished Feedback**: React Hot Toast & custom animations

---

## 🚀 Deployment to Render.com

This backend is specially configured to be **Production Ready** for a seamless deployment onto Render.

### Backend Deployment Steps:
1. Create a new **Web Service** on Render.
2. Connect this repository.
3. Set the **Root Directory** to `Backend/` (or run it from the root depending on your monorepo structure, adjusting standard paths).
4. Configure the Build and Run commands:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

---

## 📥 Getting Started Locally

You will need a minimum of Node `v18.0.0` or higher installed to comfortably run this application.

### 1. Environment Configuration

You'll need `.env` files for both the frontend and backend.

**Backend (`Backend/.env`)**
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/ai-learning-assistant
JWT_SECRET=your_super_secret_jwt_string
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:8000/api
```

### 2. Launching The Application 

Open two separate terminals and start your services.

**Terminal 1 (Backend Initialization)**
```bash
git clone <repository-url>
cd Backend
npm install
npm run dev
```

**Terminal 2 (Frontend Initialization)**
```bash
# Assuming you cloned it beside 'Backend'
cd frontend
npm install
npm run dev
```

The frontend should be successfully running on `http://localhost:5173`. 

---

## 📄 License & Terms

Licensed securely underneath the **ISC** framework structure. Feel confident to study, observe, and extend this codebase!

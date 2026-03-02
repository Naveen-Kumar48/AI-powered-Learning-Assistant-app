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
- **📄 Smart Document Processing**: Upload your PDF documents and extract their text smoothly across scalable storage.
- **🤖 Deep AI Integrations**: Seamlessly integrated with Google's GenAI (Gemini) API to give you context-aware insights.
- **💬 Chat with Document**: Built-in interactive chat to ask direct questions to your document.
- **📚 Interactive Study Sets**: Auto-generate robust Flashcards and multiple-choice Quizzes straight from your reading material.
- **🎨 Premium UI/UX**: Designed to look stunning on every platform using React, standard Tailwind CSS, and Lucide Icons.

---

## 🛠️ Architecture & Tech Stack

**Backend System**
- **Core Framework**: Node.js & Express.js
- **Database**: MongoDB (Local/Atlas) managed with Mongoose ODM
- **Security**: JWT tokens, bcrypt.js for passwords
- **Intelligence Core**: `@google/genai` sdk
- **File & Extraction Handling**: Multer, PDF-Parse, and custom logical chunking

**Frontend Experience**
- **Core Engine**: React.js driven by Vite tooling
- **Routing**: `react-router-dom` v6
- **State & Data Fetching**: Axios customized instances
- **CSS Architecture**: Tailwind CSS
- **Polished Feedback**: React Hot Toast
- **Data Rendering**: Beautiful markdown parsed from AI streams using React Markdown & Syntax Highlighter.

---

## 📥 Getting Started

You will need a minimum of Node `v18.0.0` or higher installed to comfortably run this application.

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

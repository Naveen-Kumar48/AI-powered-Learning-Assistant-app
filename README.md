<div align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge&logo=google" alt="Google GenAI">
  <img src="https://img.shields.io/badge/React-18-cyan?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-18-cyan?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">

  
  
  # 🧠 AI-Powered Learning Assistant

  **An intelligent full-stack educational platform that leverages Generative AI to automate study material creation**
</div>

---

## 📖 Overview

The **AI-Powered Learning Assistant** is an advanced educational web application designed to transform how students and professionals engage with learning materials. By uploading standard PDF documents, users can automatically generate comprehensive study aids—including interactive flashcards, multiple-choice quizzes, executive summaries, and contextual AI-powered discussions based on their uploaded content.

Built on modern full-stack architecture, the platform combines a robust Express/Node.js backend with a high-performance React frontend, delivering seamless user experience and powerful AI-driven functionality.

---

## ✨ Core Features

- **Role-Based Access Control (RBAC):** Secure JWT-based authentication with bcrypt-encrypted credentials
- **Automated Document Processing:** Intelligent PDF ingestion pipeline with text extraction, chunking, and vector storage
- **Advanced AI Integration:** Google's Gemini 2.5 Flash SDK for accurate content synthesis and generation
- **Real-Time Document Querying:** Interactive chat interface for dynamic document analysis and Q&A
- **Dynamic Study Material Generation:** AI-powered creation of flashcards, quizzes, and summaries from uploaded documents
- **Modern User Experience:** Clean, responsive UI built with React, Tailwind CSS, Lucide icons, and glass-morphism design principles

---

## 🛠️ Architecture & Technologies

### Backend Infrastructure
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js RESTful API
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **AI Engine:** Google Generative AI (`@google/genai`)
- **File Processing:** Multer and PDF-Parse libraries

### Frontend Implementation
- **Framework:** React.js (Vite build system)
- **State Management:** React Context API
- **HTTP Client:** Axios with JWT interceptors
- **Styling:** Tailwind CSS utility framework
- **Routing:** React Router v6
- **UI Components:** Custom components with glass-morphism effects

---

## 🚀 Deployment Guide

### Backend Deployment (Render.com)

The backend service is configured for deployment on [Render.com](https://render.com/).

1. Create a new **Web Service** linked to your repository
2. Configure the following settings:
   - **Root Directory:** `Backend/`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` or `npm run dev`
3. Set up environment variables matching those in your local `.env` file

### Frontend Deployment (Vercel)

The frontend includes a tailored `vercel.json` configuration for optimal SPA routing on edge networks.

1. Import your repository into the **Vercel Dashboard**
2. Configure the following settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend/`
   - **Build Command:** `npm run build`
3. Set the `VITE_API_URL` environment variable to your deployed Render backend URL (append `/api`)

---

## 📥 Local Development Setup

### 1. Environment Configuration

Create `.env` files in both the `Backend/` and `frontend/` directories with the required environment variables as specified in the example configurations.

### 2. Installation & Bootstrapping

**Prerequisites:** Node.js >= v18.0.0

Open two terminal sessions to run both servers simultaneously.

**Terminal 1: Start the Backend Server**
```bash
git clone <repository-url>
cd Backend
npm install
npm run dev
```

**Terminal 2: Start the Frontend Server**
```bash
cd frontend
npm install
npm run dev
```

The application will be available at the URLs displayed in your terminal outputs (typically `http://localhost:5173` for frontend and `http://localhost:5000` for backend).

## 📄 License

This project is distributed under the **ISC License**, permitting use, modification, and distribution for both commercial and non-commercial purposes with appropriate attribution.

---

<div align="center">
  <sub>Built with ❤️ using the MERN Stack and Google Generative AI</sub>
</div>

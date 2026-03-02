<div align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Gemini_2.5_Flash-orange?style=for-the-badge&logo=google" alt="Google GenAI">
  <img src="https://img.shields.io/badge/React_18-cyan?style=for-the-badge&logo=react" alt="React">
  
  # 🧠 AI-Powered Learning Assistant

  *A comprehensive, full-stack educational tool that leverages Generative AI to automate study material creation.*
</div>

---

## 📖 Overview

The **AI-Powered Learning Assistant** is an intelligent web application designed to accelerate the learning process. By uploading standard PDF materials, students and professionals can automatically generate study artifacts—including interactive flashcards, comprehensive quizzes, and executive summaries. Additionally, the platform provides a contextual chatbot capable of parsing and discussing the ingested document data in real-time.

Built adhering to modern full-stack methodologies, the architecture seamlessly meshes a robust Express/Node.js backend with an accessible, high-performance React frontend.

---

## ✨ Core Features

- **RBAC Authentication:** Secure, JWT-based user session management with bcrypt-encrypted credentials.
- **Automated Ingestion Pipeline:** A robust PDF handling mechanism that extracts, chunks, and securely stores raw document vectors and metadata.
- **Context-Aware AI Integrations:** Deep integration with Google's GenAI (Gemini 2.5 Flash SDK) framework for highly accurate content synthesis.
- **Real-Time Document Querying:** An interactive contextual chat interface allowing users to dynamically interrogate their uploaded material.
- **Dynamic Study Artifact Generation:** On-the-fly computational synthesis of Flashcards and Multiple-Choice Quizzes driven by document text.
- **State-of-the-Art UX/UI:** An aesthetically tuned interface engineered with React, Tailwind CSS, Lucide Icons, and modern glass-morphism methodologies.

---

## 🛠️ Architecture & Technologies

### Backend Infrastructure
- **Runtime Environment:** Node.js (v18+)
- **API Architecture:** Express.js RESTful principles
- **Data Persistence:** MongoDB & Mongoose ODM
- **Security Protocols:** JSON Web Tokens (JWT)
- **Large Language Model (LLM):** `@google/genai` sdk
- **File System Handling:** Multer & PDF-Parse

### Frontend Implementation
- **Core View Library:** React.js (Vite Build System)
- **State Management:** React Context API
- **HTTP Client:** Axios (Interceptors configured for JWTs)
- **Styling Paradigm:** Tailwind CSS
- **Routing:** React Router v6

---

## 🚀 Production Deployment

### Backend Server (Node.js/Express via Render)
The backend service is intrinsically structured for automated deployment on [Render.com](https://render.com/).

1. Initialize a new **Web Service** mapped to this repository.
2. Configure your execution paths:
   - **Root Directory:** `Backend/`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` *(or `npm run prod`)*
3. **Environment Map:** ensure your platform variables accurately map to the ones listed under *Local Initialization*.

### Frontend Application (React/Vite via Vercel)
The frontend encapsulates a tailored `vercel.json` directive to optimally resolve SPA routing hooks on edge networks.

1. Import the repository into your **Vercel Dashboard**.
2. Configure settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend/`
   - **Build Command:** `npm run build`
3. Map the `VITE_API_URL` environment variable to your deployed Render URL suffixing `/api`.

---

## 📥 Local Environment Setup

### 1. Environment Variable Configuration
Create `.env` files in both the frontend and backend root directories mirroring the configurations below.


### 2. Initialization & Bootstrapping
Requires Node.js `>=v18.0.0`. Execute from your terminal multiplexer or dual CLI sessions.

**Terminal 1: Spin up the API Server**
```bash
git clone <repository-url>
cd Backend
npm install
npm run dev
```

**Terminal 2: Spin up the Local Dev Server**
```bash
cd frontend
npm install
npm run dev
```

## 📄 Licensing

Distributed underneath the **ISC** License structure. Open for architectural review, forks, and scholarly observation.

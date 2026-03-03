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

## 📄 License & Usage Terms

**Copyright © 2026 Naveen Kumar. All Rights Reserved.**

This project is distributed under the **ISC License** with the following additional terms:

### Permissions Granted
- ✅ **Commercial Use** - Free to use for commercial purposes
- ✅ **Modification** - Allowed to modify and adapt the code
- ✅ **Distribution** - Can share and distribute the software
- ✅ **Private Use** - Free for personal and educational projects

### Conditions & Requirements
- ⚠️ **Attribution Required** - Any copy or substantial portion of this software must include appropriate credit to the original author with a link to the source repository
- ⚠️ **License Notice** - The original copyright notice and this permission notice shall be included in all copies or substantial portions of the Software
- ⚠️ **No Misrepresentation** - Modified versions must be clearly marked as such and not misrepresented as the original software
- ⚠️ **Academic Integrity** - If used in academic settings, proper citation and acknowledgment must be provided
### Proper Attribution Format
When using this project, please include the following attribution:
```
AI-Powered Learning Assistant [https://github.com/yourusername/ai-learning-assistant] 
Copyright (c) [2026] [Naveen Kumar], Licensed under the ISC License
```

### Limitations
- ❌ **No Liability** - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND
- ❌ **No Endorsement** - Use of this project does not imply endorsement by the original author

### For Commercial Licensing
If you require different licensing terms or wish to use this project without attribution requirements, please contact the author for commercial licensing options.

---

<div align="center">
  <sub>Built with ❤️ using the MERN Stack and Google Generative AI</sub>
</div>

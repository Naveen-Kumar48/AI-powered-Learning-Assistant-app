# AI Powered Learning Assistant App

A robust full-stack web application designed to enhance learning experiences using Artificial Intelligence. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by modern tools like Vite and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure Login, Registration, and Profile management using JWT.
- **AI Integration**: Leveraging Google's GenAI (Gemini) for intelligent assistance.
- **Modern UI/UX**: Responsive and sleek design built with React and Tailwind CSS.
- **Document Processing**: Capability to handle and parse PDF documents.
- **File Uploads**: Support for file uploads via Multer.

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **AI**: @google/genai
- **Utilities**: Multer, PDF-parse, Dotenv, Cors

### Frontend
- **Framework**: React.js (powered by Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Markdown**: React Markdown & Syntax Highlighter

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (Database connection string)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2.  **Backend Setup**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd Backend
    npm install
    ```

    

    Start the backend server:
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**
    Navigate to the frontend directory and install dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

    Start the frontend development server:
    ```bash
    npm run dev
    ```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Login to existing account
- `GET /api/auth/profile` - Get current user profile (Protected)
- `PUT /api/auth/update-profile` - Update user details (Protected)
- `POST /api/auth/change-password` - Change user password (Protected)

## 📄 License

This project is licensed under the ISC License.

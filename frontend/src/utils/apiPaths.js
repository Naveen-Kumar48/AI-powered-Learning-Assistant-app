export const Base_URL = "https://ai-powered-learning-assistant-backend.onrender.com";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/update-profile",
    CHANGE_PASSWORD: "/api/auth/change-password",
  },
  DOCUMENTS: {
    UPLOAD: "/api/documents/upload",
    GET_DOCUMENTS: "/api/documents",
    GET_DOCUMENT_BY_ID: (id) => `/api/documents/${id}`,
    UPDATE_DOCUMENT: (id) => `/api/documents/${id}`,
    DELETE_DOCUMENT: (id) => `/api/documents/${id}`,
  },

  AI: {
    GENERATE_FLASHCARDS: "/api/aiRoutes/generate-flashcard",
    GENERATE_QUIZ: "/api/aiRoutes/generate-quiz",
    GENERATE_SUMMARY: "/api/aiRoutes/generate-summary",
    CHAT: "/api/aiRoutes/chat",
    EXPLAIN_CONCEPT: "/api/aiRoutes/explain-concept",
    GET_CHAT_HISTORY: (documentId) => `/api/aiRoutes/chat-history/${documentId}`,
  },
  FLASHCARDS: {
    GET_ALL_FLASHCARD_SETS: "/api/flashcard",
    GET_FLASHCARD_FOR_DOCUMENT: (documentId) =>
      `/api/flashcard/document/${documentId}`,
    REVIEW_FLASHCARD: (cardId) => `/api/flashcard/${cardId}/review`,
    TOGGLE_STAR: (cardId) => `/api/flashcard/${cardId}/star`,
    DELETE_FLASHCARD: (id) => `/api/flashcard/${id}`,
  },
  QUIZZES: {
    GET_QUIZZES_FOR_DOCUMENT: (documentId) => `/api/quizzes/${documentId}`,
    GET_QUIZ_BY_ID: (id) => `/api/quizzes/quiz/${id}`,
    SUBMIT_QUIZ: (id) => `/api/quizzes/${id}/submit`,
    QUIZ_RESULT: (id) => `/api/quizzes/${id}/results`,
    DELETE_QUIZ: (id) => `/api/quizzes/${id}`,
  },
  PROGRESS: {
    GET_DASHBOARD: "/api/progress/dashboard",
  },
};

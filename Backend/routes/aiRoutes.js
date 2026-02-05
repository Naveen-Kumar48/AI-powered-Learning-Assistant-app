import express from "express";
import {
generateFlashcards,
generateQuiz,
generateSummary,
chat,
explainConcept,
getChatHistory
}from "../Controllers/aiController.js"
import protect from "../middleware/auth.js";
const router=express.Router();
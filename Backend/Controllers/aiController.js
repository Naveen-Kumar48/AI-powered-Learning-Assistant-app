import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";
import ChatHistory from "../models/ChatHistory.js";
import * as geminiService from "../utils/geminiService.js";
import { findRelevantChunks} from "../utils/textChunker.js";

//* desc  General flashcards from document
//* routes  POST/api/ai/generate-flashcards
//* @access private
export const generateFlashcards = async (req, res, next) => {
  try {
    const { documentId, count = 10 } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        error: "Please provide  documentId",
        statusCode: 400,
      });
    }
    const document = await Document.findOne({
      _id: documentId,
      userId: req.user._id,
      status: "ready",
    });
    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found  or  not ready  ",
        statusCode: 404,
      });
    }
    //* generate the flashcard using the gemini
    const cards = await geminiService.generateFlashcards(
      document.extractedText,
      parseInt(count),
    );
    //*save the database
    const flashcardSet = await Flashcard.create({
      userId: req.user._id,
      documentId: document._id,
      cards: cards.map((card) => ({
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty,
        reviewCount: 0,
        isStarred: false,
      })),
    });
    res.status(201).json({
      success: true,
      data: flashcardSet,
      message: "flashcards generated successfully",
    });
  } catch (error) {
    next(error);
  }
};
//* desc  Generate quiz from  document
//* @routes POST /api/ai/generate-quiz
//* @access Private
export const generateQuiz = async (req, res, next) => {
  try {
    const { documentId, numQuestions = 5, title } = req.body;
    if (!documentId) {
      return res.status(400).json({
        success: false,
        error: "Please provide the  documentId",
        statusCode: 400
      })
    }
    const document = await Document.findOne({
      _id: documentId,
      userId: req.user._id,
      status: "ready"
    })
    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found or not ready ',
        statusCode: 404
      });
    }

    //* Generating  quiz using the gemini
    const questions = await geminiService.generateQuiz(
      document.extractedText,
      parseInt(numQuestions)
    )
    //*save to the database
    const quiz = await Quiz.create({
      userId: req.user._id,
      documentId: document._id,
      title: title || `${document.title}- Quiz`,
      questions: questions,
      totalQuestions: questions.length,
      userAnswers: [],
      score: 0
    })
    res.status(201).json({
      success: true,
      data: quiz,
      message: "Quiz generated succesfully"
    })

  } catch (error) {
    next(error);
  }
};

//*desc   Generate  document summary
//*route  POST/api/ai/generate-summary
//*@access  Private

export const generateSummary = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
};
//*@desc Chat  with document
// * @route POST /api/ai/chat
//* @access Private

export const chat = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// * desc   Explain concept form the document
//* @ route   POST /api/ai/explain-concept
//* @access Private

export const explainConcept = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

//*desc  Get chat  history  for a document
//* routes  Get /api/ai/chat-history/:documentId
//* access Private
export const getChatHistory = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

import Quiz from "../models/Quiz.js";

//* @desc    Get all quizzes for a document
//* @route   GET /api/quizzes/:documentId
//* @access  Private
export const getQuizzes = async (req, res, next) => {
  try {
    const  quizzes=await Quiz.find({
      userId:req.user._id,
      documentId:req.param.documentId
    })
    .populate('documnetId','title fileName ')
    .sort({creetedAt:-1})
  } catch (error) {
    next(error);
  }
};

//* @desc    Get single quiz by ID
//* @route   GET /api/quizzes/quiz/:id
//* @access  Private
export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404);
      throw new Error("Quiz not found");
    }
  } catch (error) {
    next(error);
  }
};

// *@desc    Submit quiz answers
// *@route   POST /api/quizzes/:id/submit
// *@access  Private
export const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404);
      throw new Error("Quiz not found");
    }

    // TODO: Calculate score based on answers
    const score = 0;
    const results = [];

    // *Save results
    const result = {
      quiz: req.params.id,
      user: req.user._id,
      score,
      answers,
    };

    // TODO: Save result to database

    res.json({ score, results });
  } catch (error) {
    next(error);
  }
};

// @desc    Get quiz results
// @route   GET /api/quizzes/:id/results
// @access  Private
export const getQuizResults = async (req, res, next) => {
  try {
    // TODO: Fetch results for the quiz
    res.json({ message: "Quiz results not yet implemented" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
export const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      res.status(404);
      throw new Error("Quiz not found");
    }

    await quiz.remove();
    res.json({ message: "Quiz removed" });
  } catch (error) {
    next(error);
  }
};

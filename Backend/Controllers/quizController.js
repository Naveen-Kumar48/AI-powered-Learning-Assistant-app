import Quiz from "../models/Quiz.js";

//* @desc    Get all quizzes for a document
//* @route   GET /api/quizzes/:documentId
//* @access  Private
export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find({
      userId: req.user._id,
      documentId: req.param.documentId,
    })
      .populate("documnetId", "title fileName ")
      .sort({ creetedAt: -1 });
    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    next(error);
  }
};

//* @desc    Get single quiz by ID
//* @route   GET /api/quizzes/quiz/:id
//* @access  Private
export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: "Quiz not found",
      });
    }
    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

// *@desc   Submit quiz answers
// *@route   POST/api/quizzes/:id/submit
// *@access  Private
export const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: "Please provide the answers array",
        statusCode: 400,
      });
    }

    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: "Quiz not found",
        statusCode: 404,
      });
    }
    if (quiz.completedAt) {
      return res.status(400).json({
        success: false,
        error: "Quiz already  completed ",
        statusCode: 400,
      });
    }
    //*Process answers
    let correctCount = 0;
    const userAnswers = [];
    answers.forEach((answers) => {
      const { questionIndex, selectedAnswer } = answers;
      if (questionIndex < quiz.questions.length) {
        const question = quiz.questions[questionIndex];
        const isCorrect = selectedAnswer === question.correctAnswer;
        if (isCorrect) correctCount++;
        userAnswers.push({
          questionIndex,
          selectedAnswer,
          isCorrect,
          answeredAt: new Date(),
        });
      }
    });
    //* Calculating  score
    const score = Math.round((correctCount / quiz.totalQuestions) * 100);

    //*Update quiz
    quiz.userAnswers = userAnswers;
    quiz.score = score;
    quiz.completedAt = new Date();
    //*saving to the db
    await quiz.save();
    res.status(200).json({
      success: true,
      data: {
        quizId: quiz_Id,
        score,
        correctCount,
        totalQuestions: quiz.totalQuestions,
        percentage: score,
        userAnswers,
      },
      message: "Quiz Submitted Succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// *@desc    Get quiz results
// *@route   GET /api/quizzes/:id/results
// *@access  Private
export const getQuizResults = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      _Id: req.params.id,
      userId: req.user._id,
    }).populate("documentId", "title");
    if (!quiz) {
      return res.statusCode(404).json({
        success: false,
        error: "Quiz not found",
        statusCode: 404,
      });
    }
    if (!quiz.completedAt) {
      return res.statusCode(400).json({
        success: false,
        error: "Quiz not completed yet ",
        statusCode: 400,
      });
    }
    //*Build DetailedResults
    const detailedResults = quiz.questions.map((question, index) => {
      const userAnswer = quiz.userAnswers.find(
        (a) => a.questionIndex === index,
      );
      return {
        questionIndex: index,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        selectedAnswer: userAnswer?.selectedAnswer || null,
        isCorrect: userAnswer?.isCorrect || false,
        explanation: question.explanation,
      };
    });
    res.status(200).json({
      success: true,
      data: {
        quiz: {
          id: quiz._id,
          title: quiz.title,
          document: quiz.documentId,
          score: quiz.score,
          totalQuestions: quiz.totalQuestions,
          completedAt: quiz.completedAt,
        },
        results: detailedResults,
      },
    });
    res.json({
      success: true,
      data: quiz,
    });
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

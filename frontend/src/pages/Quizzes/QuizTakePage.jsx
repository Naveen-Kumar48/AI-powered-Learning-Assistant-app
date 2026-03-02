import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import quizService from "../../Services/quizService";
import Spinner from "../../components/common/Spinner";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";

const QuizTakePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await quizService.getQuizById(quizId);
        setQuiz(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch quiz details");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId, navigate]);

  const handleOptionSelect = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    // Validation: Ensure all questions are answered
    const isAllAnswered = quiz.questions.every(
      (_, index) => answers[index] !== undefined
    );

    if (!isAllAnswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // Format answers for API: loop through answers state and create array of { questionIndex, selectedAnswer }
      const formattedAnswers = Object.entries(answers).map(([questionIndex, selectedAnswer]) => ({
        questionIndex: parseInt(questionIndex, 10),
        selectedAnswer
      }));

      await quizService.submitQuiz(quizId, formattedAnswers);
      toast.success("Quiz submitted successfully!");
      navigate(`/quizzes/${quizId}/results`);
    } catch (error) {
      toast.error(error.message || "Failed to submit quiz");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!quiz) return <div className="text-center p-8">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / quiz.questions.length) * 100;

  const title = quiz.title || (quiz.documentId?.title ? `${quiz.documentId.title} - Quiz` : "Knowledge Quiz");

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Top Title & Progress */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-[28px] font-semibold text-slate-800 mb-8">{title}</h1>

          <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-3">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span>{answeredCount} answered</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 p-6 sm:px-10 sm:py-8">
          {/* Question Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-bold text-emerald-700">Question {currentQuestionIndex + 1}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-8 leading-snug">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestionIndex] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-4 sm:px-5 sm:py-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${isSelected
                    ? "border-emerald-500 bg-emerald-50/10 shadow-sm shadow-emerald-500/5 ring-1 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "border-emerald-500" : "border-slate-300"
                    }`}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>}
                  </div>
                  <span className={`text-sm sm:text-base transition-colors ${isSelected ? "text-slate-900 font-medium" : "text-slate-700"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${currentQuestionIndex === 0 ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'}`}
          >
            <ChevronLeft className="w-4 h-4 -ml-1" strokeWidth={3} />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm shadow-emerald-500/20"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
              {!submitting && <CheckCircle2 className="w-4 h-4" strokeWidth={3} />}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm shadow-emerald-500/20"
            >
              Next
              <ChevronRight className="w-4 h-4 -mr-1" strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Pagination Bottom */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-8">
          {quiz.questions.map((_, idx) => {
            const isActive = idx === currentQuestionIndex;
            const isAnswered = answers[idx] !== undefined;

            let btnStyle = "bg-white border-transparent text-slate-600 hover:bg-slate-100";

            if (isActive) {
              btnStyle = "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20";
            } else if (isAnswered) {
              btnStyle = "bg-emerald-100/60 border-emerald-100 text-emerald-800 hover:bg-emerald-200/50";
            }

            return (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all border ${btnStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizTakePage;
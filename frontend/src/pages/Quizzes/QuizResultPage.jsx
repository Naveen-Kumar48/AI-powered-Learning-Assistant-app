import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, BrainCircuit } from "lucide-react";
import quizService from "../../Services/quizService";
import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";

const QuizResultPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await quizService.getQuizResults(quizId);
        setResults(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch quiz results");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [quizId, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!results) return <div className="text-center p-8">Results not found</div>;

  const { quiz, results: detailedResults } = results;
  const score = quiz?.score || 0;
  const totalQuestions = quiz?.totalQuestions || 0;
  const answers = detailedResults || [];

  // Safety check calculation
  const calculatedScore = score !== undefined ? score :
    (answers.filter(a => a.isCorrect).length / totalQuestions) * 100;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-emerald-50 border-emerald-100";
    if (score >= 60) return "bg-amber-50 border-amber-100";
    return "bg-rose-50 border-rose-100";
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Header Nav */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate(`/quizzes/${quizId}`)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold text-sm rounded-xl transition-colors shrink-0 border border-indigo-100"
          >
            <RotateCcw size={16} />
            Retake Quiz
          </button>
        </div>

        {/* Score Summary Card */}
        <div className={`rounded-3xl border-2 shadow-xl shadow-slate-200/50 p-8 sm:p-12 mb-8 text-center backdrop-blur-xl ${getScoreBg(calculatedScore)}`}>
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Trophy className={`w-10 h-10 ${getScoreColor(calculatedScore)}`} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h1>
          <p className="text-slate-600 mb-8 font-medium">Here is how you performed.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-100 min-w-[200px]">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Final Score</div>
              <div className={`text-5xl font-black ${getScoreColor(calculatedScore)}`}>
                {Math.round(calculatedScore)}%
              </div>
            </div>
            <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-100 min-w-[200px]">
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Questions</div>
              <div className="text-4xl font-bold text-slate-800">
                <span className={getScoreColor(calculatedScore)}>{answers.filter(a => a.isCorrect).length}</span>
                <span className="text-slate-300 mx-1">/</span>
                {totalQuestions}
              </div>
            </div>
          </div>
        </div>

        {/* Question Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 px-2 flex items-center gap-2">
            Detailed Review
          </h3>

          {answers.map((answer, index) => {
            const isCorrect = answer.isCorrect;

            return (
              <div key={answer._id || index} className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all ${isCorrect ? "border-emerald-100" : "border-rose-100"
                }`}>
                <div className={`p-5 sm:p-6 border-b ${isCorrect ? "bg-emerald-50/30 border-emerald-50" : "bg-rose-50/30 border-rose-50"
                  }`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                      }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 mb-1">Question {index + 1}</div>
                      <h4 className="text-lg font-semibold text-slate-900 leading-snug">
                        {answer.question || "Question text unavailable"}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="px-4 py-3 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Answer</div>
                      <div className={`font-medium ${isCorrect ? "text-emerald-700" : "text-rose-600"}`}>
                        {answer.selectedAnswer || "No answer provided"}
                      </div>
                    </div>

                    {!isCorrect && (
                      <div className="px-4 py-3 rounded-xl border border-emerald-100 bg-emerald-50/50">
                        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Correct Answer</div>
                        <div className="font-medium text-emerald-800">
                          {answer.correctAnswer || "Unavailable"}
                        </div>
                      </div>
                    )}
                  </div>

                  {answer.explanation && (
                    <div className="mt-4 px-4 py-3 rounded-xl bg-indigo-50/50 border border-indigo-100/50">
                      <div className="flex items-center gap-2 text-indigo-800 text-sm font-semibold mb-1">
                        <BrainCircuit className="w-4 h-4" />
                        Explanation
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {answer.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;
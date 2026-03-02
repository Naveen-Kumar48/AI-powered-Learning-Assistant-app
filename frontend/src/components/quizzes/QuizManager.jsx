import React, { useEffect, useState } from "react";
import { Plus, Trash2, BrainCircuit, Sparkles, PlayCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

import quizService from "../../Services/quizService";
import aiService from "../../Services/aiService";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import QuizCard from "./QuizCard";

const QuizManager = ({ documentId }) => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    // Delete state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    // Generate state
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [numQuestions, setNumQuestions] = useState(5);

    const fetchQuizzes = async () => {
        setLoading(true);
        try {
            const response = await quizService.getQuizzesForDocument(documentId);
            setQuizzes(response.data || []);
        } catch (error) {
            toast.error("Failed to fetch Quizzes");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (documentId) {
            fetchQuizzes();
        }
    }, [documentId]);

    const handleGenerateClick = () => {
        setIsGenerateModalOpen(true);
    };

    const handleConfirmGenerate = async () => {
        setIsGenerateModalOpen(false);
        setGenerating(true);
        try {
            await aiService.generateQuiz(documentId, { numQuestions });
            toast.success("Quiz generated successfully");
            fetchQuizzes();
        } catch (error) {
            toast.error(error.message || "Failed to generate quiz");
            console.error(error);
        } finally {
            setGenerating(false);
        }
    };

    const handleDeleteRequest = (e, quiz) => {
        e.stopPropagation();
        setQuizToDelete(quiz);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!quizToDelete) return;
        setDeleting(true);
        try {
            await quizService.deleteQuiz(quizToDelete._id);
            toast.success("Quiz deleted successfully");
            setIsDeleteModalOpen(false);
            fetchQuizzes();
        } catch (error) {
            toast.error(error.message || "Failed to delete quiz");
        } finally {
            setDeleting(false);
        }
    };

    const renderQuizList = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-20">
                    <Spinner />
                </div>
            );
        }
        if (quizzes.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 mb-5">
                        <BrainCircuit className="w-8 h-8 text-indigo-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        No Quizzes Yet
                    </h3>
                    <p className="text-sm text-slate-500 mb-8 text-center max-w-sm">
                        Generate a customized quiz from your document to test your knowledge and prepare effectively.
                    </p>
                    <button
                        onClick={handleGenerateClick}
                        disabled={generating}
                        className="group inline-flex items-center justify-center gap-2 px-6 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-95 hover:from-indigo-600 hover:to-purple-600 hover:shadow-indigo-500/35 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {generating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" strokeWidth={2} />
                                Generate Quiz
                            </>
                        )}
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {/* Header with Generate Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Your Quizzes
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"} available
                        </p>
                    </div>
                    <button
                        onClick={handleGenerateClick}
                        disabled={generating}
                        className="group inline-flex items-center gap-2 px-5 h-11 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {generating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" strokeWidth={2.5} />
                                Generate New Quiz
                            </>
                        )}
                    </button>
                </div>

                {/* Quizzes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz._id}
                            quiz={quiz}
                            onDelete={handleDeleteRequest}
                            onTakeQuiz={() => navigate(`/quizzes/${quiz._id}`)}
                            onViewResults={() => navigate(`/quizzes/${quiz._id}/results`)}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-[0px_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 max-w-5xl w-full backdrop-blur-xl">
                {renderQuizList()}
            </div>

            {/* Generate Validation Modal */}
            <Modal
                isOpen={isGenerateModalOpen}
                onClose={() => setIsGenerateModalOpen(false)}
                title="Generate AI Quiz"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Number of questions
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium text-slate-900"
                        />
                        <p className="mt-2 text-xs text-slate-500">
                            We recommend 5-15 questions for an optimal AI generation experience. Maximum is 20.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsGenerateModalOpen(false)}
                            className="px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all duration-200 rounded-xl"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmGenerate}
                            className="px-5 h-11 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false) }}
                title="Delete Quiz?"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600">
                        Are you sure you want to delete this quiz? This action cannot be undone and your attempts history will be lost.
                    </p>
                    <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => { setIsDeleteModalOpen(false) }}
                            disabled={deleting}
                            className="px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            disabled={deleting}
                            className="px-5 h-11 text-sm bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-rose-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            {deleting ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Deleting...
                                </span>
                            ) : (
                                "Delete Quiz"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default QuizManager;

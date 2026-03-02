import React, { useEffect, useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Trash2,
    ArrowLeft,
    Sparkles,
    Brain,
    BrainCircuit,
    RotateCcw,
    Star
} from "lucide-react";
import toast from "react-hot-toast";
import moment from "moment";

import flashcardService from "../../Services/flashcardService";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import aiService from "../../Services/aiService";
import Flashcard from "./Flashcard";

const FlashcardManager = ({ documentId }) => {
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [selectedSet, setSelectedSets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    // Generate state
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [count, setCount] = useState(10);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [setToDelete, setSetToDelete] = useState(null);

    const fetchFlashcardSets = async () => {
        setLoading(true);
        try {
            const response =
                await flashcardService.getFlashcardForDocument(documentId);
            setFlashcardSets(response.data);
        } catch (error) {
            toast.error("Failed to fetch flashcard Sets");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (documentId) {
            fetchFlashcardSets();
        }
    }, [documentId]);

    const handleGenerateClick = () => {
        setIsGenerateModalOpen(true);
    };

    const handleConfirmGenerate = async () => {
        setIsGenerateModalOpen(false);
        setGenerating(true);
        try {
            await aiService.generateFlashcards(documentId, { count });
            toast.success("Flashcards generated successfully");
            fetchFlashcardSets();
        } catch (error) {
            toast.error(error.message || "Failed to generate flashcards");
            console.error(error);
        } finally {
            setGenerating(false);
        }
    };
    const handleNextCard = () => {
        if (selectedSet) {
            handleReview(currentCardIndex);
            setIsFlipped(false);
            setCurrentCardIndex(
                (prevIndex) => (prevIndex + 1) % selectedSet.cards.length
            );
        }
    };
    const handlePrevCard = () => {
        if (selectedSet) {
            handleReview(currentCardIndex);
            setIsFlipped(false);
            setCurrentCardIndex(
                (prevIndex) => (prevIndex - 1 + selectedSet.cards.length) % selectedSet.cards.length
            );
        }
    };

    const handleReview = async (index) => {
        const currentCard = selectedSet?.cards[currentCardIndex];
        if (!currentCard) return;
        try {
            await flashcardService.reviewFlashcard(currentCard._id, index);
            toast.success("flashcard reviewed!");
        } catch (error) {
            toast.error(error.message || "Failed to review card");
        }
    };

    const handleToggleStar = async (cardId) => {
        // Optimistic update
        setSelectedSets((prev) => {
            if (!prev) return prev;
            const updatedCards = prev.cards.map(c =>
                c._id === cardId ? { ...c, isStarred: !c.isStarred } : c
            );
            return { ...prev, cards: updatedCards };
        });

        setFlashcardSets((prevSets) =>
            prevSets.map(set => {
                if (set._id === selectedSet._id) {
                    return {
                        ...set,
                        cards: set.cards.map(c =>
                            c._id === cardId ? { ...c, isStarred: !c.isStarred } : c
                        )
                    };
                }
                return set;
            })
        );

        try {
            await flashcardService.toggleStar(cardId);
            toast.success("Flashcard starred updated!");
        } catch (error) {
            // Revert on failure
            setSelectedSets((prev) => {
                if (!prev) return prev;
                const updatedCards = prev.cards.map(c =>
                    c._id === cardId ? { ...c, isStarred: !c.isStarred } : c
                );
                return { ...prev, cards: updatedCards };
            });
            toast.error(error.message || "Failed to star card");
        }
    };

    const handleDeleteRequest = (e, set) => {
        e.stopPropagation();
        setSetToDelete(set);
        setIsDeleteModalOpen(true);
    };


    const handleConfirmDelete = async () => {
        if (!setToDelete) return;
        setDeleting(true);
        try {
            await flashcardService.deleteFlashcardSet(setToDelete._id);
            toast.success("Flashcard set deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedSets(null);
            fetchFlashcardSets();

        } catch (error) {
            toast.error(error.message || "Failed to delete flashcard set");
        } finally {
            setDeleting(false);
        }
    };



    const handleSelectedSet = (set) => {
        setSelectedSets(set);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };
    const renderFlashcardViewer = () => {
        const curentCard = selectedSet.cards[currentCardIndex];
        return (
            <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
                {/* Header Navigation */}
                <div className="mb-6">
                    <button
                        onClick={() => setSelectedSets(null)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200"
                    >
                        <ArrowLeft size={16} />
                        Back to Sets
                    </button>
                </div>

                {/* Flashcard Component */}
                <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-[2/1] mb-8 cursor-pointer group"
                    style={{ perspective: "1000px" }}
                >
                    <div className={`relative w-full h-full transition-transform duration-500`}
                        style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>

                        {/* Front (Question) */}
                        <div className="absolute inset-0 w-full h-full bg-white border border-slate-200 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md flex flex-col items-center justify-center p-6 sm:p-8 md:p-12"
                            style={{ backfaceVisibility: "hidden" }}>
                            {/* Top Badges */}
                            <div className="absolute top-4 sm:top-6 w-full px-6 sm:px-8 flex justify-between items-center">
                                <div className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                    {curentCard.difficulty || "Medium"}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleStar(curentCard._id);
                                    }}
                                    className={`p-2 rounded-xl transition-all duration-300 ${curentCard.isStarred ? 'bg-amber-100 text-amber-500 scale-110 shadow-sm shadow-amber-500/20' : 'bg-slate-50 text-slate-400 hover:text-amber-500 hover:bg-amber-50 hover:scale-105'}`}
                                >
                                    <Star className={`w-5 h-5 transition-transform duration-300 ${curentCard.isStarred ? 'fill-current' : 'fill-transparent'}`} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-grow flex flex-col items-center justify-center text-center w-full px-2 sm:px-4 mt-8 sm:mt-10 overflow-y-auto">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                                    {curentCard.question}
                                </h3>
                            </div>

                            {/* Bottom Action */}
                            <div className="absolute bottom-4 sm:bottom-6 flex items-center justify-center text-slate-400 font-medium text-xs sm:text-sm group-hover:text-emerald-500 transition-colors">
                                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                Click to reveal answer
                            </div>
                        </div>

                        {/* Back (Answer) */}
                        <div className="absolute inset-0 w-full h-full bg-emerald-50 border border-emerald-200 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md flex flex-col items-center justify-center p-6 sm:p-8 md:p-12"
                            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                            {/* Top Badges */}
                            <div className="absolute top-4 sm:top-6 w-full px-6 sm:px-8 flex justify-between items-center">
                                <div className="px-2 sm:px-3 py-1 bg-emerald-100/50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                    {curentCard.difficulty || "Medium"}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleStar(curentCard._id);
                                    }}
                                    className={`p-2 rounded-xl transition-all duration-300 ${curentCard.isStarred ? 'bg-amber-100 text-amber-500 scale-110 shadow-sm shadow-amber-500/20' : 'bg-white border border-emerald-100/50 text-emerald-600 hover:text-amber-500 hover:bg-amber-50 hover:scale-105 hover:border-amber-100'}`}
                                >
                                    <Star className={`w-5 h-5 transition-transform duration-300 ${curentCard.isStarred ? 'fill-current' : 'fill-transparent'}`} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-grow flex flex-col items-center justify-center text-center w-full px-2 sm:px-4 mt-8 sm:mt-10 overflow-y-auto">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-emerald-900 leading-relaxed mb-4">
                                    {curentCard.answer}
                                </h3>
                            </div>

                            {/* Bottom Action */}
                            <div className="absolute bottom-4 sm:bottom-6 flex items-center justify-center text-emerald-600/70 font-medium text-xs sm:text-sm transition-colors">
                                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                Click to see question
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 mt-4">
                    <button
                        onClick={handlePrevCard}
                        disabled={currentCardIndex === 0}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-slate-200"
                    >
                        <ChevronLeft className="w-4 h-4" /> <span className="hidden xs:inline">Previous</span>
                    </button>

                    <div className="px-4 py-2.5 rounded-xl bg-slate-100/50 border border-slate-200 font-bold text-slate-600 text-xs sm:text-sm min-w-[4rem] sm:min-w-[5rem] text-center whitespace-nowrap">
                        {currentCardIndex + 1} / {selectedSet.cards.length}
                    </div>

                    <button
                        onClick={handleNextCard}
                        disabled={currentCardIndex === selectedSet.cards.length - 1}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-slate-200"
                    >
                        <span className="hidden xs:inline">Next</span> <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    const renderSetList = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-20">
                    <Spinner />
                </div>
            );
        }
        if (flashcardSets.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-16 px-6 ">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 mb-5">
                        <Brain className="w-8 h-8 text-emerald-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 ">
                        No Flashcards Yet
                    </h3>
                    <p className="text-sm  text-slate-500 mb-8 text-center max-w-sm ">
                        Generate flashcards from your document to start learning and
                        reinforce your knowledge.
                    </p>
                    <button
                        onClick={handleGenerateClick}
                        disabled={generating}
                        className="group inline-flex items-center justify-center gap-2 px-6 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/35 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {generating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" strokeWidth={2} />
                                Generate Flashcards
                            </>
                        )}
                    </button>
                </div>
            );
        }




        return (
            <div className="space-y-6">
                {/* Header  with Generate Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className=" text-lg font-semibold text-slate-900">
                            Your Flashcard Sets
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {flashcardSets.length}{" "}
                            {flashcardSets.length === 1 ? "set" : "sets"}available
                        </p>
                    </div>
                    <button
                        onClick={handleGenerateClick}
                        disabled={generating}
                        className="group inline-flex items-center gap-2 px-5 h-11 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {generating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" strokeWidth={2.5} />
                                Generate New Set
                            </>
                        )}
                    </button>
                </div>
                {/* Flashcard Sets  Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {flashcardSets.map((set) => (
                        <div
                            key={set._id}
                            onClick={() => handleSelectedSet(set)}
                            className="group relative bg-white/80 backdrop-blur-xl border-2 border-slate-200 hover:border-emerald-300 rounded-2xl cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/10"
                        >

                            {/* Delete Button */}
                            <button
                                onClick={(e) => handleDeleteRequest(e, set)}
                                className="absolute top-3 right-3 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" strokeWidth={2} />
                            </button>

                            {/* Set Content */}
                            <div className="space-y-4 p-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl" >
                                    <Brain className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                                </div>
                                <h4 className="text-base font-semibold text-slate-900 mb-1">
                                    Flashcard Set
                                </h4>
                                <p className="text-sm font-medium uppercase text-slate-500 tracking-wider">
                                    Created {moment(set.createdAt).format("MMM D, YYYY")}
                                </p>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-t border-slate-100">
                                <div className="px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <span className="text-sm font-semibold text-emerald-700">
                                        {set.cards.length}{" "}
                                        {set.cards.length === 1 ? "card" : "cards"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    };

    return (
        <>

            <div className="bg-white rounded-2xl shadow-[0px_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 max-w-5xl w-full backdrop-blur-xl">
                {selectedSet ? renderFlashcardViewer() : renderSetList()}
            </div>

            {/* Generate Validation Modal */}
            <Modal
                isOpen={isGenerateModalOpen}
                onClose={() => setIsGenerateModalOpen(false)}
                title="Generate Flashcards"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Number of Flashcards
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value) || 10)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium text-slate-900"
                        />
                        <p className="mt-2 text-xs text-slate-500">
                            We recommend 5-20 flashcards per set for better topic retention. Maximum is 30.
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
                            className="px-5 h-11 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 active:scale-95"
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
                title="Delete Flashcard Set?"
            >
                <div className="space-y-6">
                    <p className="text-sm text-slate-600">
                        Are you sure you want to delete this flashcard set? This action cannot be undone and all cards will be permanently deleted.
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
                                "Delete sets"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default FlashcardManager;

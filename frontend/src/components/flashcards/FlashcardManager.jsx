import React, { useEffect, useState } from "react"
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Trash2,
    ArrowLeft,
    Sparkles,
    Brain,
    BrainCircuit,
} from "lucide-react";
import toast from "react-hot-toast";
import moment from "moment";


import flashcardService from "../../Services/flashcardService";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import aiService from "../../Services/aiService";
import Flashcard from "./Flashcard";

const FlashcardManager = ({ documentId }) => {

    const [flashcardSets, setFlashcardSets] = useState([])
    const [selectedSet, setSelectedSets] = useState(null)
    const [loading, setLoading] = useState(true)
    const [generating, setGenerating] = useState(false)
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [setToDelete, setSetToDelete] = useState(null)



    const fetchFlashcardSets = async () => {
        setLoading(true);
        try {
            const response = await flashcardService.getFlashcardForDocument(documentId);
            setFlashcardSets(response.data);

        } catch (error) {
            toast.error("Failed to fetch flashcard Sets");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (documentId) {
            fetchFlashcardSets();
        }
    }, [documentId]);

    const handleGenerateFlashcards = async () => {
        setGenerating(true);
        try {
            await aiService.generateFlashcards(documentId);
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
            setCurrentCardIndex(
                prevIndex =>
                    (prevIndex + 1) % (selectedSet.cards.length));
        }
    };
    const handlePrevCard = () => {
        if (selectedSet) {
            handleReview(currentCardIndex);
            setCurrentCardIndex(prevIndex =>
                prevIndex - 1 + selectedSet.cards.length) % (selectedSet.cards.length);
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
        try {
            await flashcardService.toggleStar(cardId);
            toast.success("flashcard starred!");
        } catch (error) {
            toast.error(error.message || "Failed to star card");
        }
    };


    const handleDeleteRequest = (set) => {
        setSetToDelete(set);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async (e, set) => {
        e.stopPropagation();
        setSetToDelete(set);
        setIsDeleteModalOpen(true);
    };
    const handleConfirmDelete = async () => {

    };
    const handleSelectedSet = (set) => {
        setSelectedSets(set);
        setCurrentCardIndex(0);
    };
    const renderFlashcardViewer = () => {
        return "renderflashcardViewer"
    };


    
    const renderSetList = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-20">
                    <Spinner />
                </div>
            )
        }
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="inline flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-100 to-teal-100 mb-6">
                    <Brain className="w-8 h-8 text-emerald-600" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No flashcard sets yet</h3>
                <p className="text-sm text-slate-500 mb-8 text-center max-w-sm">Generate flashcards from your Document to start learning and reinforce your knowledge</p>
                <button
                    onClick={handleGenerateFlashcards}
                    disabled={generating}
                    className="group inline-flex items-center gap-2 px-6 h-12 bg-linear-to-r from-emerald-500 to-teal-500  hover:from emrald-600 hover:to-teal 600 text-sm rouded xl transition-all duration-200shadow-lg shadow-emerald-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    {generating ? (
                        <>
                            <div className="w-4  h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
        )



    };

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/20 rounded-3xl shadow-xl shadow-slate-200/50 p-8 ">
            {selectedSet ? renderFlashcardViewer() : renderSetList()}
        </div>
    )
}
export default FlashcardManager
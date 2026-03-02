import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen, Layers, TrendingUp, Sparkles } from "lucide-react";
import moment from "moment";
import flashcardService from "../../Services/flashcardService";
import Spinner from "../../components/common/Spinner";

const FlashcardsListPage = () => {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllFlashcardSets = async () => {
      try {
        const response = await flashcardService.getAllFlashcards();
        setFlashcardSets(response.data || []);
      } catch (error) {
        toast.error("Failed to fetch flashcard sets");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFlashcardSets();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner />
        </div>
      );
    }

    if (flashcardSets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-50 mb-6 shadow-sm border border-emerald-100">
            <BookOpen className="w-10 h-10 text-emerald-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No Flashcard Sets Yet
          </h3>
          <p className="text-slate-500 text-sm mb-8 max-w-sm">
            You have not generated any flashcards. Go to one of your uploaded documents to generate a set and start learning!
          </p>
          <Link
            to="/documents"
            className="inline-flex items-center justify-center gap-2 px-6 h-12 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            Go to Documents
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flashcardSets.map((set) => {
          const totalCards = set.cards?.length || 0;
          // Calculate reviewed cards if property exists, else default to 0 to match visual of non-reviewed
          const reviewedCards = set.cards?.filter(card => card.nextReviewDate || card.status === 'reviewed').length || 0;
          const progressPercentage = totalCards > 0 ? Math.round((reviewedCards / totalCards) * 100) : 0;

          return (
            <div
              key={set._id}
              onClick={() => navigate(`/documents/${set.documentId?._id}/flashcards`)}
              className="group relative bg-white border-2 border-slate-100 hover:border-emerald-400 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col w-full p-6"
            >
              {/* Header: Icon & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50/80 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100/80 transition-colors border border-emerald-100/50">
                  <BookOpen className="w-6 h-6 text-emerald-600" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 leading-snug line-clamp-2">
                    {set.documentId?.title || "Untitled Document"}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                    CREATED {moment(set.createdAt).fromNow().toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Tags: Cards Count & Percentage */}
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                  <span className="text-xs font-semibold text-slate-700">
                    {totalCards} Cards
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                  <span className="text-xs font-bold text-emerald-600">
                    {progressPercentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar Area */}
              <div className="mb-6 flex-grow">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-700">{reviewedCards}/{totalCards} reviewed</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Study Now Button */}
              <button
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white font-bold text-sm rounded-xl transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                Study Now
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-8 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pl-1">
          <h1 className="text-2xl sm:text-[28px] font-semibold text-slate-800 mb-1">All Flashcard Sets</h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default FlashcardsListPage;
import React from 'react';
import { Trash2, Play, BarChart2, Award } from 'lucide-react';
import moment from 'moment';

const QuizCard = ({ quiz, onDelete, onTakeQuiz, onViewResults }) => {
  const hasScore = quiz.highestScore !== undefined && quiz.highestScore !== null;
  const title = quiz.title || (quiz.documentId?.title ? `${quiz.documentId.title} - Quiz` : "Knowledge Quiz");

  return (
    <div className="group relative bg-white border-2 border-slate-100 hover:border-emerald-400 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col h-full p-5">
      {/* Top Bar: Score Badge & Delete */}
      <div className="flex items-start justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-600">
            Score: {hasScore ? quiz.highestScore : 0}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(e, quiz);
          }}
          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Delete Quiz"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Title & Date */}
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-2">
          CREATED {moment(quiz.createdAt).format("MMM DD, YYYY")}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-100 my-4"></div>

      {/* Questions Tag */}
      <div>
        <div className="inline-flex items-center px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
          <span className="text-sm font-semibold text-slate-600">
            {quiz.questions?.length || 0} Questions
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5">
        {hasScore ? (
          <button
            onClick={onViewResults}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl transition-colors border border-slate-200"
          >
            <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
            View Results
          </button>
        ) : (
          <button
            onClick={onTakeQuiz}
            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors shadow-sm shadow-emerald-500/20"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;